import { Component, OnInit } from '@angular/core';
import { HorarioService } from './horario.service';
import { GlobalConfigs } from '../global.config';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  public appAccessToken: string = this.cookieService.get('accessToken');
  public appUserToken: string = this.cookieService.get('userToken');
  public especialidadData: any;
  public specialtySelectedData: any;
  public specialtySelectedId: any;
  public agendasStoredData: any = [];
  public agendasData: any;
  public loadingAgendas: boolean = false;
  public selectedDay: number = 1;
  public selectedAgendasData: any;
  public hoursData: any;
  public finalTimeIntervals: any = [];
  public startTime: any = '';
  public endTime: any = '';
  public intervalsTime: any = '';
  public selectAllChkBx: boolean = false;
  public selectedTimeToEditOrDelete = [];

  constructor(private globalConfigs: GlobalConfigs, private horarioService: HorarioService, private cookieService: CookieService, public pageTitle: Title) {
    if(typeof this.appAccessToken === 'undefined' || this.appAccessToken == '') {
      window.location.href = this.globalConfigs.baseUrl + 'login';
    }
    this.pageTitle.setTitle('Horario | Medicloude');
    
    this.horarioService.loadSpecialtyData(this.appAccessToken, this.appUserToken)
    .subscribe(resp => {
      // console.log(resp);
      this.especialidadData = resp.especialidad;
    });
  }

  ngOnInit() {
  }

  getHoursFunc() {
    if(typeof this.specialtySelectedId === 'undefined' || this.specialtySelectedId == '') {
      return false;
    }
    if(typeof this.selectedAgendasData === 'undefined' || this.selectedAgendasData == '') {
      return false;
    }

    this.selectAllChkBx = false;

    this.selectedTimeToEditOrDelete = [];

    this.horarioService.getHoursData(this.appAccessToken, this.appUserToken, this.selectedDay, this.selectedAgendasData)
    .subscribe(resp => {
      // console.log(resp);
      // this.especialidadData = resp.especialidad;
      if(resp.success == true) {
        this.hoursData = resp.listhours;
      }
    });
  }

  selecteDayOnChange(value) {
    this.selectedDay = value;
    this.getHoursFunc();
  }

  specialtyOnChange(specialtyValue) {
    this.specialtySelectedId = specialtyValue;
    this.loadingAgendas = true;
    this.selectedAgendasData = '';
    this.agendasData = [];
    $('#agendas option').eq(0).prop('selected', true);
    if(typeof this.agendasStoredData[specialtyValue] !== 'undefined') {
      this.agendasData = this.agendasStoredData[specialtyValue];
      this.loadingAgendas = false;
      this.getHoursFunc();
    }
    else {
      this.horarioService.loadAgendasData(this.appAccessToken, this.appUserToken, specialtyValue)
      .subscribe(resp => {
        // console.log(resp);
        if(resp.success === true) {
          this.agendasStoredData[specialtyValue] = resp.agendas;
          this.agendasData = resp.agendas;
          this.getHoursFunc();
        }
        this.loadingAgendas = false;
      });
    }
  }

  agendasOnChange(agendasData) {
    this.selectedAgendasData = agendasData;
    this.getHoursFunc();
  }

  timeFormatting(_time) {
    let formattedHour = _time.split(':')[0],
        formattedMinute = _time.split(':')[1],
        amPm = 'am';
    
    if(formattedHour > 11) {
      amPm = 'pm';
    }
    if(formattedHour > 12) {
      formattedHour -= 12;
    }
    return ('0'  + formattedHour).slice(-2) + ':' + formattedMinute + ' ' + amPm;
  }

  generateHours(startTime,endTime,interval){
		let timeDiff = this.getTimeDiff(startTime,endTime),
		    st = startTime,
		    et = endTime;
        
		if(timeDiff[0] >= interval ){
      this.finalTimeIntervals = [];
			// $("#generatedhoursList tbody").html("loading...");
			for(var i = timeDiff[1]; (i+ interval * 60*1000 )< (timeDiff[2]);){
        i = i + interval * 60*1000
				let newGeneratedString = new Date(i).toLocaleTimeString();
				this.finalTimeIntervals.push(newGeneratedString);
      }
		}else{
			alert("invalid range")
		}
  }
  
	getTimeDiff(startTime,endTime){				
		let d = new Date(),
		    today = d.getFullYear() + "-" +d.getMonth()+ "-"+d.getDate(),
		    startDate = new Date(today +" "+startTime),
		    endDate = new Date(today+" "+endTime),
		    diff = endDate.getTime() - startDate.getTime(),
        hours = Math.floor(diff / 1000 / 60 / 60);
        
		diff -= hours * 1000 * 60 * 60;
		let minutes = Math.floor(diff / 1000 / 60),
        timeIntvl = new Array();
        
		timeIntvl.push((hours*60)+minutes);
		timeIntvl.push(startDate.getTime());
		timeIntvl.push(endDate.getTime());
		return timeIntvl;
	}

  setRangeFunc() {
    let startTime = $("#startTime").val();
		let endTime = $("#endTime").val();
		let interval = $("#interval").val();
		this.generateHours(startTime,endTime,interval);
  }

  saveHours() {
    this.horarioService.saveHoursData(this.appAccessToken, this.appUserToken, this.finalTimeIntervals, this.selectedDay, this.selectedAgendasData)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.hoursData = resp.listhours;
        $('#DefinirIntervalo').modal('hide');
      }
    });
  }

  selectAllCheckboxClicked() {
    if(typeof this.hoursData !== 'undefined') {
      this.selectedTimeToEditOrDelete = [];
      for (var i = 0; i < this.hoursData.length; i++) {
        this.hoursData[i].selected = this.selectAllChkBx;
        if(!(!this.selectAllChkBx)) {
          this.selectedTimeToEditOrDelete[i] = this.hoursData[i].hora;
        }
      }
    }
  }

  checkIfAllSelected(targetElem) {
    this.selectAllChkBx = this.hoursData.every(function(item:any) {
      return item.selected == true;
    })
    if(targetElem.checked == true) {
      this.selectedTimeToEditOrDelete.push(targetElem.value);
    }
    else {
      this.selectedTimeToEditOrDelete.splice(this.selectedTimeToEditOrDelete.indexOf(targetElem.value), 1);
    }
  }

  deleteHour() {
    this.horarioService.deleteHoursData(this.appAccessToken, this.appUserToken, this.selectedTimeToEditOrDelete, this.selectedDay, this.selectedAgendasData)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.hoursData = resp.listhours;
        $('#Borrar').modal('hide');
      }
    });
    
  }

}
