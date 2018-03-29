<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
//require for useig REST API
require APPPATH . 'libraries/REST_Controller.php';
/**
 * Generic Controller for generating dropdowns , listing and other frequent useage modules
 */
Class Common_controller extends REST_Controller{
	/**
	 * @package Common_controller
	 * @author Koushik Sen
	 * @version 1.0.0
	 * @date    2018-02-15
	 */
	function __construct(){
		parent::__construct();		
		/** @var [string] $access_token [unique access token for individual user] */		
		$this->access_token = $this->post('access_token');
		/** @var [user_token] [unique token generated for each user , serve as a identifier of user] */
		$this->user_id = $this->post('user_token');				
		if(checkUserAuth($this->user_id,$this->access_token)){

		}else{
			echo json_encode(array('logged_out'=>true));
			exit;
		}
	}
	/**
     * Retrives doctors data from store procedure as a form of array
     * @return JSON return json encoded array with fetched data and a success value of boolean
     * @access public
     */
	function load_metges_post(){
		$data = array();		
		$especialidad = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.agendas_especialitat_sele',
				'db_name' => 'default','return_type'=>'result-array')
		);		
		echo json_encode(array('especialidad'=>$especialidad,'success'=>true));
	}
	/**
	 * Retrives Agenda data from store procedure as a array of object format	 
	 * @author Koushik Sen
	 * @version 1.0.0
	 * @date    2018-02-16
	 * @access public
	 * @return  JSON return json encoded array with fetched data 
	 */
	function load_agendas_post(){		
		$data['agendas'] = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.agendas_sele',
				'db_name' => 'default','return_type'=>'array',
				'params' => array('espe'=>$this->post('specialist'),'usu'=>'*')
			)
		);
		$data['success'] = true;
		echo json_encode($data);
	}
	function load_mutuas_post(){		
		$mutuas = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.mutuas_origen_sele',
				'db_name' => 'default','return_type'=>'array'					
			)
		);		
		echo json_encode(array('mutuas'=>$mutuas,'success'=>true));
	}
	function load_mutuas_by_agenda_post(){		
		$mutuas = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.mutuas_sele',
				'db_name' => 'default','return_type'=>'array',
				'params' => array("agenda"=>$this->post('agenda_id'))
			)
		);		
		echo json_encode(array('mutuas'=>$mutuas,'success'=>true));
	}
	function load_ayudante_post(){
		$params = array('agenda'=>$this->post('agenda_id'));
		$ayudante = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.qx_ayudantes_sele',
				'db_name' => 'default' ,'return_type'=>'array','params'=>$params
			)
		);
		echo json_encode(array('ayudante'=>$ayudante,'success' =>true));
	}
	function load_quirofano_post(){
		$params = array('agenda'=>$this->post('agenda_id'));
		$quirofano = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.qx_clin_sele',
				'db_name' => 'default','return_type'=>'array','params'=>$params
			)
		);		
		echo json_encode(array('quirofano'=>$quirofano,'success'=>true));
	}
	function load_anestesia_post(){	
		$anestesia = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.ANESTESIA_LEER',
				'db_name' => 'default','return_type'=>'array')
		);		
		echo json_encode(array('anestesia'=>$anestesia,'success'=>true));
	}		
	/**
	function enc_post(){
		$string = $this->post('string');		
		echo json_encode(array("real"=>$string,'encrypted'=> hashEncrypt($string)));
	}
	function decrypt_post(){
		$encrypted = $this->post('encrypted_string');
		echo json_encode(array("real"=>$encrypted,'de-crypted'=> hashDecrypt($encrypted)));
	}
	**/
}