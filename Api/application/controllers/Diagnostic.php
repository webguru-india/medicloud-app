<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
class Diagnostic extends REST_Controller{
	function __construct(){
		parent::__construct();				
		$this->access_token = $this->post('access_token');	
		$this->user_id = $this->post('user_token');		
		if(checkUserAuth($this->user_id,$this->access_token)){
		}else{
			echo json_encode(array('logged_out'=>true));
			exit;
		}
	}
	function show_post($return = false){
		$agenda = $this->post('agenda_id');
		$diagnostic_list = $this->Common_model->execute_sp(
			array(
				"sp_name"=>"mediagenda.clinica_diag_sele",
				"db_name"=>'default',
				"return_type"=>"array",
				"params"=>array("agenda"=>$agenda)
			)
		);
		$diagnostic_list = (!$diagnostic_list)?array():$diagnostic_list;
		if($return){
			return $diagnostic_list;
		}
		echo json_encode(array("success"=>true,"diagnostic_list"=>$diagnostic_list));
	}	
	function save_post(){
		$agenda_id = $this->post('agenda_id');
		$diagnostic_name = $this->post('diagnostic');
		$new = true; $id = 0; 
		if($this->post('diagnostic_id')){
			$new = false; $id = $this->post('diagnostic_id');

		}
		$res = $this->Common_model->execute_sp(
			array(
				"sp_name"=>"mediagenda.clinica_diags_añadir",
				"db_name"=>'default',
				"return_type"=>"row-array",
				"params"=>array("diagnostic"=>$diagnostic_name, "agenda"=>$agenda_id, "nuevo"=>$new, "vid"=>$id)));
		if(!isset($res['code'])){
			$success = true;
			$message = "Diagnostic saved sucessfully";
		}else{
			$success = false;
			$message = $res['message'];
		}
		$return_data_array = $this->show_post(true);		
		
		echo returnJsonResponse($message,$success,$return_data_array);	
	}
	function delete_post(){
		$id_array = explode(',', $this->post('id'));
		$error = false;
		$message = $success_message = "";
		if($id_array){
			$ec = 0;
			$sc = 0;			
			foreach ($id_array as $key => $value) {
				$action_status = $this->Common_model->execute_sp(
				array(
					"sp_name"=>"mediagenda.clinica_diags_borrar",
					"db_name"=>'default',
					"return_type"=>"row",
					"params"=>array("id"=>$value)
				)
			);
				if($action_status['code']!=0000){
					$ec++;
					$error = true;				
				}else{
					$sc++;					
				}
			}
			$res = buildErrorResponse($error,$ec,$sc);
			echo returnJsonResponse($res['message'],$res['success'],array('diagnostic_list'=>$this->show_post(true)));
		}else{
			echo json_encode(array('success'=>false,'message'=>'Please select a diagnosis for delete'));
		}
	}
}