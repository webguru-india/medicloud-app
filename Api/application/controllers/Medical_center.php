<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
Class Medical_center extends REST_Controller{
	function __construct(){
		parent::__construct();		
		$this->access_token = $this->post('access_token');
		$this->user_id = $this->post('user_token');
		//echo $this->user_id."===".checkUserAuth($this->user_id,$this->access_token); die;
		if(checkUserAuth($this->user_id,$this->access_token)){

		}else{
			echo json_encode(array('logged_out'=>true)); exit;
		}
	}	
	function medical_center_information_post(){
		$data = array();
		if($this->post('save')=='grabar'){
			$this->save_medico_center();
		}
		$config['db_name'] = 'default';
		$config['sp_name'] = "mediagenda.centro_leer";
		$config['return_type'] = "row";		
		$data['center'] = $this->Common_model->execute_sp($config);
		$data['success'] = true;
		$data['message'] = "";
		echo json_encode($data);
	}
	function save_medico_center_post(){
		$config['db_name'] = 'default';
		$config['sp_name'] = "mediagenda.centro_grabar";
		$config['return_type'] = "";		
		$config['params'] = array(
			'centro'=> $this->post('center_name'),
			'responsable' => $this->post('responsable'),
			'direccion'	=>  $this->post('address'),
			'cip'	=>  $this->post('cip'),
			'poblacion' => $this->post('population'),
			'telefono'	=> $this->post('phone'),
			'email'	=> "",
			'pasword'	=> "",
			'codigo'	=> "",
			'nif'		=> $this->post('nif')
		);
		$this->Common_model->execute_sp($config);		
		$data['success'] = true;
		$data['message'] = "Medical center saved sucessfully";
		echo json_encode($data);
	}
}