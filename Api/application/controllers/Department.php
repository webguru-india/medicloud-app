<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
class Department extends REST_Controller{
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
	function list_post($return = false){		
		$rd = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_departamentos_sele',
				'params' => array("agenda"=>$this->post("agenda_id")),
				'db_name' => 'default',
				'return_type' => 'array'
			)
		);
		if($return){
			return $rd;
		}
		if(!isset($rd['code'])){
			$success = true;
			$message = "success";
		}else{
			$success = true;
			$message = "No recode found";
		}	
		echo returnJsonResponse($message,$success,array('department_list'=>$rd));
	}
	function save_post(){
		$new = true; $id = 0;
		if($this->post('department_id')){
			$new = false; 	$id = $this->post('department_id');
		}
		$params = array('nuevo'=>$new,'departamento'=>$this->post('department'),'agenda'=>$this->post('agenda_id'),'id'=>$id);
		$res = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_departamentos_grabar',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'row-array'
			)
		);
		if(!isset($res['code'])){
			$message = "Patient saved successfully"; $success = true;
		}else{
			$message = $res['message']; $success = false;
		}
		echo json_encode(array('success'=>$success,'message'=>$message,'department_list'=>$this->list_post(true)));
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
					"sp_name"=>"mediagenda.clinica_departamentos_borrar",
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
			echo returnJsonResponse($res['message'],$res['success'],array('department_list'=>$this->list_post(true)));
		}else{
			echo json_encode(array('success'=>false,'message'=>'Please select a diagnosis for delete'));
		}		
	}
}