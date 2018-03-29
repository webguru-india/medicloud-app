<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Db_query extends CI_Controller{
	function index($dbname){
		$this->load->database($dbname);
		$query = $this->db->query("SELECT * FROM INFORMATION_SCHEMA.ROUTINES");
		echo "<pre>";
		print_r($query->result());
	}
	function get_table_data($dbname, $table_name){		
		$this->load->database($dbname);
		$query = $this->db->query("SELECT * FROM ".$table_name);
		echo "<pre>";
		print_r($query->result());
	}
}
