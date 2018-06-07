<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'Login';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
/*---------login ------------------*/
$route['forgot-password'] = 'Login/forgot_password';
$route['register'] = 'Login/register';
$route['authLogin'] = 'Login/do_login';
/*----------------------------------*/
/*--------------------configuration ---------------*/
$route['save-doctor'] = 'Faculties/save';
$route['get-doctors'] = 'Faculties/doctor_list';
$route['delete-doctor'] = 'Faculties/delete';
$route['edit-doctor'] = 'Faculties/edit';

$route['get-cost-center'] = 'Cost_center/agendas';
$route['save-cost-center'] = 'Cost_center/save_agendas';
$route['edit-cost-center'] = 'Cost_center/edit_agenda';
$route['delete-cost-center'] = 'Cost_center/delete_agenda';

$route['get-medical-center'] = 'Medical_center/medical_center_information';
$route['save-medical-center'] = 'Medical_center/save_medico_center';

$route['schedule'] = 'Schedule/index';
$route['get-hours'] = 'Schedule/load_hours';
$route['save-hours'] = 'Schedule/save_hours';
$route['delete-hours'] = 'Schedule/delete_hours';
/*===== External Consultation ======*/
$route['save-patient'] = 'External_consultations/save_patient';
$route['save-visit'] = 'External_consultations/save_visit';
$route['delete-visit'] = 'External_consultations/delete_visit';
$route['search-patients'] = 'External_consultations/search_patient';
$route['visit-list'] = 'External_consultations/visit_list';
$route['visit-history'] = 'External_consultations/previous_visits';
$route['get-patients-details'] = 'External_consultations/get_patient_data';
$route['update-visit'] = 'External_consultations/update_visit';
$route['confirm-visit'] = 'External_consultations/confirm_visit_popup';
$route['update-patient-visit'] = 'External_consultations/update_patient';
$route['change-of-date'] = 'External_consultations/change_of_date';
$route['visit-time-change'] = 'External_consultations/visit_time_change';

$route['save-clinic-history'] = 'Clinical_history/save_clinic_course';
$route['load-clinic-history'] = 'Clinical_history/load_clinic_courses';
//$route['edit-visit'] = 'External_consultations/get_patient_data';
/*-------------------------------------------------*/

/*------------ configurations clinical api------------*/
//Incluir En QX module
//config clinic procedure
$route['save-process'] = 'Clinic_procedures/save_process';
$route['list-process'] = 'Clinic_procedures/list_process';
$route['delete-process'] = 'Clinic_procedures/delete_process';

// +/- click
$route['intervenciones-list'] = 'Clinical_history/intervenciones_list';
$route['accept-interventions'] = 'Clinical_history/accept_selected_interventions';
$route['save-qx'] = 'Clinical_history/save_qx';


$route['list-pqx'] = 'Clinical_history/incluir_en_qx';

$route['listed-by-mutual-rates'] = 'Clinical_history/listed_by_mutuas_rates';




$route['previous-activity'] = 'Clinical_history/previous_activity';
$route['print-report-part'] = 'Clinical_history/print_report_part';
/*=============Diagnostic API=====================*/
$route['save-diagnostic'] = 'Diagnostic/save';
$route['show-all-diagnostic'] = 'Diagnostic/show';
$route['delete-diagnostic'] = 'Diagnostic/delete';
$route['assign-diagnostic'] = 'Clinical_history/save_diagnostic_patient';
$route['show-assign-diagnostic'] = 'Clinical_history/show_assigned_diagnostic';
$route['delete-assign-diagnostic'] = 'Clinical_history/delete_diagnostic_patient';
/*============ end External Consultation===========*/

/*========= Department API =========================*/
$route['save-department'] = 'Department/save';
$route['show-department'] = 'Department/list';
$route['delete-department'] = 'Department/delete';
/*===================================================*/

/*========= Peticions API =========================*/
$route['save-peticions'] = 'Peticiones/save';
$route['show-peticions'] = 'Peticiones/list';
$route['delete-peticions'] = 'Peticiones/delete';
$route['assign-peticions'] = 'Clinical_history/assign_peticons_to_clinic';
$route['list-peticions'] = 'Clinical_history/list_assigned_peticons';
/*===================================================*/

/**============ Patologia API=================== */
$route['save-patologia'] = 'Patologia/save';
$route['list-patologia'] = 'Patologia/list';
$route['delete-patologia'] = 'Patologia/delete';
/**============================================= */

/**============ Patologia API=================== */
$route['save-recetas'] = 'Recetas/save';
$route['list-recetas'] = 'Recetas/list';
$route['delete-recetas'] = 'Recetas/delete';
/**============================================= */

/**============ Recetas ============= */ 
$route['prescribe-recetas'] = 'Clinical_history/prescribe_treatment_details_load';
$route['save-prescribtion'] = 'Clinical_history/save_prescribe';
$route['list-assigned-recetas'] = 'Clinical_history/list_assigned_recetas';
/**======================================= */

/*------------common api------------*/
$route['load-metges'] = 'Common_controller/load_metges';
$route['load-agendas'] = 'Common_controller/load_agendas';
$route['load-mutuas'] = 'Common_controller/load_mutuas';
$route['load-ayudante'] = 'Common_controller/load_ayudante';
$route['load-instrumentista'] = 'Common_controller/load_ayudante';
$route['load-clinics'] = 'Common_controller/load_quirofano';
$route['load-anestesia'] = 'Common_controller/load_anestesia';
$route['load-mutua-by-agenda'] = 'Common_controller/load_mutuas_by_agenda';

/*----------------------------------*/
$route['enc'] = 'Common_controller/enc';
$route['decrypt'] = 'Common_controller/decrypt';

$route['db-query/(:any)'] = "db_query/index/$1";
