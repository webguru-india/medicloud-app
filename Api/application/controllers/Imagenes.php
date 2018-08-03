<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/**
 *	Imagenes
 *	@package Controller
 *	@date 2018-07-18
 *	@author Dipak
 */
class Imagenes extends REST_Controller{

	/**	 
	 * @package Controller
	 * @author Dipak
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
	/*save image description*/
	function save_imagenes_post(){
		$image=base_url()."/assets/img/superbox/man.png";
		//$today = date('Y-m-d');
		$today = $this->post('date');
		 $title = $this->post('title');
		  $description = $this->post('description');
		  $id_malalt = $this->post('id_malalt');
		   $file = $this->post('file');
		   if($file){
		   	$file=$file;
		   }else{
		   		$file=$image;
		   }
		    $image_width = $this->post('image_width');
		      $image_height = $this->post('image_height');
		      $agenda = $this->post('agenda');
		      $params = array(
			'data'=>$today, 'title'=> $title, 'comentaris'=> $description, 'malalt' => $id_malalt, 'ancho' => $image_width, 'largo' =>$image_height, 'agenda' =>  $agenda
			);
		$res = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.imagenes_insert','db_name' => 'default','return_type'=>'row',
			'params'=>$params
		));

		if(!isset($result['code'])){
			//$message = "Information saved successfully";
			//$success = true;
			//echo returnJsonResponse($message,$success,array());	
		//	echo $this->db->last_query(); exit;
			$this->image_upload($res->id,$file);

		}else{
			$message = $result['code'];
			$success = false;
			echo returnJsonResponse($message,$success,array());			
			
		}
		
	}

	/*Image Upload*/

	function image_upload($res,$image){
		
			//$data = file_get_contents($image);
			//$base64 = base64_encode($image);
			$base64 =$image;
		$insert_id=$res;
		//var_export($insert_id);exit;
		 $params = array(
			 'id'=> $insert_id,'imagen'=>$base64);
		$res = $this->Common_model->execute_sp(array(
			'sp_name'=>'mediagenda.imagenes_insert_imagen','db_name' => 'default','return_type'=>'row',
			'params'=>$params
		));

		if(!isset($result['code'])){
		$message = "Information saved successfully";
			$success = true;
			

		}else{
			$message = $result['code'];
			$success = false;		
			
		}
		echo returnJsonResponse($message,$success,array());	
		
	}
     /*get image respect id*/
	function get_imagen_post(){
			if($this->post('imagen_id')){
				$params = array("id"=> $this->post('imagen_id'));
				$res = $this->Common_model->execute_sp(array(
					'sp_name'=>'mediagenda.clinica_imagenes_sele3','db_name' => 'default','return_type'=>'array',
					'params'=>$params));
					
					if(!isset($res['code'])){
						
						echo json_encode(array('success'=>true,'image'=>$res));
					}else{
						echo json_encode(array('success'=>false,'image'=>$res));
					}
			}else{
				echo returnJsonResponse($message='Please select id',$success=false,array());	
			}
			
	}
	/* get all */
	function get_all_imagens_post($return = false){
		$id_malalt = $this->post('id_malalt');
		 $agenda = $this->post('agenda');
		 if($id_malalt!="" && $agenda!=""){
		 	$params = array("malalt"=> $id_malalt,"agenda"=>$agenda);
				$res = $this->Common_model->execute_sp(array(
					'sp_name'=>'mediagenda.clinica_imagenes_sele_agenda','db_name' => 'default','return_type'=>'array',
					'params'=>$params));
					
					if($return){
							return $res;
							exit;
							}
					if(!isset($res['code'])){
							echo json_encode(array('success'=>true,'imagenes_list'=>$res));
						}
			 }else{
		 		echo returnJsonResponse($message='Please select id_malalt and agenda',$success=false,array());	
		 }

	}	
	/*delete Image*/
	function delete_imagen_post(){
		if($this->post('imagen_id')){

				$params = array("id"=> $this->post('imagen_id'));

				$res = $this->Common_model->execute_sp(array(
					'sp_name'=>'mediagenda.imagenes_delete','db_name' => 'default','return_type'=>'row',
					'params'=>$params));
					
					if(!isset($res['code'])){
						
						echo returnJsonResponse($message='Successfully delete',$success=true,array('imagenes_list'=>$this->get_all_imagens_post(true)));
					}else{
						echo returnJsonResponse($message='Server Error',$success=false,array());
					}
			}else{
				echo returnJsonResponse($message='Please select id',$success=false,array());	
			}
	}

	/*update image*/
	function edit_imagen_post(){
			if($this->post('id')){
				$file = $this->post('file');
				$this->image_upload($this->post('id'),$file);
			}else{
				echo returnJsonResponse($message='Please select id',$success=false,array());
			}
	}

	/*edit Image description*/
	function edit_imagen_description_post(){
		if($this->post('id') && $this->post('title')){
				 $title = $this->post('title');
		  		$description = $this->post('description');
		  		$file = $this->post('file');
		  		 $params = array(
						'id'=>$this->post('id'), 'title'=> $title, 'comentaris'=> $description
					);
				$res = $this->Common_model->execute_sp(array(
					'sp_name'=>'mediagenda.imagenes_update','db_name' => 'default','return_type'=>'row',
					'params'=>$params
				));


				if(!isset($res['code'])){
						if($file){
							$this->image_upload($this->post('id'),$file);
						}else{
							echo returnJsonResponse($message = "Information saved successfully",$success = true,array());	
						}	
					}else{
						echo returnJsonResponse($message='Server Error',$success=false,array());
					}

			}else{
				echo returnJsonResponse($message='please check all information',$success=false,array());
			}
	}

}