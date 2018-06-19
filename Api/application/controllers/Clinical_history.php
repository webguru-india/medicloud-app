<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/**
 *	CONSULTAS EXTERNAS > clinica / Datos Personales menu segment module 
 *	@package Controller
 *	@date 2018-02-21
 *	@author Koushik Sen <koushik.sen@webguru-developement.com>
 */
class Clinical_history extends REST_Controller{
	/**	 
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-21
	 */
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
	 * Load diagnostic, peticiones, recetas, parametros, imagenes, informes
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-21
	 * @return  json 		returns data for each modules in json format
	 */
	function load_personal_details_post(){
		$this->load_curso_clinico(); 
		$this->load_diagnosticos(); 
		$this->load_peticiones(); 
		$this->load_recetas();
		$this->load_informes();
		$this->load_imagenes();
		$this->load_parametors();
	}
	/**
	 * [save_clinic_course description]
	 * @route   save-clinic-history
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-28
	 * @return  json 	returns json response
	 */
	function save_clinic_course_post(){
		$now_time = date('H:i:s'); 
		$today = date('Y-m-d');
		/**
		 * editor value 
		 * @var html encoded
		 */
		$curso = $this->post('course'); 
		/**
		 * the patient ID 
		 * @var [type]
		 */
		$id_malat = $this->post('patient_id');
		/**
		 * get login user data
		 */
		$user = get_login_userdata( $this->user_id , $this->access_token);
		/**
		 * username
		 * @var [type]
		 */		
		$user_name = $user->UserName;
		/**
		 * agenda id selected from the dropdown the page
		 * @var [type]
		 */
		$agenda = $this->post('agenda_id');		
		$params = array(
			"hora"=> $now_time, "data"=> $today, "usuario"=> $user_name, "curso" => base64_encode($curso), "id_malalt"=>$id_malat,'agenda'=>$agenda);
		//print_r($params);
		$res = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.clinica_cursclinic_grabar','db_name' => 'default','return_type'=>'row-array',
			'params'=>$params
		));
		/** start save audit information   */
		$datetime = date('Y-m-d H:i:s'); $type_of_event = "ESCRIBIR CURSO CLINICO"; $malalt_id = $id_malat; $ip = $this->post('my_ip');
		$params = array("tipo"=> $type_of_event, "malalt`"=> $malalt_id, "usu"=> $user_name, "fecha" => $datetime, "ip"=> $ip);
		$result = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.audit_insert','db_name' => 'default','return_type'=>'row-array',
			'params'=>$params
		));
		if(!isset($result['code'])){
			$message = "Course saved successfully";
			$success = true;
		}else{
			$message = $result['code'];
			$success = false;			
		}
		echo returnJsonResponse($message,$success,array());
	}
	/**
	 * load patient history of the clinic , of individual patients
	 * @route   load-clinic-history
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-04-03
	 * @return  json 	returns json response
	 */
	function load_clinic_courses_post(){
		$agenda_id = ($this->post('aganda_id'))?$this->post('aganda_id'):false;
		$patient_id = ($this->post('patient_id'))?$this->post('patient_id'):false;
		$params = array();
		if($agenda_id)$params['agenda'] = $agenda_id;$sp = "mediagenda.clinica_cursclinic_leer_agenda";
		if($patient_id)$params['id_malalt'] = $patient_id;$sp = "mediagenda.clinica_cursclinic_leer";
		$result = $this->Common_model->execute_sp(array('sp_name'=>$sp,'db_name' => 'default','return_type'=>'array','params'=>$params));		
		$return_data =array();
		if(!isset($result['code'])){
			$message = "";
			$success = true;			
			$return_data['course_history'] = $result;
		}else{
			$message = $result['code'];
			$success = false;			
		}
		echo returnJsonResponse($message,$success,$return_data);		
	}
	/**
	 * "incluir en qx" module 
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-21
	 * @return  json  returns listing of both scheduled and non-scheduled listing
	 */
	function incluir_en_qx_post(){
		$first_list  = $this->load_programmados_incluir_paciente(true);
		$second_list = $this->load_sin_fecha_incluir_pacicente(true);
		echo json_encode(array('success'=>true, 'first_list'=>$first_list,'second_list'=>$second_list));
	}
	/**
	 * fetch scheduled patient list
	 * @package Controller
	 * @author Koushik Sen <koushik.sen@webguru-developement.com> 
	 * @version 1.0.0
	 * @date    2018-02-21
	 * @param   boolean       $return if value is false then it will return result set as an array of array, else true value will return a json eccoded result set
	 * @return  json|array        returns json array of scheduled list or array of array of scheduled list
	 */
	protected function load_programmados_incluir_paciente($return = false){
		// sele3 for no date
		$programa_Qx = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.qx_sele2','db_name' => 'default','return_type'=>'array',
			'params'=>array("agenda_id"=>$this->post("agenda_id"),'data'=>$this->post('date'))));
		if($programa_Qx){
			foreach ($programa_Qx as $key => $value) {
				$id = $value->id;
				$programa_Qx[$key]->process = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.qx_ints_sele','db_name' => 'default','return_type'=>'array',
			'params'=>array("id"=>$id)));
			}			
		}
		if($return){
			return $programa_Qx;
		}

		echo json_encode(array('programa_Qx'=>$programa_Qx,'success'=>true));
	}
	protected function load_sin_fecha_incluir_pacicente($return = false){
		// sele3 for no date
		$sin_fetcha_qx = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.qx_sele3','db_name' => 'default','return_type'=>'array',
			'params'=>array("agenda_id"=>$this->post("agenda_id"))));
		if($sin_fetcha_qx){
			foreach ($sin_fetcha_qx as $key => $value) {
				$id = $value->id;
				$sin_fetcha_qx[$key]->process = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.qx_ints_sele','db_name' => 'default','return_type'=>'array',
			'params'=>array("id"=>$id)));
			}			
		}
		if($return){
			return $sin_fetcha_qx;
		}
		echo json_encode(array('sin_fetcha_qx'=>$sin_fetcha_qx,'success'=>true));
	}
	function listed_by_mutuas_rates_post(){
		//Cabecera is deprecated, always false Skip it for now
	}
	
	// incluir paciente form
	function intervenciones_list_post(){
		$qx = true;
		$agenda = $this->post('agenda_id');		
	// muatua set in time of profile creation not visit time mutual
		if($this->post('patient_mutual')==false){
			$params = array('id'	=>	$this->post('malalt_id'));
			$patient_details = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.malalts_datos', 'params' => $params,'db_name' => 'default',
			'return_type' => 'row'));
			$actos = $this->Common_model->execute_sp(
				array(
					'sp_name'=>'mediagenda.actos_sele2',
					'db_name' => 'default',
					'return_type'=>'array',
					'params'=>array('qx'=>$qx,'agenda'=>$agenda, 'mutua'=> $patient_details->id_mutua)
				)
			);		
		}else{
			$actos = $this->Common_model->execute_sp(
				array(
					'sp_name'=>'mediagenda.actos_privats_sele2',
					'db_name' => 'default',
					'return_type'=>'array',
					'params'=>array('qx'=>$qx,'agenda'=>$agenda)
				)
			);

		}		
		echo json_encode(array('actos'=>$actos,'success'=>true));
	}
	function accept_selected_interventions_post(){		
		$params = array("id"=>$this->post('actos_id')); $index = $this->post('button_index');
		$priv = $this->post('private');
		$previous_array = json_decode($this->post('list_process'));		
		$res = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.actos_tarifas_id_sele',
				'db_name' => 'default',
				'return_type'=>'row',
				'params'=>$params
			)
		);

		// VQX(index) = dstarifas.First.ID.ToString
		$vayud = $res->ayudante; $perayuda = $res->perayuda;
		if($res->tarifa>0)$vtarifa = $res->tarifa;
		if ( $index > 0 And $priv == false){
			$vtarifa = $vtarifa / 2;
		}
		if( $vtarifa > 0){
			$vtarifa = number_format($vtarifa,2);
		}		
		$accepted_process_list = array(
			0=> (object) array(),
			1=> (object) array(),
			2=> (object) array(),
			3=> (object) array(),
			4=> (object) array()
		);		
		if(!empty($previous_array)){			
			foreach ($previous_array as $key => $value) {
				if(isset($value->index)){
					$accepted_process_list[$value->index] = $value;
				}
				
			}
		}
		$accepted_process_list[$index] = array('index'=>$index,'nombre'=>$res->nombre,'code'=>$res->codigo,'vayud'=>$vayud,'perayuda'=>$perayuda,'vtarifa'=>$vtarifa,'actos_id'=>$res->ID);
		//print_r($accepted_process_list); die;
		echo json_encode(array(
			'accepted_process_list'=>$accepted_process_list,
			'success'=> true
		));		
	}
	/*============================================*/
	/**
	 * display list of selected patient visits
	 * @return json return lists of all previous activity in json array format	 
	 * 
	 */
	function previous_activity_post(){
		$params = array("malalt"=>$this->post('patient_id'));
		$res['previous_activity'] = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.visitas_malalt_sele',
				'db_name' => 'default',
				'return_type'=>'array',
				'params'=>$params
			)
		);
		if($res){
			$success = true;
			$message = "success";
		}else{
			$success = false;
			$message = "No recode found";
		}	
		echo returnJsonResponse($message,$success,$res);
	}
	function save_qx_post(){
		$error = "";
		$error = $this->validate_form();
		if(!$error){
			echo json_encode(array("success"=>false,"message"=>$error));
			exit;
		}		
		$intervention_id = explode(',',$this->post('intervention_id'));		
		$tarifa = explode(',',$this->post('tarifa')); // intervencion readonly text
		/* =========== deprecated ==========
			$paplus = 0;
			for($i = 0; $i <=3 ; $i++){
			if( floatval($intervention_id[$i])> 0 ){
				$paplus = $paplus + 1;			
			}
			}
		*/ 
		$vid = 0;				
		if($this->post('new')== false)$vid = $this->post('qx_id');
		if($this->post('ayudante'))$va = $this->post('ayudante');
		if($this->post('instrumentista'))$vi =$this->post('instrumentista');
		if($this->post("gastos"))$vgastos = $this->post('gastos');
		if($this->post("anesthesia"))$anesthesia = $this->post('anesthesia');
		$vmutua = ($this->post('private'))?0:$this->post('mutual_id');
		//print_r($this->post());
		$params = array(
			"nuevo"		=> $this->post('new'),
			"agenda" 	=> $this->post("agenda_id"),
			"data"		=> $this->post("sin_fetcha")?NULL:$this->post("date"),
			"id_malalt"	=> $this->post("patient_id"),
			"mutua"		=> $vmutua,
			"hora"		=> $this->post("time_of_the_day"),
			"clinica"	=> $this->post("quirofano"),
			"observaciones"	=> ($this->post("observation")!='null')?$this->post("observation"):"",
			"diagnostico"	=> ($this->post("diagnosis")!='null')?$this->post("diagnosis"):"",
			"ayudante"		=> ($this->post("ayudante")!='null')?$this->post("ayudante"):null,
			"instrumentista"	=> ($this->post("instrumentista")!='null')?$this->post("instrumentista"):'',
			"moneda"	=> NULL,
			"ing"		=> $this->post('type_of_intervencion')=='1'?TRUE:FALSE,
			"ucias"		=> $this->post('type_of_intervencion')=='2'?TRUE:FALSE,
			"cma"		=> $this->post('type_of_intervencion')=='3'?TRUE:FALSE,
			"privado"	=> $this->post("private"),
			"gastos"	=> $this->post("gastos"),
			"anestesia"	=> $anesthesia,
			"vid"=> $vid
		);
	//	print_r($params); die;
		$nid = $this->Common_model->execute_sp(
			array(
				'sp_name'=>'mediagenda.qx_progqx_grabar', 'db_name' => 'default', 'return_type'=>'row-array', 'params'=>$params));
		if(isset($nid['code'])){
			$message = $nid['message'];
			$success =false;
			echo returnJsonResponse($message,$success);
			exit();
		}
		$nfac = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.qx_progqx_delete_ints','db_name' => 'default','return_type'=>'row','params'=>array("vid"=>$nid['qx_id'])));
		for($i = 0; $i <=3 ; $i++){
			if(isset($tarifa[$i])){
				$res = $this->Common_model->execute_sp(
				array(
					'sp_name'=>'mediagenda.qx_progqx_grabar_ints',
					'db_name' => 'default','return_type'=>'row-array',
					'params'=>array(
						"pqx"=>$nid['qx_id'],
						"intervencion"=>$intervention_id[$i],
						"tarifa"=>$tarifa[$i],
						"ayuda"=>0,
						"instrum"=>0,
						"ay"=>0,
						"nfac"=>$nfac->nfac
					)));
			}			
		}
		$message = "process completed successfully";  $success = true;
		/*if($this->post("sin_fetcha")){
			$return_array['second_list'] = $this->load_sin_fecha_incluir_pacicente(true);
		}else{
			$return_array['first_list'] = $this->load_programmados_incluir_paciente(true);
		}*/
		echo returnJsonResponse($message,$success);
	}	
	protected function validate_form(){
		if(!$this->post('operator')){
			return "QUIRÓFANO is required";
		}
		if(!$this->post('diagnostic')){
			return "DIAGNOSTICO is required";
		}
		return false;
	}		
	function print_report_part_post(){
		$extention = "PDF";
		//$connection_string = "Context.Session("bd").ToString";
		$initial_date = $this->post("initial_date");
		$final_date = $this->post("final_date");
		$agenda = $this->post("agenda_id");
		$title = "My.Resources.str636";
		$cabecera = true;
		$orderby = $this->post("order_by");		
		//if($orderby){
		$report_data = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.infos_parteqx','db_name' => 'default','return_type'=>'array',
			'params'=>array("datai"=>$initial_date,"dataf"=>$final_date,"cabecera "=>$cabecera)));
		//}	 	
		echo json_encode(array("report_data"=>$report_data,"success"=>true));
	}	
	function load_clinic_diagnostic_dropdown_post(){		
		$diagnostic_dropdown = $this->Common_model->execute_sp(array(
		'sp_name'=>'mediagenda.clinica_diagnosticos_lista','db_name' => 'default','return_type'=>'array',
		'params'=>array("agenda"=>$this->post('agenda_id'))));
		echo json_encode(array("diagnostic"=>$diagnostic_dropdown,'success'=>true));
	}

	function show_assigned_diagnostic_post($return = false){
		$all = $this->post("show_all"); $agenda_id = $this->post("agenda_id"); $patient_id = $this->post("patient_id");
		if($all){
			$sp_name = "mediagenda.clinica_diagnosticos_sele"; $params  = array("malalt"=>$patient_id);
		}else{
			$sp_name = "mediagenda.clinica_diagnosticos_sele_agenda"; $params = array("agenda"=>$agenda_id,"malalt"=>$patient_id);
		}
		$diagnostic_list = $this->Common_model->execute_sp(array(
			'sp_name'=>$sp_name,'db_name' => 'default','return_type'=>'array',
			'params'=> $params));
		if($return){
			return $diagnostic_list;
		}
		echo json_encode(array("assign_diagnostic_list"=>$diagnostic_list,'success'=>true));
	}
	function save_diagnostic_patient_post(){
		$new = true;
		$id= 0;
		$diagnostic_id = $this->post('diagnostic_id');
		$patient_id = $this->post('patient_id');
		$agenda = $this->post('agenda_id');
		if($this->post('id')){
			$id = $this->post('id'); $new =false;
		}
		$params = array('nuevo'=>$new,'diagnostico'=>$diagnostic_id,'id_malalt'=>$patient_id,'agenda'=>$agenda,'id'=>$id);
		$res = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.clinica_diagnosticos_grabar_paciente','db_name' => 'default','return_type'=>'row-array',
			'params'=> $params));		
		if(!isset($res['code'])){
			echo json_encode(array("assign_diagnostic_list"=>$this->show_assigned_diagnostic_post(true),'success'=>true,'message'=>"Diagnostic assigned to patient"));			
		}else{
			echo json_encode(array('message'=>$res['message'],'success'=>false));			
		}
		
	}
	function delete_diagnostic_patient_post(){
		$id_array = explode(',', $this->post('diagnostic_id'));
		$error = false;
		$message = $success_message = "";
		if($id_array){
			$ec = 0;
			$sc = 0;			
			foreach ($id_array as $key => $value) {
				$action_status = $this->Common_model->execute_sp(
				array(
					"sp_name"=>"mediagenda.clinica_diagnosticos_borrar",
					"db_name"=>'default',
					"return_type"=>"array",
					"params"=>array("id"=>$value)
				)
			);
				if($action_status['code']!=0000){
					$ec++;
					$error = true;				
				}else{
					$sc++;					
				}
			}
			$rd_array = $this->show_assigned_diagnostic_post(true);
			$res = buildErrorResponse($error,$ec,$sc);
			echo returnJsonResponse($res['message'],$res['success'],array('assign_diagnostic_list'=>$rd_array));
		}else{
			echo json_encode(array('success'=>false,'message'=>'Please select a diagnosis for delete'));
		}
	}
	function list_assigned_peticons_post($return = false){
		if($all = $this->post('today')){
			$spname = "mediagenda.clinica_solicitud_sel"; $params = array('id_malalt'=>$this->post('patient_id'));
		}else{
			$spname = "mediagenda.clinica_solicitud_sel_agenda"; $params = array('id_malalt'=>$this->post('patient_id'),'agenda'=>$this->post('agenda_id'));
		}
		$rd['assigned_peticions'] = $this->Common_model->execute_sp(array('sp_name'=>$spname,'db_name'=>'default','return_type'=>'array','params'=>$params));
		if($rd['assigned_peticions']){
			$success = true;
			$message = "success";
		}else{
			$success = true;
			$message = "No recode found";
		}	
		echo returnJsonResponse($message,$success,$rd);
	}
	function assign_peticons_to_clinic_post(){		
		$params = array(
			'peticion'	=>	$this->post('peticion_id'),
			'fecha'	  	=> 	date('Y-m-d H:i:s'),
			'usuario' 	=>	$this->post('usuario'), // username
			'id_malalt'	=>	$this->post('patient_id'),
			'agenda'	=>	$this->post('agenda_id'),
			'cabecera'	=>	false,
			'texto'		=>	$this->post('texto')
		);			
		$this->load->library('pdfgenerator');
		define('UPLOAD_DIR', 'pdf/');
		$url = base_url().UPLOAD_DIR.date('Y-m-d')."pdf";
		$pdf = $this->pdfgenerator->generate($this->post('texto'), $url, false, 'A4', 'portrait');		
    	@file_put_contents(UPLOAD_DIR.date('Y-m-d')."pdf", $pdf);
		if($this->post('has_peticion')){
			$res = $this->Common_model->execute_sp(array('sp_name'=>'mediagenda.clinica_solicitud_insert','db_name'=>'default','return_type'=>'row-array','params'=>$params));
		}
		if(!isset($res['code'])){
			echo json_encode(array('success'=>true,'message'=>'peticions assigned successfully','return_data'=>$url));
		}else{
			echo json_encode(array('success'=>false,'message'=>$res['message']));
		}    
	}
	function prescribe_treatment_details_load_post(){				
		$treatment = $this->post('treatment'); $posologia = $this->post('posologia');
		$unidades = $this->post('unidades'); $pauta = $this->post('pauta'); $obs = $this->post('obs');
		$patient_details = $this->get_patient_details();
		$agenda_details = $this->get_agenda_details();
		$doctors_details = $this->get_doctors_details($agenda_details->medico);		
		$message = ""; $success = true;
		echo json_encode(array('message'=>'', 'success'=> true,"patient_details" => $patient_details, "agenda_details" => $agenda_details, "doctors_details" => $doctors_details));

	}
	protected function get_patient_details(){
		$params = array('id'	=>	$this->post('malat_id'));
		$patient_details = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.malalts_datos', 'params' => $params,'db_name' => 'default',
			'return_type' => 'row'));
		return $decoded_array = array(
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
	}
	protected function get_agenda_details(){
		$params = array('id'	=>	$this->post('agenda_id'));
		return $agenda_details = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.agenda_leer', 'params' => $params,'db_name' => 'default',
			'return_type' => 'row'));
	}
	protected function get_doctors_details($doctor_id){
		$params = array('id'	=>	$doctor_id);
		return $agenda_details = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.metges_sel_id', 'params' => $params,'db_name' => 'default',
			'return_type' => 'row'));	
	}
	public function save_prescribe_post(){
		$params = array(
			'farmaco' => $this->post('treatment_id'),
			'fecha'=>date('Y-m-d H:i:s'),
			'usuario' => "pending",
			'id_malalt'	=> $this->post('malalt_id'),
			'agenda'	=> $this->post('agenda_id'),
			'unidades'	=> $this->post('unidades'),
			'pauta'		=> $this->post('pauta'),
			'posologia'		=> $this->post('posologia'),
			'instrucciones'	=> $this->post('instrucciones')
		);		
		$res = $this->Common_model->execute_sp(
			array('sp_name'=>'mediagenda.clinica_recetas_insert', 'params' => $params,'db_name' => 'default', 'return_type' => 'row-array'));		
		if(!isset($res['code'])){
			echo json_encode(array('success'=>true,'message'=>'prescribed successfully','return_data'=>$this->list_assigned_recetas_post(true) ));
		}else{
			echo json_encode(array('success'=>false,'message'=>$res['message']));
		}
	}
	public function list_assigned_recetas_post($return = false ){				
		if($this->post('today')){
			$params = array('id_malalt'=>$this->post('malalt_id'));
			$sp = "mediagenda.clinica_recetas_sel";
		}else{
			$params = array('id_malalt'=>$this->post('malalt_id'), 'agenda'=>$this->post('agenda_id'));
			$sp = "mediagenda.clinica_recetas_sel_agenda";
		}		
		$res['recetas'] = $this->Common_model->execute_sp(
			array('sp_name'=>$sp, 'params'=>$params,'db_name'=>'default','return_type'=>'array'));		

		if($return){
			return $res['recetas'];
		}
		if(!isset($res['code'])){
			echo json_encode(array('success'=>true,'message'=>'prescribed successfully','return_data'=>$res));
		}else{
			echo json_encode(array('success'=>false,'message'=>$res['message']));
		}
	}
}