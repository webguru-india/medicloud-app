$(document).ready(function(){
	var borrar_id = false;
	// $(document).on('click','#delete_doctor',function(){		
	// 	borrar_id = $('input[name="select_doctor"]:checked').val();
	// 	if(borrar_id){
	// 		window.location.href = base_url+"facultativos/delete/"+borrar_id;
	// 	}else{
	// 		alert("select a doctor");
	// 	}

	// });	
	$(document).on('hide.bs.modal','#Anadir',function(){
		$('#AnadirForm')[0].reset();
	});
	// $(document).on('click','.edit-metges',function(){				
	// 	var id = $('input[name="select_doctor"]:checked').val();
	// 	if(id){
	// 		$.ajax({
	// 			type: 'post',
	// 			url : base_url+"modificar-metges",
	// 			data : { id : id }
	// 		}).done(function(return_data){				
	// 			var metges_data = $.parseJSON(return_data);
	// 			var doctor_data = metges_data.doctor_data;
	// 			$("#doctor").val(doctor_data.medico);
	// 			$("#category").val(doctor_data.Especialitat);
	// 			$("#collegiate").val(doctor_data.N_colegiat);
	// 			$("#nif").val(doctor_data.Nif);
	// 			$("#address").val(doctor_data.direccion);
	// 			$("#cip").val(doctor_data.Cip);
	// 			$("#population").val(doctor_data.Poblacion);
	// 			$("#phone").val(doctor_data.Telefono);
	// 			$("#email").val(doctor_data.email);
	// 			$("#doctorID").val(doctor_data.id);				
	// 			$("#Anadir").modal('show');
	// 		});
	// 	}else{
	// 		alert("select a doctor");
	// 	}
	// })
	$(document).on('submit','#login-form',function(){		
		if(validate_login_data()){
			authLogin(function(callback){
				var cbd = $.parseJSON(callback);
				if(cbd['success']){
					window.location.href = "dashboard";
				}else{
					$("#error").show();
					$("#errorMsg").html(cbd['message']);					
				}
			});
		}
	});
	function validate_login_data(){
		var center = $("#center").val().trim(); var username = $("#username").val().trim(); 
		var password = $("#password").val().trim();
		if(center=="" || username == "" || password == ""){
			$("#error").show();
			$("#errorMsg").html("DATOS DE CONEXION INVALIDOS");
			return false;
		}
		return true;
	}
	// function authLogin(callback){
	// 	var center = $("#center").val().trim(); var username = $("#username").val().trim(); 
	// 	var password = $("#password").val().trim();
	// 	$.ajax({
	// 		type : "post",
	// 		data : { username : username, center : center , password : password },
	// 		url : base_url+"authLogin"
	// 	}).done(function(return_data){
	// 		callback(return_data);
	// 	});
	// }
	$(document).on('submit','#Anadir form',function(){
		console.log($(this).serializeArray());
	});
});