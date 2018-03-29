$(document).ready(function(){
	var daySelected = agenda_id = false; var finalTimeIntervals = new Array();
	$(document).on('change','#especialidad',function(){
		var specialist = $('#especialidad').val();
		// $.ajax({
		// 	type : 'post',
		// 	url : base_url+"load-agendas",
		// 	data : { specialist :  specialist}
		// }).done(function(return_data){
		// 	$("#agendas").html(return_data);
			
		// });
	});	
	$(document).on('click','.select-day',function(){
		daySelected = $(this).val();
		agenda_id = $("#agendas").val();
		if(agenda_id!='' && daySelected){
			loadHours(daySelected,agenda_id);
		}else{
			$("#hoursList tbody").html("<tr><td>No Content found</td></tr>");
		}
	});
	$(document).on('click','.fetch-hours',function(){
		daySelected = $('input[name="day"]:checked').val();
		agenda_id = $("#agendas").val();	
		if(agenda_id!='' && daySelected){
			loadHours(daySelected,agenda_id);
		}else{
			$("#hoursList tbody").html("<tr><td>No Content found</td></tr>");
		}
		
	});
	// $(document).on('click','#generate',function(e){		
	// 	var startTime = $("#startTime").val();
	// 	var endTime = $("#endTime").val();
	// 	var interval = $("#interval").val();
	// 	generate_hours(startTime,endTime,interval);

	// });
	$(document).on('submit','#saveHours',function(){
		if(!daySelected){
			alert("select a day first");
			return false;
		}else{
			/*var startTime = $("#startTime").val();
			var endTime = $("#endTime").val();
			var interval = $("#interval").val();
			*/
			saveHours();
		}
	});
	function loadHours(daySelected, agenda_id){
		// $.ajax({
		// 	type : 'post',
		// 	url : base_url+'load-hours',
		// 	data : { day : daySelected , agenda : agenda_id }
		// }).done(function(return_data){
		// 	$("#hoursList tbody").html(return_data);
		// });
	}
	// function generate_hours(startTime,endTime,interval){
	// 	var timeDiff = getTimeDiff(startTime,endTime);
	// 	var st = startTime;
	// 	var et = endTime;
	// 	var row = '<tr>';
	// 	if(timeDiff[0] >= interval ){
	// 		$("#generatedhoursList tbody").html("loading...");
	// 		for(var i = timeDiff[1]; (i+ interval * 60*1000 )< (timeDiff[2]);){
	// 			//console.log((i+ interval * 60*1000 ) +"==="+ ( timeDiff[2] ) );
	// 			i = i + interval * 60*1000;
	// 			var newGeneratedString = new Date(i).toLocaleTimeString();
	// 			finalTimeIntervals.push(newGeneratedString);
	// 			row += '<td>'+newGeneratedString+'</td>';
	// 			row +="</tr>";
	// 		}
	// 		$("#generatedhoursList tbody").html(row);
	// 	}else{
	// 		alert("invalid range")
	// 	}
	// }
	// function getTimeDiff(startTime,endTime){				
	// 	var d = new Date();
	// 	var today = d.getFullYear() + "-" +d.getMonth()+ "-"+d.getDate();		
	// 	var startDate = new Date(today +" "+startTime);
	// 	var endDate = new Date(today+" "+endTime);
	// 	var diff = endDate.getTime() - startDate.getTime();
	// 	var hours = Math.floor(diff / 1000 / 60 / 60);
	// 	diff -= hours * 1000 * 60 * 60;
	// 	minutes = Math.floor(diff / 1000 / 60);
	// 	var timeIntvl = new Array();
	// 	timeIntvl.push((hours*60)+minutes);
	// 	timeIntvl.push(startDate.getTime());
	// 	timeIntvl.push(endDate.getTime());
	// 	return timeIntvl;
	// }
	function saveHours(){
		// params :: day ; time ranges; agenda
		var agenda = $("#agendas").val();
		if(agenda==''){
			alert("select a agenda");
			return false;
		}
		// $.ajax({
		// 	type : 'post',
		// 	url : base_url+'save-hours',
		// 	data : { day : daySelected , hours : finalTimeIntervals , agenda : agenda }
		// }).done(function(return_data){
		// 	//var generatedContent = $("#generatedhoursList tbody").html();
		// 	$("#hoursList tbody").html(return_data);
		// 	$("#DefinirIntervalo").modal('hide');
		// });
		
	}
});