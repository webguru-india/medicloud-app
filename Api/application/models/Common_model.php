<?php 
if (!defined('BASEPATH'))exit('No direct script access allowed');
/**
 * A generic model for all types of DB query
 */

class Common_model extends CI_Model {    
    function __construct() {
        parent::__construct();        
    }
    /**
    * @package Common_model
    * @author koushik sen
    * @version 1.0.0
    * @date    2018-02-15
    * @param   array $config Array tructure to holds configuration settings for each variables that needed to execute the query.
    * 
    * Defining the field options
    *  
    * * array['db_name']                 String sets the db name for dynamic db connection use
    * 
    * * array['sp_name']                 String selects the store procedure(SP) for execution
    * 
    * * array['params']                  Array defines the parameters if any , for execution of selected SP
    *
    * * array['list']                    Array defines way to make custom 2D array list, will return array('key'=>'value'), if has a "topvalue" index then array(''=>'topvalue','key'=>'value')
    *
    * * array['return_type']             return type will determine what type of result will return, eg row, row-array, array. etc
    * 
    * @return  array|boolean   return a result set or true / false 
    */
    public function execute_sp($config){        
        $this->db = $this->load->database($config['db_name'],TRUE);
        $sp = $config['sp_name']; 
        $params = isset($config['params'])?$config['params']:false;        
        if($params && sizeof($params)>0){
            $p = $params;
            foreach ($p as $key => $value) {
                $sp .= " ?,";
            }
        }        
        $sp = rtrim($sp, ',');
        $list = isset($config['list'])?$config['list']:false;      
        $query = $this->db->query($sp,$params);        
        if(!$query){
            $error = $this->db->error();          
            if($error['code']!=0000){
                return $error;
            }
        }
        //echo $this->db->last_query();
        $return_type = isset($config['return_type'])?$config['return_type']:"array";
        $result = false;        
        switch ($return_type) {
            case 'array':
            if ($query->num_rows() > 0) {
                $result = $query->result();
            }
            break;

            case 'result-array':
            if ($query->num_rows() > 0) {
                $result = $query->result_array();
            }
            break;

            case 'row':                
            if ($query->num_rows() > 0) {
                $result = $query->row();
            }
            break;

            case 'row-array':
            if ($query->num_rows() > 0) {
                $result = $query->row_array();
            }
            break;

            case 'list':               
            if ($list['top_value'])
                $list_arr[''] = $list['top_value'];
            if ($query->num_rows() > 0) {
                foreach ($query->result() as $row) {
                    $list_arr[$row->$list['key']] = $row->$list['value'];
                }
            }
            $result = $list_arr;
            break;

            case 'count':
            $result = $query->num_rows();
            break;

            case 'query':
            $result = $query;
            break;

            case 'array-list':
            $list = array();
            if ($query->num_rows() > 0) {
                foreach ($query->result() as $row) {
                    $list[] = $row->$array_list_key;
                }
            }
            $result = $list;
            break;
            case 'dml':
            if($query && $query->num_rows() >0){
                $result = true;
            }else{                        
                $result = false;
            }
            break;
        }
        $error = $this->db->error();
        if($error['code']!=0000){
            return $error;
        }
        return $result;
    }
}