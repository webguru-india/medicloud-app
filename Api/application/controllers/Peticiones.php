<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
class Peticions extends REST_Controller{
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
	function list_post(){
		$rd['peticion_list'] = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_peticiones_sele',
				'params' => array("agenda"=>$this->post("agenda_id"),'departamento'=>$this->post('department_id')),
				'db_name' => 'default',
				'return_type' => 'array'
			)
		);
		if($return){
			return $rd;
		}
		if($rd['peticion_list']){
			$success = true;
			$message = "success";
		}else{
			$success = true;
			$message = "No recode found";
		}	
		echo returnJsonResponse($message,$success,$rd);
	}
	function save_post(){
		$new = false;
		$departamento = $this->post('department_id');
		$prueba = $this->post('prueba'); $peticion = $this->post('peticion'); $agenda = $this->post('agenda');
		$id = 0; $plantilla = $this->post('plantilla');
		if($id = $this->post('peticion_id')){
			$new = true;
		}
		$params = array("nuevo"=>$new,"departamento"=>$departamento,"prueba"=>$prueba,"peticion"=>$peticion,"agenda"=>$agenda,"id"=>$id,"plantilla"=>$plantilla);
		$res = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_peticion_grabar',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'array'
			)
		);
		if($res){
			$message = "Visit saved successfully"; $success = true;
		}else{
			$message = "Some error occured !"; $success = false;
		}
		$rd = $this->list_post();
		echo returnJsonResponse($message,$success,$rd);
	}
	function delete_post(){
		$params = array('id'=>$this->post('peticion_id'));
		$res = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_peticiones_borrar',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'row'
			)
		);
		if($res){
			$rd = $this->list_post(true);
			$message = "Peticion deleted successfully";
			echo returnJsonResponse($message,true,$rd);
		}else{
			$message = "Some error occoured.";
			echo returnJsonResponse($message,false,array());
		}
	}
	function edit_post(){		
		$res['peticion'] = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_peticiones_datos',
				'params' => array('id'=>$this->post('peticions_id')),
				'db_name' => 'default',
				'return_type' => 'row'
			)
		);
		if($rd['assigned_peticions']){
			$success = true;
			$message = "";
		}else{
			$success = false;
			$message = "";
		}
		echo returnJsonResponse($message,$success,$res);
	}
}
