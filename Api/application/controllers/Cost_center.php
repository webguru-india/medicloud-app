<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
//require for useig REST API
require APPPATH . 'libraries/REST_Controller.php';
///////////////////////////////////////////////////////
// Main Controller for Cost center management module //
///////////////////////////////////////////////////////
Class Cost_center extends REST_Controller{	
	/**
	 * @package Cost_center
	 * @author koushik sen
	 * @version 1.0.0
	 * @date    2018-02-15
	 */
	function __construct(){
		parent::__construct();		
		$this->access_token = $this->post('access_token');
		$this->user_id = $this->post('user_token');
		if(checkUserAuth($this->user_id,$this->access_token)){

		}else{
			echo json_encode(array('logged_out'=>true)); exit;
		}
	}
	function edit_agenda_post(){
		$params = array('id'=>$this->post('agenda_id'));
		$data['agendas'] = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.agenda_leer',
				'db_name' => 'default','return_type' => 'row','params'=>$params));
		$data['success'] = true;
		echo json_encode($data);
	}
	function agendas_post(){
		$data = array();
		if($this->input->post('save')=='save'){
			$this->save_agendas();
		}
		$data['especialidad'] = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.agendas_especialitat_sele',
				'db_name' => 'default','return_type'=>'array')
		);		
		$data['select_especilaidad'] = "";		
		$data['metges'] = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.metges_sel', 'db_name' => 'default',
				'return_type' => 'array'));
		$data['select_medico'] = "";
		$data['agendas'] = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.agendas_sele2',
				'db_name' => 'default','return_type' => 'array'));
		$data['success'] = true;
		echo json_encode($data);		
	}
	public function save_agendas_post(){
		$new = true;
		$nombre = $this->post('nombre');
		$especialidad = $this->post('especialidad');
		$metges = $this->post('metges');
		$visitas = $this->post('visitas');
		$iva = $this->post('iva');
		$procedim = $this->post('procedim');
		$irpf = $this->post('irpf');
		$cirugias = $this->post('cirugias');
		$bloqueo = $this->post('bloqueo')=='true'?1:0;
		$id = 1;
		if($this->post('agenda_id')){
			$new = false;
			$id = $this->post('agenda_id');
		}
		$success = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.agenda_grabar',
				'params' => array('nuevo'=>$new, 'metge'=>$nombre,'especialitat'=>$especialidad,
					'bloqueo'=> $bloqueo,'id'	=> $id, 'per_visita' => $visitas,
					'per_proc' => $procedim, 'per_qx' => $cirugias,
					'iva' => $iva, 'irpf' => $irpf,'medico'=>$metges
				),
				'db_name' => 'default'
			)
		);
		$return_data_array = array('agendas'=>$this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.agendas_sele2',
				'db_name' => 'default','return_type' => 'array')));
		$message = "Agendas saved sucessfully";

		echo returnJsonResponse($message,$success,$return_data_array);
	}

	function delete_agenda_post(){
		$id = explode(',',$this->post('agenda_id'));
		//print_r($id); die;
		$error = false;
		$message = $success_message = "";
		if($id){
			$ec = 0;
			$sc = 0;
			foreach ($id as $key => $value) {
				$action_status = $this->Common_model->execute_sp(
					array('sp_name'=>'mediagenda.agenda_delete',
						'params' => array('agenda'=>$value),'db_name' => 'default','return_type'=>''));
					//print_r($action_status);
					if($action_status['code']!=0000){
						$ec++;
						$error = true;
						//$code = explode('/', $action_status['code']);
					}else{
						$sc++;
					}
				}		
				$res = buildErrorResponse($error,$ec,$sc);
				$return_data_array = array('agendas'=>
					$this->Common_model->execute_sp(array('sp_name'=>'mediagenda.agendas_sele2',
						'db_name' => 'default','return_type' => 'array')));				
				echo returnJsonResponse($res['message'],$res['success'],$return_data_array);
			
		}		
	}

}