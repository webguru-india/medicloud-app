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
		$rd['department_list'] = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_departamentos_sele',
				'params' => array("agenda"=>$this->post("agenda_id")),
				'db_name' => 'default',
				'return_type' => 'array'
			)
		);
		if($return){
			return $rd;
		}
		if($rd['department_list']){
			$success = true;
			$message = "success";
		}else{
			$success = true;
			$message = "No recode found";
		}	
		echo returnJsonResponse($message,$success,$rd);
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
				'return_type' => 'row'
			)
		);
		if($res){
			$message = "Patient saved successfully"; $success = true;
		}else{
			$message = "Some error occoured!"; $success = false;
		}
	}
	function delete_post(){
		$params = array('id'=>$this->post('dept_id'));
		$res = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_departamentos_borrar',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'row'
			)
		);
		if($res){
			$rd = $this->list_post(true);
			$message = "Department deleted successfully"
			echo returnJsonResponse($message,true,$rd);
		}else{
			$message = "Some error occoured."
			echo returnJsonResponse($message,false,array());
		}
	}
}