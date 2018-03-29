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
		if($return){
			return $diagnostic_list;
		}
		echo array("success"=>true,"diagnostic_list"=>$diagnostic_list);
	}	
	function save_post(){
		$agenda_id = $this->post('agenda_id');
		$diagnostic_name = $this->post('diagnostic');
		$new = true; $id = 0; 
		if($this->post('diagnostic_id')){
			$new = false; $id = $this->$this->post('diagnostic_id');

		}
		$res = $this->Common_model->execute_sp(
			array(
				"sp_name"=>"mediagenda.clinica_diags_añadir",
				"db_name"=>'default',
				"return_type"=>"row",
				"params"=>array("diagnostic"=>$diagnostic_name,"agenda"=>$agenda_id,"nuevo"=>$new,"vid"=>$id)
			)
		);
		$return_data_array = $this->show_post(true);
		$message = "Diagnostic saved sucessfully";
		echo returnJsonResponse($message,$success,$return_data_array);	
	}
	function delete_post(){
		$res = $this->Common_model->execute_sp(
			array(
				"sp_name"=>"mediagenda.clinica_diags_borrar",
				"db_name"=>'default',
				"return_type"=>"row",
				"params"=>array("id"=>$this->post('id'))
			)
		);
		$return_data_array = $this->show_post(true);
		$message = "Dignostic deleted sucessfully";
		echo returnJsonResponse($message,$res,$return_data_array);
	}
}