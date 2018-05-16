<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';

class Peticiones extends REST_Controller{
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
		$new = 1;
		$departamento = $this->post('department_id');
		$prueba = $this->post('prueba'); $peticion = $this->post('peticion'); $agenda = $this->post('agenda_id');
		$id = 0; $plantilla = $this->post('plantilla');
		if($id = $this->post('peticion_id')){
			$new = 0;
		}
		$params = array("nuevo"=>$new,"departamento"=>$departamento,"prueba"=>$prueba,"peticion"=>$peticion,"agenda"=>$agenda,"id"=>$id,"plantilla"=>$plantilla);
		$res = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_peticion_grabar',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'array'
			)
		);
		if(!isset($res['code'])){
			$message = "Peticiones saved successfully"; $success = true;
		}else{
			$message = $res['message']; $success = false;
		}
		$rd = $this->list_post(true);
		echo returnJsonResponse($message,$success,$rd);
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
					"sp_name"=>"mediagenda.clinica_peticiones_borrar",
					"db_name"=>'default',
					"return_type"=>"array",
					"params"=>array("id"=>$value)
				)
			);				
			if(isset($action_status['code'])){
					$ec++;
					$error = true;				
				}else{
					$sc++;					
				}
			}
			$res = buildErrorResponse($error,$ec,$sc);
			echo returnJsonResponse($res['message'],$res['success'],$this->list_post(true));
		}else{
			echo json_encode(array('success'=>false,'message'=>'Please select a Peticiones for delete'));
		}		
	}	
}
