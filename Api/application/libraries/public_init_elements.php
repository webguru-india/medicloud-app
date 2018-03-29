<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class public_init_elements{
	function __construct(){		
		$this->CI = & get_instance();	
	}
	public function init_elements(){
		$this->init_head();
		$this->init_header();
		$this->init_footer();
	}
	protected function init_head(){
		$data = array();
		$this->CI->data['head'] = $this->CI->load->view('elements/head', $data, true);
	}
	protected function init_header(){
		$data = array();
		$this->CI->data['header'] = $this->CI->load->view('elements/header', $data, true);
	}
	protected function init_footer(){
		$data = array();
		$this->CI->data['footer'] = $this->CI->load->view('elements/footer', $data, true);
	}
	public function is_user_logged_in(){
		/*$is_user_logged_in = $this->CI->session->userdata['center_user_details']['is_user_logged_in'];       
		if (!isset($is_user_logged_in) || $is_user_logged_in != TRUE){
			redirect('/');
		}*/	
	}
	public function init_elements_inner(){
		$this->init_head_inner();
		$this->init_ribbon();
		$this->init_left_side_bar_inner();
		$this->init_footer_inner();
	}
	protected function init_head_inner(){
		$data = array();
		$this->CI->data['head'] = $this->CI->load->view('elements/head_inner', $data, true);
	}
	protected function init_ribbon(){
		$data = array();
		$data = $this->init_config_ui();
		$this->CI->data['ribbon'] = $this->CI->load->view('elements/ribbon', $data, true);
	}
	protected function init_footer_inner(){
		$data = array();
		$this->CI->data['footer'] = $this->CI->load->view('elements/footer_inner', $data, true);
	}
	protected function init_left_side_bar_inner(){
		$data = array();
		//$this->CI->data['left_side_bar'] = $this->CI->load->view('elements/left_side_bar_inner', $data, true);	
	}
	protected function init_config_ui(){
		$data['breadcrumbs'] = array(
			"Home" => base_url()
			);
	$data['page_title'] = "Dashboard";	
	return $data;
}
}