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
	 * @route {[namespace]}
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date 2018-04-03 18:30:12
	 */
	function list_post(){
		$params = array("agenda_id"=> $this->post('agenda_id'));		
		$res = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.clinica_patologias_sele','db_name' => 'default','return_type'=>'array',
			'params'=>$params));
		if(!isset($res['code'])){
			echo json_encode(array('success'=>true,'patologia_list'=>$res));
		}
	}
	/**
	 * create and update a pathology 
	 *
	 * @return void
	 * @route {[namespace]}
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
	}
	/**
	 * delete a pathology
	 *
	 * @return void
	 * @route {[namespace]}
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date {{date}}
	 */
	function delete_post(){		
		$params = array('id'=>$this->post('dept_id'));
		$res = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_patologias_borrar',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'row'
			)
		);
		if($res){
		//	$rd = $this->list_post(true);
			$message = "Pathology deleted successfully";
			echo returnJsonResponse($message,true,$rd);
		}else{
			$message = "Some error occoured.";
			echo returnJsonResponse($message,false,array());
		}
	}
}