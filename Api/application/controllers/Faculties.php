<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
Class Faculties extends REST_Controller{
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
	function doctor_list_post(){
		$metges = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.metges_sel', 'db_name' => 'default')
		);
		if(!empty($metges)){
			echo json_encode(array('metges'=>$metges,'success'=>true));
		}else{
			echo json_encode(array('metges'=>$metges,'success'=>false));
		}		
	}	
	function save_post(){			
		$new = true;		
		$medio = $this->post('doctor');
		$especialitat = $this->post('category');
		$colegiat = $this->post('collegiate');
		$nif = $this->post('nif');
		$address = $this->post('address');
		$cip = $this->post('cip');
		$population = $this->post('population');
		$phone = $this->post('phone');
		$email = $this->post('email');
		$id = 1;
		if($especialitat==''){
			echo json_encode(array('message'=>'Specialty field is required'));			
			//redirect('facultativos');
		}
		if($this->post('doctor_id')){
			$new = false;
			$id = $this->post('doctor_id');
		}
		$success = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.metges_grabar',
				'params' => array('new'=>$new, 'medio'=>$medio,'especialitat'=>$especialitat, 'colegiat'=> $colegiat,
					'nif'	=> $nif, 'address' => $address, 'cip' => $cip, 'population' => $population, 'phone' => $phone, 'email' => $email,'id'=>$id

				),
				'db_name' => 'default',
				'return_type' => 'dml'
			)
		);
		$message = "Doctor saved sucessfully";
		$return_data_array = array(
			'doctor_list'=>$this->Common_model->execute_sp(
				array('sp_name'=>'mediagenda.metges_sel', 'db_name' => 'default'))
		);
		echo returnJsonResponse($message,$success,$return_data_array);		
	}
	function edit_post(){
		$id = $this->post('id');		
		$metges_data = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.metges_sel_id',
				'params' => array('vid'=>$id),
				'db_name' => 'default',
				'return_type' => 'row'
			)
		);
		echo json_encode(array('doctor_data'=>$metges_data,'success'=>true));
	}
	function delete_post(){
		$id = explode(',',$this->post('id'));
		$error = false;
		$message = $success_message = "";
		if($id){
			$ec = 0;
			$sc = 0;			
			foreach ($id as $key => $value) {
				$action_status = $this->Common_model->execute_sp(
					array('sp_name'=>'mediagenda.metges_borrar',
						'params' => array('vid'=>$value),
						'db_name' => 'default',
						'return_type' => "dml"
					)
				);				
				if($action_status['code']!=0000){
					$ec++;
					$error = true;
				//	$code = explode('/', $action_status['code']);
				}else{
					$sc++;					
				}				
			}
			$res = buildErrorResponse($error,$ec,$sc);
			$return_data_array = array(
					'doctor_list'=>$this->Common_model->execute_sp(
						array('sp_name'=>'mediagenda.metges_sel', 'db_name' => 'default')));
			echo returnJsonResponse($res['message'],$res['success'],$return_data_array);			
		}else{
			echo json_encode(array('success'=>false,'message'=>'Please select a doctor for delete'));
		}
	}
}