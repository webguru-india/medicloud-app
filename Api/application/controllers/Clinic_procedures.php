<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/**
 * procedimientos en conssultas in configuraciones
 * @package 	Controller
 * @author      Koushik Sen
 * @date 		2018-02-23
 */ 
class Clinic_procedures extends REST_Controller{
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
	 * save procedure for certain mutuas
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-23	 
	 * @return  json 	returns json data array with
	 */
	function save_process_post(){
		/**
		 * new is true for insert operation , false for update operation
		 * @var boolean
		 */
		$nuevo = $this->post('new');
		/**
		 * agenda id selected in agenda dropdown
		 * @var integer
		 */
		$agenda = $this->post('agenda_id');
		/**
		 * code for procedure
		 * @var string
		 */
		$codigo = $this->post('codigo');
		/**
		 * procedure name 
		 * @var string
		 */
		$nombre = $this->post('name_of_the_procedure');
		/**
		 * [mediagenda].[MUTUAS] id is fetched here not [mediagenda].[ORIGEN_MUTUAS]
		 * @var integer
		 */
		$mutua = $this->post('mutual_id');
		/**
		 * Privado is true if no insurance company value is selected but insurance is required 
		 * @var boolean
		 */
		$privat = $this->post('private');
		/**
		 * by default it sets to true
		 * @var boolean
		 */
		$qx = $this->post('qx');
		/**
		 * rate of procedure
		 * @var [type]
		 */
		$tarifa = $this->post('rate');
		/**
		 * it is by default false
		 * @var boolean
		 */
		$cma = $this->post('cma');
		/**
		 * it is by default false
		 * @var boolean
		 */
		$ucias = $this->post('ucias');
		/**
		 * assistant value is from scheduled patient assistant dropdown , default 0
		 * @var integer
		 */
		$ayudante = ($this->post('ayudante')!='')?$this->post('ayudante'):'0';
	
		/**
		 * value of ayudante if ayudante checkbox is check, this is availabel only in scheduled patient section in clinical history
		 * @var float
		 */
		$perayuda = $this->post('perayuda');
		/**
		 * default value is null
		 * @var null
		 */
		$id = 0;
		if($this->post('id')){
			$new = false; $id = $this->post('id');
		}
		$params = array('nuevo'=>$nuevo,'agenda'=>$agenda, 'codigo'=> $codigo,'nombre'	=> $nombre, 'mutua' => $mutua, 'privat' => $privat, 'qx' => $qx, 'tarifa' => $tarifa, 'cma' => $cma, 'ucias' => $ucias, 'ayudante' => $ayudante, 'perayuda' => $perayuda,'id'=>$id
			);
		$success = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.actos_grabar_qx',
				'params' => $params,'db_name' =>'default','return_type' => 'row-array'));		
		if(!isset($success['code'])){
			$message = "Process saved sucessfully";
			//$return_data_array['actos'] = $this->list_process_post(true);
			echo returnJsonResponse($message,true);
		}else{
			$message = $success['message'];

			echo returnJsonResponse($message,false);
		}
		
		
	}	
	/**
	 * fecth listing of saved procedures
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-23
	 * @param   boolean       $return returns results as an array if true, else by default it returns json_encode data
	 * @return  boolean
	 */
	function list_process_post($return = false){		
		$qx = 1;
		$agenda = $this->post('agenda_id');
		$mutua = $this->post('mutual_id');		
		$actos = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.actos_sele',
				'db_name' => 'default',
				'return_type'=>'array',
				'params'=>array('qx'=>$qx,'agenda'=>$agenda, 'mutua'=> $mutua)
			)
		);		
		if($return){
			return $actos;
		}
		echo json_encode(array('actos'=>(!$actos)?array():$actos,'success'=>true));
	}
	/**
	 * delete procedures from db
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-23
	 * @return  json 	returns json data to 
	 */
	function delete_process_post(){
		$id = explode(',',$this->post('id'));
		$error = false;
		$message = $success_message = "";
		if($id){
			$ec = 0; $sc = 0;
			foreach ($id as $key => $value) {
				$action_status = $this->Common_model->execute_sp(
					array('sp_name'=>'mediagenda.actos_borrar',
						'params' => array('id'=>$value),
						'db_name' => 'default',
						'return_type' => "dml"
					)
				);				
				if($action_status['code']!=0000){
					$ec++;
					$error = true;
				}else{
					$sc++;					
				}				
			}
			$res = buildErrorResponse($error,$ec,$sc);
			$return_data_array = array('actos'=>$this->list_process_post(true));
			$message = "Data deleted sucessfully";
			echo returnJsonResponse($message,$res['success'],$return_data_array);			
		}else{
			echo json_encode(array('success'=>false,'message'=>'Please select a atleast one for delete'));
		}
	}
}