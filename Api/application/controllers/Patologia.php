<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
Class Patologia extends REST_Controller{
	function __construct(){
		parent::__construct();				
		/**
		 * $this->access_token is first parameter for login, it is unique to each user, this updated on every login
		 * @var string bcrypt
		 * 
		 */
		$this->access_token = $this->post('access_token');
		/**
		 * $this->user_id is second parameter for login , it is unique to every user this is the encrypted . this is static for each user
		 * @var string bcrypt
		 */
		$this->user_id = $this->post('user_token');		
		if(checkUserAuth($this->user_id,$this->access_token)){
		}else{
			echo json_encode(array('logged_out'=>true));
			exit;
		}
	}
	/**
	 * 
	 *
	 * @return void
	 * @route {list-patologia}
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date 2018-04-03 18:30:12
	 */
	function list_post($return = false){
		$params = array("agenda_id"=> $this->post('agenda_id'));
		$res = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.clinica_patologias_sele','db_name' => 'default','return_type'=>'array',
			'params'=>$params));
		if($return){
			return $res;
			exit;
		}
		if(!isset($res['code'])){
			echo json_encode(array('success'=>true,'patologia_list'=>$res));
		}
	}
	/**
	 * create and update a pathology 
	 *
	 * @return void
	 * @route {save-patologia}
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date 2018-04-03 18:30:00
	 */
	function save_post(){		
		$new = true; $patologia = $this->post('patologia'); $agenda = $this->post('agenda_id');
		$id = 0; 
		if($this->post('id')){
			$new = false;
			$id = $this->post('id');
		}
		$params = array( 'nuevo'=>$new,'patologia'=>$patologia,'agenda'=>$agenda,'id'=>$id);
		$res = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.clinica_patologias_grabar',
			'db_name' => 'default','return_type'=>'array','params'=>$params));
		if(!isset($res['code'])){
			$message = "Pathology saved successfully";
			$success = true;
		}else{
			$message = $res['code'];
			$success = false;
		}
		echo returnJsonResponse($message,$success,array('patologia_list'=>$this->list_post(true)));
	}
	/**
	 * delete a pathology
	 *
	 * @return void
	 * @route {delete-patologia}
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date {{date}}
	 */
	function delete_post(){
		$id_array = explode(',', $this->post('patologia_id'));
		$error = false;
		$message = $success_message = "";
		if($id_array){
			$ec = 0;
			$sc = 0;			
			foreach ($id_array as $key => $value) {
				$action_status = $this->Common_model->execute_sp(
				array(
					"sp_name"=>"mediagenda.clinica_patologias_borrar",
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
			echo returnJsonResponse($res['message'],$res['success'],array('patologia_list'=>$this->list_post(true)));
		}else{
			echo json_encode(array('success'=>false,'message'=>'Please select a Patologia for delete'));
		}
	
	}
}