<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/**
 * Main class for Implementing "Consultas Externas"
 * @package 	Controller
 * @author      Koushik Sen
 * @date 		2018-02-19  
 */ 
Class External_consultations extends REST_Controller{
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
	 * main listing page for visit listing 
	 * @route  visit-list
	 * @author Koushik Sen
	 * @version 1.0.0
	 * @date    2018-02-19
	 * @param   boolean		$has_return_type True returns json decoded data, False returns json encoded data to client
	 * @return  json						returns visit list and success as a json decoded array
	 */
	function  visit_list_post($has_return_type = false){		
		$success = false;
		$params = array(
			"data" 		=>  $this->post('selected_date'),
			"dia" 		=>	NULL,
			"agenda"	=>	$this->post('agenda_id'),
			"visita2"	=>	NULL,
			"privats"	=>  NULL
		);		
		$rd['visits'] = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.visitas_sel',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'array'
			)
		);
		if(!empty($rd['visits'])){
			$visits = $rd['visits'];			
			foreach ($visits as $key => $value){
				$rd['visits'][$key]->telefono = base64_decode($value->telefono,true);
				$rd['visits'][$key]->comentaris = base64_decode($value->comentaris,true);
				$rd['visits'][$key]->cog1 = base64_decode($value->cog1,true);
				$rd['visits'][$key]->cog2 = base64_decode($value->cog2,true);
				$rd['visits'][$key]->nom = base64_decode($value->nom,true);
			}
		}
		if($has_return_type){
			return $rd;
		}
		if($rd['visits']){
			$success = true;
			$message = "success";
		}else{
			$success = true;
			$message = "No recode found";
		}	
		echo returnJsonResponse($message,$success,$rd);
	}
	/**
	 * save patient details , personal data are stored in encrypted mode
	 * @route  save-patient
	 * @author Koushik Sen
	 * @version 1.0.0
	 * @date    2018-02-19
	 * @return  json 		returns json response with post data and success status
	 */
	function save_patient_post(){
		$new = 1;
		/*if(!checkDatevalid($this->post('dateofbirth'))){
			echo json_encode(array('success'=>false,'message'=>'invalid date!'));
		}*/
		$params = array(
			"datai" => date('Y-m-d'),
			"cog1"	=> base64_encode($this->post('last_name')),
			"cog2"	=> base64_encode($this->post('second_last_name')),
			"nom"	=> base64_encode($this->post('name')),
			"direccion"	=> base64_encode($this->post('address')),
			"telefono"	=> base64_encode($this->post('telephone')),
			"dni"		=> base64_encode($this->post('identity_number')),
			"poblacion"	=> base64_encode($this->post('city')),
			"zip"	=> base64_encode($this->post('zip')),
			"observaciones"	=> base64_encode($this->post('comments')),
			"privat"	=> $this->post('private'),
			"id_mutua"	=> $this->post('insurance_id'),
			"idp_mutua"=> null,
			"Datan"	=> $this->post('dateofbirth'),
			"id"	=> null,
			"nuevo"	=> $new,
			"sms"	=> $this->post('is_sms_allowed'),
			"sms_movil"	=> $this->post('sms_number')
		);				
		$res = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.malalts_grabar_new',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'row-array'
			)
		);
		if(!isset($res['code'])){
			$message = "Patient saved successfully";
			$success = true;
		}else{
			$message = "Some error occoured! ".$res['message'];
			$success = false;
		}		
		$return_data_array['malalt'] = array(
			"datai" => date('Y-m-d'),
			"cog1"	=> $this->post('last_name'),
			"cog2"	=> $this->post('second_last_name'),
			"nom"	=> $this->post('name'),
			"direccion"	=> $this->post('address'),
			"telefono"	=> $this->post('telephone'),
			"dni"		=> $this->post('identity_number'),
			"poblacion"	=> $this->post('city'),
			"zip"	=> $this->post('zip'),
			"observaciones"	=> $this->post('comments'),
			"privat"	=> $this->post('private'),
			"id_mutua"	=> $this->post('insurance_id'),			
			"idp_mutua"=> null,
			"Datan"	=> $this->post('dateofbirth'),
			"id"	=> $res['id'],
			"nuevo"	=> $new,
			"sms"	=> $this->post('is_sms_allowed'),
			"sms_movil"	=> $this->post('sms_number')
		);			
		echo returnJsonResponse($message,$success,$return_data_array);
	}
	/**
	 * Patient visit data saved in db.
	 * @route save-visit
	 * @author Koushik Sen
	 * @version 1.0.0
	 * @date    2018-02-21
	 * @return  json        returns json data with success status message and display message
	 */
	function save_visit_post(){
		$success = false;
		$params = array(
			"id_malalt"=> $this->post('patient_id'),
			"id_mutua"=> $this->post('mutual_id'),
			"privado" => $this->post('is_private'),
			"telefono"	=> base64_encode($this->post('phone_number')),
			"tipovisita" => $this->post('type_of_visits'),
			"forzada"=> 0,
			"hora"=> $this->post('hours'),
			"data"=> $this->post('date'),
			"agenda"	=> $this->post('agenda'),
			"comentaris"	=> base64_encode($this->post('comment')),
			"codigo_facturacion"	=> 0
		);
		$rd = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.visitas_insert',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'dml'
			)
		);		
		$return_data_array = array();
		if(!isset($rd['code'])){
			$message = "Visit saved successfully"; $success = true;			
		}else{
			$message = $rd['message'];
		}
		echo returnJsonResponse($message,$success,$return_data_array);
	}
	/**
	 * Update visit data for patient
	 * @route update-visit
	 * @author Koushik Sen
	 * @version 1.0.0
	 * @date    2018-02-21
	 * @return  json        returns json data with success status message and display message
	 */
	function update_visit_post(){
		$success = false;
		$params = array(
			"id" => $this->post('visit_id'),
			"vg_malalt"=> $this->post('patient_id'),
			"vg_mutua"=> $this->post('mutual_id'),
			"privado" => $this->post('is_private'),
			"telefono"	=> base64_encode($this->post('vtel')),
			"tipovisita" => $this->post('vtip'),
			"forzada"=> 0,
			"hora"=> $this->post('hours'),
			"data"=> $this->post('date'),
			"agenda"	=> $this->post('agenda'),
			"texto"	=> base64_encode($this->post('comment')),
			"codigo_facturacion"	=> 0
		);		
		$rd = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.visitas_update',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'row-array'
			)
		);		
		$return_data_array = array();		
		if(!isset($rd['code']) && $rd){
			$message = "Visit updated successfully"; $success = true;			
		}else{
			$message = $rd['message'];
		}
		echo returnJsonResponse($message,$success,$return_data_array);
	}
	/**
	 * delete visit record
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-27
	 * @return  json 	returns json response with lastest visits
	 */
	function delete_visit_post(){		
		$id = explode(',',$this->post('id'));
		$error = false;
		$message = $success_message = "";
		if($id){
			$ec = 0;
			$sc = 0;			
			foreach ($id as $key => $value) {
				$action_status = $this->Common_model->execute_sp(
					array('sp_name'=>'mediagenda.visitas_borrar',
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
			echo returnJsonResponse($res['message'],$res['success'],$this->visit_list_post(true));
		}else{
			echo json_encode(array('success'=>false,'message'=>'Please select a visit for delete'));
		}
	}
	/**
	 * Search patient in existing database
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-27
	 * @return  json 	returns search result for matched query
	 */
	function search_patient_post(){
		$params = array(
			"cog1"	=> $this->post('surname'),
			"cog2"	=> $this->post('second_surname'),
			"nom"	=> $this->post('first_name')
		);		
		$patient_list = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.malalts_sele_wgi',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'array'
			)
		);
		echo json_encode(array('patient_list'=>$patient_list,'success'=>true));
	}
	/**
	 * on selecting a patient from search list populate patient data
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-27
	 * @param   boolean       $return returns non json array if true, else returns json array of patient
	 * @return  json|array 	  		  returns non json array if true, else returns json array of patient
	 */
	function get_patient_data_post($return = false){
		$params = array('id'	=>	$this->post('id'));
		$patient_details = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.malalts_datos', 'params' => $params,'db_name' => 'default',
			'return_type' => 'row'));
		$decoded_array = array(
			"nom" => base64_decode($patient_details->nom),
			"direccion" => base64_decode($patient_details->direccion),
			"telefono"	=> base64_decode($patient_details->telefono),
			"poblacion"	=> base64_decode($patient_details->poblacion),
			"observaciones"	=> base64_decode($patient_details->observaciones),
			"privat"	=> $patient_details->privat,
			"maid"	=> $patient_details->maid,
			"datai"	=> $patient_details->datan,
			"id_mutua"	=> $patient_details->oid,
			"omu"	=> $patient_details->omu,
			"sms"	=> base64_decode($patient_details->sms),
			"cog1"	=> base64_decode($patient_details->cog1),
			"sms_movil"	=> $patient_details->sms_movil,
			"cog2"	=> base64_decode($patient_details->cog2),
			"dni" => base64_decode($patient_details->dni)
		);				
		if($return){
			return $decoded_array;
		}else{
			echo json_encode(array('patient_details'=>$decoded_array,'success'=>true));			
		}
	}
	/**
	 * display all previous visit dates in list view
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-27
	 * @return  json 	returns json data for previous visit
	 */
	function previous_visits_post(){
		$params = array(
			"agenda"=>$this->post('agenda_id'),
			"id_malalt"=>$this->post('patient_id'),
			"datai"=>$this->post('date_from'),
			"dataf"=>$this->post('date_to')
		);
		$visit_history = $this->Common_model->execute_sp(array('sp_name'=>'mediagenda.visita_ultimas', 'params' => $params, 'db_name' => 'default', 'return_type' => 'array'));
		json_encode(array('history'=>$visit_history,'success'=>true));
	}
	/**
	 * opens a popup page with patient data fetched from db, if confirmed i.e. "SI" then this function should not work
	 * var id is patient id aka malat_id
	 * @route   confirm-visit
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-03-03
	 * @return  json        json encoded data with patient data
	 */
	function confirm_visit_popup_post(){
		if($this->post('id')){
			$patient_data =  $this->get_patient_data_post(true); // true for return the data exclude the echoing
		}
		echo json_encode(array
			("patient_data"=>
				array(
					'first_last_name'=>$patient_data['cog1'],
					'second_last_name'=>$patient_data['cog2'],
					'name' => $patient_data['nom'],
					'address'=> $patient_data['direccion'],
					'population'=> $patient_data['poblacion'],
					'telephone'=>$patient_data['telefono'],
					'dni'=> $patient_data['dni'],
					'mutua'=> ($patient_data['omu']!='')?$patient_data['omu']:"PRIVADOS"), "success"=>true));
	}
	/**
	 * confirm visit save , update the visit data with specified amount for assigned mutual. if mutual is private then open a separate popup for amount for applicable charge
	 * @route  
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-03-05
	 * @return  json 	returns confirm visit status
	 */
	function update_patient_post(){
		$this->update_patient_visit();
		if($this->post('private')){
			$res = $this->confirm_visit($this->post('visit_id'),$this->post('amount'),$this->post('no_charge'));
		}else{
			$amount = $this->get_charge_amount($this->post('mutual_id'),$this->post('type_of_visit_id'));
			$res = $this->confirm_visit($this->post('visit_id'),$amount);		
		}		
		if(!isset($res['code'])){
			echo returnJsonResponse('your visit has been confirmed',true);		
		}else{
			echo returnJsonResponse('Some error occoured ! try after some time',false);
		}
	}
	/**
	 * update patient master table for confirming a visit	 
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-03-05
	 * @return bool  returns boolean value 
	 */
	protected function update_patient_visit(){
		$params = array(
			"id"=>$this->post('visit_id'),
			"id_malalt"=>$this->post('patient_id')
		);
		$visit_history = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.visita_update_malalt',
				'params' => $params,
				'db_name' => 'default',
				'return_type' => 'row-array'
			)
		);
		return true;
	}
	/**
	 * confirming visit will save the visit and it's corresponding amounts
	 * @route   {[namespace]}
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-03-05
	 * @param   int        $visit_id  
	 * @param   [type]        $amount    [description]
	 * @param   boolean       $no_charge [description]
	 * @return  [type]                   [description]
	 */
	protected function confirm_visit($visit_id,$amount,$no_charge = false){
	$params = array('id'=>$visit_id,'amount'=>floatval($amount),'nc'=>$no_charge);
	return $this->Common_model->execute_sp(
		array('sp_name'=>'mediagenda.visitas_confirmar',
			'params' => $params,
			'db_name' => 'default',
			'return_type' => 'row-array'
		)
	);	
}
protected function get_charge_amount($mutual_id,$type_of_visit_id){
	$params = array('id_mutua'=>$mutual_id,'tipov'=>$type_of_visit_id);
	return $this->Common_model->execute_sp(
		array('sp_name'=>'mediagenda.contabilidad_visita_importe',
			'params' => $params,'db_name' => 'default','return_type' => 'row'));
}
public function change_of_date_post(){
	$free_hours = $this->load_free_hours();
	echo json_encode(array('free_hours'=>$free_hours,'success'=>true));
}
protected function load_free_hours(){
	$params = array(
		"agenda"=>$this->post('agenda_id'),
		"data" => $this->post('selected_date'),
		"dia"	=> $this->post('selected_day')
	);
	return $free_hours = $this->Common_model->execute_sp(
		array('sp_name'=>'mediagenda.visitas_hora_cambio',
			'params' => $params,'db_name' => 'default','return_type' => 'array'));						
}
public function visit_time_change_post(){
	$params = array(
		"forzada"=> $this->post('forced'),
		"data "=> $this->post('visit_date'),
		"hora"=> $this->post('visit_time'),
		"id"=> $this->post('visit_id'));			
	$change_visit_time = $this->Common_model->execute_sp(
		array('sp_name'=>'mediagenda.visitas_cambio_hora',
			'params' => $params,'db_name' => 'default','return_type' => 'dml'));
	if(!isset($rd['code'])){
		$message = "Visit updated successfully"; $success = true;
	}else{
		$message = $rd['message'];
	}
	echo returnJsonResponse($message,$success,$return_data_array=array() ) ;
}	

}