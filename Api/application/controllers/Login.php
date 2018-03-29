<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';

Class Login extends REST_Controller{
	function __construct(){
		parent::__construct();			
		//$this->load->library('public_init_elements');
		//$this->public_init_elements->init_elements();
		$this->loginTable = "";
	}	
	function forgot_password(){
		/*
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/forgot-password',$data,TRUE);
		$this->load->view('layout',$this->data);	
		*/
	}
	function register(){
		/*
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/register',$data,TRUE);
		$this->load->view('layout',$this->data);
		*/
	}	
	function do_login_post(){
		$center  = $this->post('center');
		$username  = $this->post('username');
		$password = $this->post('password');		
		$validate_data = $this->Common_model->execute_sp(
			array('sp_name'=>'validateLoginCredential',
					'params' => array('center'=>$center,'username'=>$username),
					'db_name' => 'identities',
					'return_type' => 'row'
				)
			);		
		if($validate_data){
			if(verifyHashedPassword($password,trim($validate_data->PasswordHash))){
				 $userdata = array(
				 		'id' => $validate_data->Id,
				 		'email_address' => $validate_data->Email,
				 		'phone_number'	=> $validate_data->PhoneNumber,
				 		'username'	=> $validate_data->UserName,
				 		'center_id' => $validate_data->MyUserCentroId,
				 		'center_name'	=> $validate_data->Centro,
				 		'is_user_logged_in' => true,				 		
				 	);
				checkUserAuth($validate_data->Id, $validate_data->SecurityStamp,1);				
				echo json_encode(array('success'=>true,'access_token'=>$validate_data->SecurityStamp,'user'=>$validate_data->Id));
			}else{
				echo json_encode(array('success'=>false,'message'=>'invalid login'));
			}

		}else{
			echo json_encode(array('success'=>false,'message'=>'User not found'));
		}
	} 
	function userAuth_post(){
		$user_access_token = $this->post('access_token');		
		checkUserAuth($user_access_token);
	}
}