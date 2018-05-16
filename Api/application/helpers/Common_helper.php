<?php 
if(!function_exists('getHashedPassword')){
    function getHashedPassword($plainPassword){
        return password_hash($plainPassword, PASSWORD_DEFAULT);
    }
}
/**
 * This function used to generate the hashed password
 * @param {string} $plainPassword : This is plain text password
 * @param {string} $hashedPassword : This is hashed password
 */
if(!function_exists('verifyHashedPassword')){
    function verifyHashedPassword($plainPassword, $hashedPassword){
        return password_verify($plainPassword, $hashedPassword) ? true : false;
    }
}
if(!function_exists('modify_date')){
    function modify_date($date,$format){
        return date($format, strtotime( $date ));
    }
} 
if(!function_exists('checkUserAuth')){   
    /**
     * user authentication checking , return true or false based on login credentials
     * @package helper
     * @author Koushik Sen
     * @version 1.0.0
     * @date    2018-02-19
     * @param   string        $user_id        the user id primary key of [identities].[dbo].[Users]
     * @param   mixed         $security_stamp user token , this update for on every login
     * @param   integer       $onLogin        checks if checking is at the time of login, default is false, if not time of login the update the token in db 
     * @return  boolean                       return TRUE/FALSE 
     */
    function checkUserAuth($user_id,$security_stamp,$onLogin = 0){
        /**
         * get ci instance
         * @var object
         */
        $CI = get_instance();        
        $CI->load->model('Common_model');
        $params = array('user_id'=>trim($user_id),'auth_key'=>trim($security_stamp),'last_login'=>date('Y-m-d H:i:s'),'last_seen'=>date('Y-m-d H:i:s'),'onLogin'=>$onLogin);        
        $validate_data = $CI->Common_model->execute_sp(
            array('sp_name'=>'userAuthentication',
                'params' => $params,
                'db_name' => 'identities',
                'return_type' => 'row'
            )
        );       
        
        if(isset($validate_data->authkey) && $validate_data->authkey!=$security_stamp){
            $validate_data->found = 0;
        }
      
        return $validate_data->found;
    }
}
if(!function_exists('returnJsonResponse')){
    /**
     * build and returns json encoded response WITH data needed to ne fetched     
     * @author Koushik Sen
     * @version 1.0.0
     * @date    2018-02-19
     * @param   string        $message  text to be shown in frontend default NULL
     * @param   boolean       $success  success value is set in response parameter , default true
     * @param   array         $rd_array 
     * @return  json          json response sent through api
     */
    function returnJsonResponse($message="",$success = true,$rd_array = array()) {
        $CI = get_instance();
        if(empty($rd_array)){
            echo json_encode(array('message'=>$message,'success'=>$success));           
        }else{
            echo json_encode(array('message'=>$message,'success'=>$success,key($rd_array)=>$rd_array[key($rd_array)] ));                       
        }
        
    }
}
if(!function_exists('buildErrorResponse')){
    function buildErrorResponse($error,$errorCode,$successCode){
        $CI = get_instance();
        $CI->load->model('Common_model');             
        $message ="";
        if($error){
            if($successCode>0){  
                $deletedNumRecords = ($successCode>1)?"s ":" ";
                $nonDeletedNumRecords = ($errorCode>1)?"s ":" ";
                $message = "<b>".$successCode." record".$deletedNumRecords."deleted sucessfully.</b><br/> ".$errorCode." record".$nonDeletedNumRecords."already assigned to some data, please unassigned them before delete!";
                $successCode = true;
            }else{
                $successCode = true;
                $message = "No record deleted. Please unassigned them before delete!";
            }           
        }else{
            $successCode = true;
            $message = "Operation completed successfully!";
        }
        return $res = array('message'=>$message,'success'=>$successCode);
    }
    if(!function_exists('hashEncrypt')){
        function hashEncrypt($string){            
            $iv = mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC),MCRYPT_DEV_URANDOM);
            $encrypted = base64_encode($iv.mcrypt_encrypt(MCRYPT_RIJNDAEL_128,
                hash('sha256', ENC_DEC_KEY, true),
                $string,
                MCRYPT_MODE_CBC,
                $iv));
            return $encrypted;
        }
    }
    if(!function_exists('hashDecrypt')){
        function hashDecrypt($encrypted){            
            $data = base64_decode($encrypted);        
            $iv = substr($data, 0, mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC));
            $decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_128,hash('sha256', ENC_DEC_KEY, true),
                substr($data, mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC)),
                MCRYPT_MODE_CBC,$iv),"\0");
            return $decrypted;        
        }
    }   
    if(!function_exists('get_login_userdata')){
        /**
         * fetch data of logged in user 
         *
         * @param varchar $user_id
         * @param varchar $security_stamp
         * @return obejct
         */
        function get_login_userdata($user_id,$security_stamp){            
        /**
         * get ci instance
         * @var object
         */
        $CI = get_instance();        
        $CI->load->model('Common_model');
        $params = array('user_id'=>$user_id,'auth_key'=>$security_stamp);
        $validate_data = $CI->Common_model->execute_sp(
            array('sp_name'=>'getUserData',
                'params' => $params,
                'db_name' => 'identities',
                'return_type' => 'row'
            )
        );        
        return $validate_data;
        }
    }    
}
?>