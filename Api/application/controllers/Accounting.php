<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
Class Accounting extends CI_Controller{
	function __construct(){
		parent::__construct();
		$this->load->library('public_init_elements');
		$this->public_init_elements->init_elements_inner();
		$this->public_init_elements->is_user_logged_in();
	}
	function index(){
		echo json_encode(array('error'=>true));		
	}
	function otros_ingresos(){
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/otros-ingresos',$data,TRUE);
		$this->load->view('layout_inner',$this->data);	
	}
	function gastos(){
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/gastos',$data,TRUE);
		$this->load->view('layout_inner',$this->data);		
	}
	function listado_de_actividad(){
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/listado-de-actividad',$data,TRUE);
		$this->load->view('layout_inner',$this->data);	
	}
	function facturas_a_mutuas(){
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/facturas-a-mutuas',$data,TRUE);
		$this->load->view('layout_inner',$this->data);	
	}
	function facturas_a_privados(){
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/facturas-a-privados',$data,TRUE);
		$this->load->view('layout_inner',$this->data);	
	}
	function pago_de_sueldos(){
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/pago-de-sueldos',$data,TRUE);
		$this->load->view('layout_inner',$this->data);
	}
	function pago_ayudantias(){
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/pago-ayudantias',$data,TRUE);
		$this->load->view('layout_inner',$this->data);	
	}
	function resumen_fiscal(){
		$data = array();
		$this->data['maincontent'] = $this->load->view('maincontents/resumen-fiscal',$data,TRUE);
		$this->load->view('layout_inner',$this->data);
	}
}