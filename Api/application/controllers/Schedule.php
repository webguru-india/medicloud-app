<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
Class Schedule extends REST_Controller{
	function __construct(){
		parent::__construct();		
		$this->access_token = $this->post('access_token');
		$this->user_id = $this->post('user_token');
		if(checkUserAuth($this->user_id,$this->access_token)){

		}else{
			echo json_encode(array('logged_out'=>true)); return false;
		}
	}	
	function index_post(){
		$data['especialidad'] = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.agendas_especialitat_sele',
			'db_name' => 'default','return_type'=>'array'));
		$data['success'] = true;
		echo json_encode($data);
	}	
	
	function load_hours_post(){
		$day = $this->post('day');
		$agenda  = $this->post('agenda');		
		$data['listhours'] = $this->Common_model->execute_sp(
			array(
					'sp_name'=>'mediagenda.agendas_horas_previstas',
					'db_name' => 'default','return_type'=>'array',
					'params' => array('dia'=>$day, 'agenda'=>$agenda)
				)
			);
		$data['success'] = true;
		echo json_encode($data);
	}
	function save_hours_post(){
		$day = $this->post('day');
		$hours = explode(',',$this->post('hours'));
		$agenda = $this->post('agenda');
		//echo json_encode($hours); exit();
		if(!empty($hours)){
			foreach ($hours as $key => $value) {
				$this->Common_model->execute_sp(
					array(
						'sp_name'=>'mediagenda.horas_previstas_insert',
						'db_name' => 'default','return_type'=>'',					
						'params' => array('dia'=>$day,'hora'=>$value, 'agenda'=>$agenda)
					)
				);									
			}			
			$this->load_hours_post();
		}		
	}
	function delete_hours_post(){
		$day = $this->post('day');
		$agenda = $this->post('agenda');
		$hours = explode(',',$this->post('hours'));
		if($hours){
			foreach ($hours as $key => $value) {
				$this->Common_model->execute_sp(
					array(
						'sp_name'=>'mediagenda.horas_previstas_delete',
						'db_name' => 'default','return_type'=>'',					
						'params' => array('dia'=>$day,'hora'=>$value, 'agenda'=>$agenda)
					)
				);				
			}
			$this->load_hours_post();
		}else{
			echo json_encode(array('success'=>false,'message'=>'Select a hour first'));
		}		
	}
}