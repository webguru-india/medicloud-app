import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalConfigs } from '../global.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasExternasService } from './consultas-externas.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';
import { timeout } from 'q';
declare var $: any;
declare var modal: any;
declare var summernote: any;
declare var calendar: any;
declare var plot: any;

@Component({
  selector: 'app-consultas-externas',
  templateUrl: './consultas-externas.component.html',
  styleUrls: ['./consultas-externas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultasExternasComponent implements OnInit {
  public appAccessToken: string = this.cookieService.get('accessToken');
  public appUserToken: string = this.cookieService.get('userToken');
  public especialidadData: any = [];
  public specialtySelectedId: any;
  public agendasData: any;
  public selectedAgendasData: any;
  public loadingAgendas: boolean = false;
  public myEvents1: string = '';
  public mutuasData: any = [];
  public selectedDate: string = new Date().getFullYear() + '/' + ('0'+(new Date().getMonth()+1)).slice(-2) + '/' + ('0'+new Date().getDate()).slice(-2);
  public selectedVisit: any = [];
  public isSelectedVisitConfirmed: boolean = false;
  public reportAddShowMore: boolean = false;

  public forEdit: boolean = false;

  public hoursDropDownMenuVal: number = 0;
  
  public formGroup: FormGroup;
  public formNewPatientLastName: string = '';
  public formNewPatientMiddleName: string = '';
  public formNewPatientFirstName: string = '';
  public formNewPatientDni: string = '';
  public formNewPatientBirthday: string = '';
  public formNewPatientAddress: string = '';
  public formNewPatientPopulation: string = '';
  public formNewPatientpostalCode: string = '';
  public formNewPatientTelephone: number = null;
  public formNewPatientSmsMobile: boolean = false;
  public formNewPatientSmsMobileText: number = null;
  public formNewPatientMutuaPrivadoRadio: string = '0';
  public formNewPatientMutuaText: string = '';
  public formNewPatientNota: string = '';

  public showSuccessErrorAlert: number = 0;
  public successErrorMessage: string = '';

  public isSmsRequired: false;

  public malaltData: any = {};

  public patientLastName: any = '';
  public patientMiddleName: any = '';
  public patientFirstName: any = '';
  public searchedPatientName: any = [];



  public addVisitFormGroup: FormGroup;
  public addVisitMutuaPrivadoRadio: string = '0';
  public addVisitTelephono: string = '';
  public addVisitComment: string = '';
  public addVisitDate: string = '';
  public addVisitHour: string = '';
  public addVisitMutuaList: string = '';
  public addVisitVisitType: number = 1;

  public modificiarMutua = '1';

  public visitorsListData: any;
  public visitorsListSelectAllChkBx: boolean = false;

  public changeVisitDate: string = '';
  public changeVisitDateAvailableHour: any = [];
  public changeVisitDateSelectedHour: string = '';

  public confirmVisitPopupData = {
    first_last_name: '',
    second_last_name: '',
    name: '',
    telephone: '',
    dni: '',
    mutua: '',
    confirmVisitCantidad: '',
    confirmVisitNoCharge: false
  };

  public successErrorMessageCloseTimeoutObj;

  public personalData5SelectedMutuas: any = [];
  public personalData5SelectedAgendasData = '';
  public personalData5AgendasData = [];
  public personalData5ToWriteText = '';
  public personalData5AllAgendasCheckbox: boolean = false;

  public personalData51SelectedMutuas: any = [];
  public personalData51SelectedAgendasData = '';
  public personalData51AgendasData = [];
  public personalData51selectedDate: string;
  public personalData51quirofano;
  public personalData51Assintant;
  public personalData51Instrumentista;
  public personalData51SelectedQuirofano = '';
  public personalData51SelectedAssintant = '';
  public personalData51SelectedInstrumentista = '';
  public personalData51ScheduleData: any = [];
  public personalData51WithoutScheduleData: any = [];

  public personalData52SelectedIndex:number;
  public personalData52InterventionList: any = [{}, {}, {}, {}, {}];
  public personalData52TotalTarifa: number = 0.00;
  public personalData52InterventionAllFieldsFilledup: number = 0;
  public personalData52FormGroup: FormGroup;
  public personalData52datePickerValue;
  public personalData52Mutual;

  public personalData53ConceptBarmeoList: any = [];
  public personalData53SelectedConceptBarmeo: number;
  public personalData53FilterConceptBarmeoList: string = '';

  public personalData54SelectedMutuas: any = [];
  public personalData54SelectedAgendasData = '';
  public personalData54AgendasData = [];
  public personalData54PrivatMutualData: any = [];
  public personalData54SelectedPrivatMutuas = '';
  public personalData54ProcessListData: any = [];
  public loadingMutuas: boolean = false;
  public personalData54ProcessListSelectAllChkBx: boolean = false;
  public personalData54SelectedProcess: any = [];

  public personalData55SelectedPrivatMutuasName;
  public personalData55Assistantship: boolean = true;
  public personalData55Process: string = '';
  public personalData55Rate: string = '';
  public personalData55Code: string = '';
  public personalData55AssistantshipValue: string = '';
  public personalData55IsProcessEdit: boolean = false;
  public personalData55Ayudante;

  

  constructor(private _formBuilder: FormBuilder, private globalConfigs: GlobalConfigs, private cookieService: CookieService, public pageTitle: Title, private consultasExternasService: ConsultasExternasService) {
    if(typeof this.appAccessToken === 'undefined' || this.appAccessToken == '') {
      window.location.href = this.globalConfigs.baseUrl + 'login';
    }
    this.pageTitle.setTitle('Consultas Externas | Medicloude');
    this.consultasExternasService.loadSpecialtyData(this.appAccessToken, this.appUserToken)
    .subscribe(resp => {
      if(typeof resp.especialidad === 'object') {
        this.especialidadData = resp.especialidad;
      }
    });

    this.consultasExternasService.loadMutuasData(this.appAccessToken, this.appUserToken)
    .subscribe(resp => {
      if(typeof resp.mutuas === 'object') {
        this.mutuasData = resp.mutuas;
      }
    });
    
    this.formGroup = _formBuilder.group({
      'formNewPatientLastName': ['', Validators.required],
      'formNewPatientMiddleName': [''],
      'formNewPatientFirstName': ['', Validators.required],
      'formNewPatientDni': [''],
      'formNewPatientBirthday': [''],
      'formNewPatientAddress': [''],
      'formNewPatientPopulation': [''],
      'formNewPatientpostalCode': [''],
      'formNewPatientTelephone': [null, Validators.required],
      'formNewPatientSmsMobile': [false],
      'formNewPatientSmsMobileText': [null],
      'formNewPatientMutuaPrivadoRadio': [0],
      'formNewPatientMutuaText': [''],
      'formNewPatientNota': ['']
    });
    
    this.addVisitFormGroup = _formBuilder.group({
      'addVisitPetientId': ['0'],
      'addVisitMutuaPrivadoRadio': ['0'],
      'addVisitTelephono': ['', Validators.required],
      'addVisitComment': [''],
      'addVisitDate': ['', Validators.required],
      'addVisitHour': ['', Validators.required],
      'addVisitMutuaList': [''],
      'addVisitVisitType': [1, Validators.required]
    });

    this.personalData52FormGroup = _formBuilder.group({
      'personalData52datePickerValue': [''],
      'personalData52TimePickerValue': [''],
      'personalDataWithoutDate': [true],
      'personalData52Quirofano': ['', Validators.required],
      'personalData52Assintant': [''],
      'personalData52Instrumentalist': [''],
      'personalData52Mutual': [''],
      'personalData52Diagonsis': [''],
      'personalData52TypeOfDiagonsis': ['', Validators.required],
      'personalData52TypeOfIntervention': ['1'],
      'personalData52Observation': [''],
      'personalData52TotalTarifa': ['0'],
      'personalData52Expenses': ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+([,.][0-9]+)?$/)])]
    });
  
    let date = new Date(),
        d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear(),
        hdr = {
          left: 'title',
          center: 'month,agendaWeek,agendaDay',
          right: 'prev,today,next'
        };

    setTimeout(() => {
      $('#to').datepicker({
        dateFormat : 'dd.mm.yy',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : function(selectedDate) {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
        }
      });
      $('[name="form_new_patient_birthday"]').datepicker({
        dateFormat : 'yy-mm-dd',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : (selectedDate) => {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
          this.formNewPatientBirthday = selectedDate;
          this.formGroup.controls['formNewPatientBirthday'].setValue(selectedDate);
          console.log(this.formNewPatientBirthday)
        }
      });

            /* initialize the calendar
      -----------------------------------------------------------------*/

      $('#calendar').datepicker({
        inline: true,
        sideBySide: true,
        keepOpen: true,
        format: 'YYYY-MM-DD',
        icons: {
          next: 'fa fa-chevron-circle-right',
          previous: 'fa fa-chevron-circle-left'
        },
        onSelect : (selectedDate) => {
          this.selectedDate = selectedDate.substring(6) + '/' + selectedDate.substring(0, 2) + '/' + selectedDate.toString().substring(3, 5);
          this.personalData51selectedDate = this.selectedDate;
          if(typeof this.selectedAgendasData !== 'undefined' && this.selectedAgendasData != '' && this.selectedAgendasData != null) {
            this.getVisitorsList();
          }
        },
        beforeShowDay : (date) => {
          // console.log(date)
          let arr = ['2017-11-06', '2017-11-21', '2017-12-15'],
              thisDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
              // console.log(thisDate);
          
          if(arr.indexOf(thisDate) > -1) {
            return [true, "has-visiting", "Visiting Heading", "Visiting Short Content"];
          }
          else {
            return [true];
          }
        }
      });
      setTimeout(function() {
        $('#calendar .ui-datepicker-prev span').html('<i class="fa fa-chevron-left"></i>');
        $('#calendar .ui-datepicker-next span').html('<i class="fa fa-chevron-right"></i>');
      }, 500);

      $(".modal").on('show.bs.modal', function () {
        $('body, html').animate({"scrollTop": 0}, 300);
      });

    }, 500);
  }

  /* ==================== Confirm Visit Click Starts ===================== */
  confirmVisitMenuClicked(elem) {
    if(typeof $(elem).attr('class') !== 'undefined' && $(elem).attr('class').indexOf('disabled') > -1) {
      return false;
    }
    
    let selectedVisitorId = this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt;
    this.consultasExternasService.getConfirmVisitData(this.appAccessToken, this.appUserToken, selectedVisitorId)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.confirmVisitPopupData = resp.patient_data;
        $('#confirm-visit-modal').modal('show');
      }
    });
  }

  confirmVisitProceedClick() {
    let selectedVisitData = this.getVisitDataFromVisitId(this.selectedVisit),
        isPrivatOrNot = this.getInsuranceNameFormId(this.getVisitDataFromVisitId(this.selectedVisit[0]).ID_mutua) == 'Privat',
        confirmVisitNoCharge = this.confirmVisitPopupData.confirmVisitNoCharge == null ? false : this.confirmVisitPopupData.confirmVisitNoCharge;

    this.consultasExternasService.updatePatientVisit(this.appAccessToken, this.appUserToken, this.selectedVisit, selectedVisitData.ID_malalt, isPrivatOrNot, selectedVisitData.ID_mutua, selectedVisitData.tipovisita, this.confirmVisitPopupData.confirmVisitCantidad, confirmVisitNoCharge)
    .subscribe(resp => {
      console.log(resp);

      this.confirmVisitPopupData = {
        first_last_name: '',
        second_last_name: '',
        name: '',
        telephone: '',
        dni: '',
        mutua: '',
        confirmVisitCantidad: '',
        confirmVisitNoCharge: false
      };
      $('#confirm-visit-modal').modal('hide');
      this.successErrorMessage = resp.message;
      this.autoCloseSuccessErrorMsg();
      this.getVisitorsList();
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
      }
      else {
        this.showSuccessErrorAlert = 2;
      }
    });
  }
  /* ===================== Confirm Visit Click Ends ====================== */

  /* =================== Force Visit Section On Open Starts ====================== */
  forceVisitFunc() {
    if(!this.forEdit) {
      $('#to').datepicker({
        dateFormat : 'yy-mm-dd',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        minDate : 0,
        onSelect : (selectedDate) => {
          this.addVisitDate = selectedDate;
        }
      });
      $('#visit-time').timepicker({
        showMeridian: false
      }).on('changeTime.timepicker', (selectedTime) => {
        this.addVisitHour = selectedTime.time.value;
      });
    }
    else {
      let selectedMalatData = this.getVisitDataFromVisitId(this.selectedVisit);

      this.patientNameSelected(selectedMalatData.ID_malalt);
      console.log(selectedMalatData.hora)
      this.addVisitHour = selectedMalatData.hora;
      $('#visit-time').val(selectedMalatData.hora);
      this.addVisitDate = this.selectedDate;
      $('#to').val(selectedMalatData.hora);

    }
    this.addVisitHour = $('#visit-time').val();
  }
  /* ==================== Force Visit Section On Open Ends ======================= */

  /* =================== Change Date Section On Open Starts ====================== */
  getChangeVisitDateData() {
    let changeVisitDay = new Date($('#calendar1').datepicker("getDate")).getDay();
    this.changeVisitDateSelectedHour = '';
    console.log(changeVisitDay);
    this.consultasExternasService.changeDateData(this.appAccessToken, this.appUserToken, this.selectedAgendasData, this.changeVisitDate, changeVisitDay)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.changeVisitDateAvailableHour = resp.free_hours;
      }
    });
  }
  changeDateFunc() {
    $('#calendar1').datepicker({
      dateFormat : 'yy-mm-dd',
      prevText : '<i class="fa fa-chevron-left"></i>',
      nextText : '<i class="fa fa-chevron-right"></i>',
      minDate : 0,
      onSelect : (selectedDate) => {
        this.changeVisitDate = selectedDate;
        this.getChangeVisitDateData();
      }
    });
    
    this.changeVisitDate = $('#calendar1').datepicker("getDate").getFullYear()+'-'+('0'+(parseInt($('#calendar1').datepicker("getDate").getMonth())+1)).slice(-2)+'-'+('0'+$('#calendar1').datepicker("getDate").getDate()).slice(-2);
    this.getChangeVisitDateData();
  }

  setChangeVisitDateTime() {
    this.consultasExternasService.setChangeVisitDate(this.appAccessToken, this.appUserToken, this.changeVisitDate, this.changeVisitDateSelectedHour, this.selectedVisit)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.hoursMenuClick(0, '.ribbon');
        this.getVisitorsList();
      }
    });
  }
  /* ==================== Change Date Section On Open Ends ======================= */

  /* ==================== 5 Personal Data Starts ===================== */
  getPersonalData5OnLoad() {
    this.personalData5ToWriteText = '';
    this.consultasExternasService.loadPersonalData5(this.appAccessToken, this.appUserToken, this.personalData5SelectedAgendasData, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5AllAgendasCheckbox)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        for(let i=0; i<resp.course_history.length; i++) {
          this.personalData5ToWriteText += resp.course_history[i].decoded_curso;
        }
      }
    });
  }

  personalDataFunc() {
    $('.summernote').summernote({
      toolbar: [
        // [groupName, [list of button]]
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']]
      ]
    });

    this.getPersonalData5OnLoad();

    $('#ToWright').on('show.bs.modal', ()=>{
      $(".summernote").summernote("code", "");
    });
  }

  saveClinicHistoryData() {
    let editorText = $(".summernote").summernote("code");
    this.consultasExternasService.setPersonalData5ToWriteData(this.appAccessToken, this.appUserToken, this.personalData5SelectedAgendasData, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, editorText)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        
        this.personalData5ToWriteText += editorText;
      }
    });
  }
  /* ===================== 5 Personal Data Ends ====================== */

  /* ==================== 5.1 Include In QX Starts ===================== */
  includeInQxFunction() {
    $('#startdate1').datepicker({
      dateFormat : 'yy-mm-dd',
      prevText : '<i class="fa fa-chevron-left"></i>',
      nextText : '<i class="fa fa-chevron-right"></i>',
      defaultDate : new Date(this.selectedDate),
      onSelect : (selectedDate) => {
        $('#finishdate').datepicker('option', 'minDate', selectedDate);
        this.personalData51selectedDate = selectedDate;
      }
    });
    $('#startdate1').datepicker("setDate", new Date(this.selectedDate));
    this.personalData51selectedDate = this.selectedDate.replace(/\//g, '-');

    this.consultasExternasService.getPersonalData51WithOrWithoutSchedule(this.appAccessToken, this.appUserToken, this.personalData51SelectedAgendasData, this.personalData51selectedDate)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.personalData51ScheduleData = !resp.first_list ? [] : resp.first_list;
        this.personalData51WithoutScheduleData = !resp.second_list ? [] : resp.second_list;
      }
    });

    this.personalData52FormGroup.reset();
  }
  /* ===================== 5.1 Include In QX Ends ====================== */

  /* ==================== 5.2 Include Petient Starts ===================== */
  includePetient() {
    $('#startdate').datepicker({
      dateFormat : 'yy-mm-dd',
      prevText : '<i class="fa fa-chevron-left"></i>',
      nextText : '<i class="fa fa-chevron-right"></i>',
      onSelect : (selectedDate) => {
        $('#finishdate').datepicker('option', 'minDate', selectedDate);
        this.personalData52FormGroup.controls["personalData52datePickerValue"].setValue(selectedDate);
      }
    });
    $('#startdate').datepicker("setDate", new Date(this.personalData51selectedDate));
    this.personalData52FormGroup.controls["personalData52datePickerValue"].setValue($('#startdate').val());

    $('#timepicker').timepicker({
      showMeridian: false
    }).on('changeTime.timepicker', (selectedTime) => {
      // this.addVisitHour = selectedTime.time.value;
      this.personalData52FormGroup.controls["personalData52TimePickerValue"].setValue(selectedTime.time.value);
    });
    this.personalData52FormGroup.controls["personalData52TimePickerValue"].setValue($('#timepicker').val());

    this.consultasExternasService.getQuirofanoData(this.appAccessToken, this.appUserToken, this.personalData51SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.personalData51quirofano = resp.quirofano;
      }
    });

    this.consultasExternasService.getInstrumentista(this.appAccessToken, this.appUserToken, this.personalData51SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.personalData51Assintant = resp.ayudante;
        this.personalData51Instrumentista = resp.ayudante;
      }
    });

    let petientId = this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt;

    this.consultasExternasService.getSelectedPatientData(this.appAccessToken, this.appUserToken, petientId)
    .subscribe(resp => {
      console.log(resp);
      if(!(!resp.success)) { 
        this.malaltData = resp.patient_details;
        this.personalData52FormGroup.controls["personalData52Mutual"].setValue(resp.patient_details.id_mutua);
        this.personalData52Mutual = resp.patient_details.id_mutua;
      }
    });
  }

  personalData52FormGroupSubmit(formValue) {
    console.log(formValue);
    let agendaId = this.personalData5SelectedAgendasData,
        privat = this.getVisitDataFromVisitId(this.selectedVisit).privado1,
        petientId = this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt;

    this.consultasExternasService.personalData52FormSave(this.appAccessToken, this.appUserToken, formValue, this.personalData52InterventionList, agendaId, privat, petientId, this.personalData52TotalTarifa)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.successErrorMessage = resp.message;
        this.showSuccessErrorAlert = 1;
        this.autoCloseSuccessErrorMsg();
        this.hoursMenuClick(5.1, '.container');
      }
    });
  }
  /* ===================== 5.2 Include Petient Ends ====================== */

  /* ==================== Include In QX Configuration Starts ===================== */
  personalData54GetPrivatMutualList(selectedAgendasData) {
    this.loadingMutuas = true;
    this.consultasExternasService.personalData54GetPrivatMutualData(this.appAccessToken, this.appUserToken, selectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      this.loadingMutuas = false;
      if(resp.success === true) {
        this.personalData54PrivatMutualData = resp.mutuas;
        this.personalData54SelectedProcess = [];
        this.personalData54ProcessListSelectAllChkBx = false;
      }
    });
  }
  personalData54GetProcessList() {
    if(this.personalData54SelectedPrivatMutuas == '' || this.personalData54SelectedPrivatMutuas == null) {
      return false;
    }
    this.consultasExternasService.personalData54GetProcessListData(this.appAccessToken, this.appUserToken, this.personalData54SelectedAgendasData, this.personalData54SelectedPrivatMutuas)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.personalData54ProcessListData = resp.actos;
      }
    });
  }
  includeInQxConfiguration() {
    this.personalData54SelectedMutuas = this.personalData51SelectedMutuas;
    this.personalData54AgendasData = this.personalData51AgendasData;
    this.personalData54SelectedAgendasData = this.personalData51SelectedAgendasData;

    this.personalData54GetPrivatMutualList(this.personalData54SelectedAgendasData);
    this.personalData54GetProcessList();
  }
  personalData54PrivatMutuasOnChange(privatMutuasData) {
    this.personalData54SelectedPrivatMutuas = privatMutuasData;
    this.personalData54GetProcessList();
  }
  
  personalData54ProcessListSelectAllCheckboxClicked() {
    if(typeof this.personalData54ProcessListData !== 'undefined') {
      this.personalData54SelectedProcess = [];
      for (var i = 0; i < this.personalData54ProcessListData.length; i++) {
        this.personalData54ProcessListData[i].personalData54SelectedProcess = this.personalData54ProcessListSelectAllChkBx;
        if(!(!this.personalData54ProcessListSelectAllChkBx)) {
          this.personalData54SelectedProcess.push(this.personalData54ProcessListData[i].ID);
        }
      }
    }
  }
  personalData54ProcessListSelected(targetElem) {
    this.personalData54ProcessListSelectAllChkBx = this.personalData54ProcessListData.every(function(item:any) {
      return item.personalData54SelectedProcess == true;
    })
    if(targetElem.checked == true) {
      this.personalData54SelectedProcess.push(parseInt(targetElem.value));
    }
    else {
      console.log(this.personalData54SelectedProcess.indexOf(parseInt(targetElem.value)))
      this.personalData54SelectedProcess.splice(this.personalData54SelectedProcess.indexOf(parseInt(targetElem.value)), 1);
    }
  }

  personalData54BorrarFromProcessList() {
    this.consultasExternasService.personalData54ProcessListBorrar(this.appAccessToken, this.appUserToken, this.personalData54SelectedProcess)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.personalData54GetProcessList();
        this.successErrorMessage = resp.message;
        this.showSuccessErrorAlert = 1;
        this.autoCloseSuccessErrorMsg();
      }
    });
  }

  personalData54GetProcessDataFromProcessId(processId) {
    let processData;
    
    for(let i=0; i<this.personalData54ProcessListData.length; i++) {
      if(this.personalData54ProcessListData[i].ID == processId) {
        processData = this.personalData54ProcessListData[i];
      }
    }
    console.log(processData);

    return processData;
  }

  personalData54EditProcessData() {
    if(this.personalData54SelectedProcess.length == 0) {
      return false;
    }
    let processDataToEdit = this.personalData54GetProcessDataFromProcessId(this.personalData54SelectedProcess[0]);

    this.personalData55Process = processDataToEdit.nombre;
    this.personalData55Rate = processDataToEdit.tarifa;
    this.personalData55Code = processDataToEdit.codigo;
    this.personalData55AssistantshipValue = processDataToEdit.perayuda;
    this.personalData55Assistantship = processDataToEdit.perayuda == null || processDataToEdit.perayuda == 0 || processDataToEdit.perayuda == '' ? false : true;
    this.personalData55Ayudante = processDataToEdit.ayudante;
    
    this.personalData55IsProcessEdit = true;

    this.hoursMenuClick(5.5, '#container');
  }
  /* ===================== Include In QX Configuration Ends ====================== */

  /* ==================== Include In QX Configuration Add Starts ===================== */
  includeInQxConfigurationAnadir() {
    if(this.personalData54SelectedPrivatMutuas != 'privat') {
      this.personalData55SelectedPrivatMutuasName = this.getInsuranceNameFormId(this.personalData54SelectedPrivatMutuas);
      this.personalData54PrivatMutualData.forEach(element => {
        if(element.id == this.personalData54SelectedPrivatMutuas) {
          this.personalData55SelectedPrivatMutuasName = element.mutua;
        }
      });
      console.log(this.personalData54SelectedPrivatMutuas)
    }
    else {
      this.personalData55SelectedPrivatMutuasName = 'Privat';
    }
  }
  personalData55AddData() {
    let mutualId, privat, perayuda, processId = '', ayudante;
    if(this.personalData54SelectedPrivatMutuas == 'privat') {
      mutualId = null;
      privat = 1;
    }
    else {
      mutualId = this.personalData54SelectedPrivatMutuas;
      privat = 0;
    }

    if(!this.personalData55Assistantship) {
      perayuda = 0;
    }
    else {
      perayuda = this.personalData55AssistantshipValue;
    }
    let isNew = 1;
    ayudante = this.personalData51SelectedAssintant;

    if(!(!this.personalData55IsProcessEdit)) {
      isNew = 0;
      processId = this.personalData54SelectedProcess[0];
      ayudante = this.personalData55Ayudante;
    }

    this.consultasExternasService.personalData55GrabberData(this.appAccessToken, this.appUserToken, isNew, this.personalData54SelectedAgendasData, this.personalData55Code, this.personalData55Process, mutualId, privat, 1, this.personalData55Rate, 0, 0, ayudante, perayuda, processId)
    .subscribe(resp => {
      console.log(resp);
      this.personalData55IsProcessEdit = false;
      if(resp.success === true) {
        this.hoursMenuClick(5.4, '#container');
        this.successErrorMessage = resp.message;
        this.showSuccessErrorAlert = 1;
        this.autoCloseSuccessErrorMsg();
        this.personalData55Code = '';
        this.personalData55Process = '';
        this.personalData55AssistantshipValue = '';
        this.personalData55Assistantship = true;
        this.personalData55Rate = '';
      }
      else {
        if(typeof resp.message !== 'undefined' && resp.message != null && resp.message != '') {
          this.successErrorMessage = resp.message;
        }
        else {
          this.successErrorMessage = 'Oops! Some error occured. Please try again later.';
        }
        this.showSuccessErrorAlert = 2;
        this.autoCloseSuccessErrorMsg();
      }
    });
  }
  /* ===================== Include In QX Configuration Add Ends ====================== */

  /* ===================== 5.3 personalData53PageOpenFunc Starts ====================== */
  personalData53PageOpenFunc() {
    this.personalData53SelectedConceptBarmeo = null;
    this.consultasExternasService.personalData53IntervencionesList(this.appAccessToken, this.appUserToken, this.personalData51SelectedAgendasData, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.getVisitDataFromVisitId(this.selectedVisit).privado1)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.personalData53ConceptBarmeoList = resp.actos;
      }
    });
  }

  personalData53AcceptSelectedInterventionsFunc() {
    this.consultasExternasService.personalData53AcceptSelectedInterventions(this.appAccessToken, this.appUserToken, this.personalData53SelectedConceptBarmeo, this.personalData52SelectedIndex, this.getVisitDataFromVisitId(this.selectedVisit).privado1, this.personalData52InterventionList)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.personalData52InterventionList = resp.accepted_process_list;
        this.hoursMenuClick(5.2, '.container');
        this.personalData52InterventionAllFieldsFilledChk();
      }
    });
  }
  personalData52InterventionAllFieldsFilledChk() {
    this.personalData52TotalTarifa = 0;
    this.personalData52InterventionAllFieldsFilledup = 0;
    for(let i=0; i<this.personalData52InterventionList.length; i++) {
      if(typeof this.personalData52InterventionList[i].vtarifa !== 'undefined' && this.personalData52InterventionList[i].vtarifa != '') {
        this.personalData52TotalTarifa -= -parseFloat(this.personalData52InterventionList[i].vtarifa).toFixed(2);
        this.personalData52InterventionAllFieldsFilledup++;
      }
    }
  }
  /* ====================== 5.3 personalData53PageOpenFunc Ends ======================= */

  hoursMenuClick(value, elem) {
    if(typeof $(elem).attr('class') !== 'undefined' && $(elem).attr('class').indexOf('disabled') > -1) {
      return false;
    }

    this.hoursDropDownMenuVal = value;
    $('body, html').animate({"scrollTop": 0}, 300);
    $('#main .page-loader').fadeIn(0);
    $('#left-panel').css('min-height', '');
    $('#main').css('min-height', '');
    $('body, html').animate({'scrollTop': 0}, 10);

    setTimeout(() => {
      
      var maxHeight;
      if($('#left-panel').height() > $('#main').height()) {
        maxHeight = $('#left-panel').height();

        $('#left-panel').css('min-height', maxHeight);
        $('#main').css('min-height', maxHeight + 35); 
      }
      else {
        maxHeight = $('#main').height();

        $('#left-panel').css('min-height', maxHeight + 52);
        $('#main').css('min-height', maxHeight);
      }

      $('#main .page-loader').delay(1000).fadeOut(300);
        
      if(value == 0) {
        $('#calendar').datepicker({
          inline: true,
          sideBySide: true,
          keepOpen: true,
          format: 'YYYY-MM-DD',
          icons: {
            next: 'fa fa-chevron-circle-right',
            previous: 'fa fa-chevron-circle-left'
          },
          onSelect : (selectedDate) => {
            this.selectedDate = selectedDate.substring(6) + '/' + selectedDate.substring(0, 2) + '/' + selectedDate.toString().substring(3, 5);
            if(typeof this.selectedAgendasData !== 'undefined' && this.selectedAgendasData != '' && this.selectedAgendasData != null) {
              this.getVisitorsList();
            }
          } 
        });
        setTimeout(function() {
          $('#calendar .ui-datepicker-prev span').html('<i class="fa fa-chevron-left"></i>');
          $('#calendar .ui-datepicker-next span').html('<i class="fa fa-chevron-right"></i>');
        }, 500);
      }
      else if(value == 3) {
        this.forceVisitFunc();
      }
      else if(value == 4) {
        this.changeDateFunc();
      }
      else if(value == 5) {
        this.personalDataFunc();
      }
      else if(value == 5.1) {
        this.includeInQxFunction();
      }
      else if(value == 5.2) {
        this.includePetient();
      }
      else if(value == 5.3) {
        this.personalData53PageOpenFunc();
      }
      else if(value == 5.4) {
        this.includeInQxConfiguration();
      }
      else if(value == 5.5) {
        this.includeInQxConfigurationAnadir();
      }
      else if(value == 5.14) {
        /*--Data Chart--*/
        let data = [], totalPoints = 200, $UpdatingChartColors = $("#updating-chart").css('color');

        // setup control widget
        let updateInterval = 1500;
        $("#updating-chart").val(updateInterval).change(function() {

          let v = $(this).val();
          if (v && !isNaN(+v)) {
            updateInterval = +v;
            $(this).val("" + updateInterval);
          }

        });

        // setup plot
        let options = {
          yaxis : {
            min : 0,
            max : 100
          },
          xaxis : {
            min : 0,
            max : 100
          },
          colors : [$UpdatingChartColors],
          series : {
            lines : {
              lineWidth : 1,
              fill : true,
              fillColor : {
                colors : [{
                  opacity : 0.4
                }, {
                  opacity : 0
                }]
              },
              steps : false

            }
          }
        };

        if (data.length > 0)
          data = data.slice(1);
    
        // do a random walk
        while (data.length < totalPoints) {
          var prev = data.length > 0 ? data[data.length - 1] : 50;
          var y = prev + Math.random() * 10 - 5;
          if (y < 0)
            y = 0;
          if (y > 100)
            y = 100;
          data.push(y);
        }
    
        // zip the generated y values with the x values
        let plotData = [];
        for (var i = 0; i < data.length; ++i)
        plotData.push([i, data[i]])

        let plot = $.plot($("#updating-chart"), [plotData], options);

        /*---Data Chart End-----*/
      }
    }, 500);
  }

  generateHoursListFunction() {
    if(typeof this.specialtySelectedId === 'undefined' || this.specialtySelectedId == null || this.specialtySelectedId == '') {
      return false;
    }

    if(typeof this.selectedAgendasData === 'undefined' || this.selectedAgendasData == null || this.selectedAgendasData == '') {
      return false;
    }
  }
  
  getVisitDataFromVisitId(visitId) {
    let visitData;
    if(typeof this.visitorsListData !== 'undefined' && typeof this.visitorsListData.visits === 'object') {
      this.visitorsListData.visits.forEach(element => {
        if(element.vid == visitId) {
          visitData = element;
        }
      });
    }
    return visitData;
  }
  
  specialtyOnChange(specialtyValue) {
    this.specialtySelectedId = specialtyValue;
    this.personalData5SelectedMutuas = specialtyValue;
    this.personalData51SelectedMutuas = specialtyValue;
    this.loadingAgendas = true;
    this.selectedAgendasData = '';
    this.agendasData = [];
    $('#select-2 option').eq(0).prop('selected', true);
    this.consultasExternasService.loadAgendasData(this.appAccessToken, this.appUserToken, specialtyValue)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.agendasData = resp.agendas;
        this.personalData5AgendasData = resp.agendas;
        this.personalData51AgendasData = resp.agendas;
      }
      this.loadingAgendas = false;
    });
  }
  
  personalData5SpecialtyOnChange(specialtyValue) {
    this.personalData5SelectedMutuas = specialtyValue;
    this.personalData51SelectedMutuas = specialtyValue;
    this.loadingAgendas = true;
    this.personalData5SelectedAgendasData = '';
    this.personalData5AgendasData = [];
    this.personalData51SelectedAgendasData = '';
    this.personalData51AgendasData = [];
    $('#select-2 option').eq(0).prop('selected', true);
    this.consultasExternasService.loadAgendasData(this.appAccessToken, this.appUserToken, specialtyValue)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.personalData5AgendasData = resp.agendas;
        this.personalData51AgendasData = resp.agendas;
      }
      this.loadingAgendas = false;
    });
  }
  
  personalData51SpecialtyOnChange(specialtyValue) {
    this.personalData51SelectedMutuas = specialtyValue;
    this.loadingAgendas = true;
    this.personalData51SelectedAgendasData = '';
    this.personalData51AgendasData = [];
    $('#select-2 option').eq(0).prop('selected', true);
    this.consultasExternasService.loadAgendasData(this.appAccessToken, this.appUserToken, specialtyValue)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.personalData51AgendasData = resp.agendas;
      }
      this.loadingAgendas = false;
    });
  }
  
  personalData54SpecialtyOnChange(specialtyValue) {
    this.personalData54SelectedMutuas = specialtyValue;
    this.loadingAgendas = true;
    this.personalData54SelectedAgendasData = '';
    this.personalData54AgendasData = [];
    this.personalData54PrivatMutualData = [];
    this.personalData54SelectedPrivatMutuas = '';
    $('#select-2 option').eq(0).prop('selected', true);
    $('#select-3:visible option').eq(0).prop('selected', true);
    this.consultasExternasService.loadAgendasData(this.appAccessToken, this.appUserToken, specialtyValue)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.personalData54AgendasData = resp.agendas;
      }
      this.loadingAgendas = false;
    });
  }
  
  agendasOnChange(agendasValue) {
    this.selectedAgendasData = agendasValue;
    this.personalData5SelectedAgendasData = agendasValue;
    this.personalData51SelectedAgendasData = agendasValue;
    // console.log(this.selectedAgendasData)
    this.getVisitorsList();
  }
  
  personalData5AgendasOnChange(agendasValue) {
    this.personalData5SelectedAgendasData = agendasValue;
    this.personalData51SelectedAgendasData = agendasValue;
  }
  
  personalData51AgendasOnChange(agendasValue) {
    this.personalData51SelectedAgendasData = agendasValue;
  }
  
  personalData54AgendasOnChange(agendasValue) {
    this.personalData54SelectedAgendasData = agendasValue;
  }

  getInsuranceNameFormId(mutuaId) {
    let mutuaName: string = '';

    if(typeof mutuaId !== 'undefined') {
      if(mutuaId != '' && mutuaId != null && !(!mutuaId)) {
        this.mutuasData.forEach(element => {
          if(element.id == mutuaId) {
            mutuaName = element.mutua;
          }
        });
      }
      else {
        mutuaName = 'Privat';
      }
    }

    return mutuaName;
  }

  smsMobileChanged(elem) {
    if(!elem.checked) {
      this.formGroup.controls['formNewPatientSmsMobileText'].setValue(null);
    }
  }

  phoneNumberValidation(inputtxt) {
    // if(inputtxt != null) {
    //   var phoneno = (/^([1-9]{1})([0-9]{9})$/);
    //   return (inputtxt.match(phoneno));
    // }
    // else {
    //   return true;
    // }
    return true;
  }

  addNewPatient(formData) {
    // console.log(formData);
    this.isSmsRequired = formData.formNewPatientSmsMobile;
    if(typeof formData.formNewPatientLastName === 'undefined' || formData.formNewPatientLastName == '' || formData.formNewPatientLastName == null) {
      return false;
    }
    if(typeof formData.formNewPatientFirstName === 'undefined' || formData.formNewPatientFirstName == '' || formData.formNewPatientFirstName == null) {
      return false;
    }
    if(typeof formData.formNewPatientTelephone === 'undefined' || formData.formNewPatientTelephone == '' || formData.formNewPatientTelephone == null) {
      return false;
    }
    else if(!this.phoneNumberValidation(formData.formNewPatientTelephone)) {
      return false;
    }
    if((typeof formData.formNewPatientMutuaText === 'undefined' || formData.formNewPatientMutuaText == '' || formData.formNewPatientMutuaText == null) && formData.formNewPatientMutuaPrivadoRadio == 0) {
      return false;
    }
    if(!(!this.formNewPatientSmsMobile) && formData.formNewPatientSmsMobileText != null) {
      if(!this.phoneNumberValidation(formData.formNewPatientSmsMobileText)) {
        return false;
      }
    }
    
    this.consultasExternasService.savePetientData(this.appAccessToken, this.appUserToken, formData)
    .subscribe(resp => {
      console.log(resp);
      if(!(!resp.success)) {
        this.especialidadData = resp.especialidad;
        this.malaltData = resp.malalt;
        $('#PacienteNuevo').modal('hide');
        this.formGroup.controls['formNewPatientLastName'].setValue('');
        this.formGroup.controls['formNewPatientMiddleName'].setValue('');
        this.formGroup.controls['formNewPatientFirstName'].setValue('');
        this.formGroup.controls['formNewPatientDni'].setValue('');
        this.formGroup.controls['formNewPatientBirthday'].setValue('');
        this.formGroup.controls['formNewPatientAddress'].setValue('');
        this.formGroup.controls['formNewPatientPopulation'].setValue('');
        this.formGroup.controls['formNewPatientpostalCode'].setValue('');
        this.formGroup.controls['formNewPatientTelephone'].setValue(null);
        this.formGroup.controls['formNewPatientSmsMobile'].setValue('');
        this.formGroup.controls['formNewPatientSmsMobileText'].setValue(null);
        this.formGroup.controls['formNewPatientMutuaPrivadoRadio'].setValue('');
        this.formGroup.controls['formNewPatientMutuaText'].setValue('');
        this.formGroup.controls['formNewPatientNota'].setValue('');
        console.log(resp.malalt.id)
        this.addVisitFormGroup.controls["addVisitPetientId"].setValue(resp.malalt.id);
        // this.getInsuranceNameFormId(this.malaltData.)
      }
    });
  }

  searchPetients() {
    this.consultasExternasService.searchPetientData(this.appAccessToken, this.appUserToken, this.patientLastName, this.patientMiddleName, this.patientFirstName)
    .subscribe(resp => {
      // console.log(resp);
      if(!(!resp.success)) {
        this.searchedPatientName = !(!resp.patient_list) && resp.patient_list.length > 0 ? resp.patient_list : [];
      }
    });
  }

  patientNameSelected(patientId) {console.log(patientId)
    if(typeof patientId !== 'undefined' && patientId != null && patientId != '' && !isNaN(patientId)) {
      this.consultasExternasService.getSelectedPatientData(this.appAccessToken, this.appUserToken, patientId)
      .subscribe(resp => {
        console.log(resp);
        if(!(!resp.success)) { 
          this.malaltData = resp.patient_details;

          this.addVisitHour = $('#visit-time').val();
          this.addVisitFormGroup.controls["addVisitPetientId"].setValue(resp.patient_details.maid);
          this.addVisitFormGroup.controls["addVisitMutuaPrivadoRadio"].setValue(resp.patient_details.privat);
          this.addVisitFormGroup.controls["addVisitTelephono"].setValue(resp.patient_details.telefono);
          this.addVisitFormGroup.controls["addVisitComment"].setValue(resp.patient_details.observaciones);
          this.addVisitFormGroup.controls["addVisitMutuaList"].setValue(resp.patient_details.id_mutua);

          this.addVisitMutuaPrivadoRadio = resp.patient_details.privat;
          console.log(this.malaltData)
          this.modificiarMutua = this.malaltData.id_mutua;
          $('body, html').animate({"scrollTop": $('#add-visit-form-section').offset().top}, 300)
        }
      });
    }
  }
  
  cancelForceVisitForms() {
    this.patientLastName = '';
    this.patientMiddleName = '';
    this.patientFirstName = '';
    this.malaltData = {};
    this.searchedPatientName = [];
    this.addVisitFormGroup.reset();
    this.addVisitFormGroup.controls["addVisitVisitType"].setValue("1");
    this.addVisitFormGroup.controls["addVisitMutuaPrivadoRadio"].setValue("0");
  }

  addPatientRecord(formData) {

    if(!this.forEdit) {
      this.consultasExternasService.addVisitPetientData(this.appAccessToken, this.appUserToken, formData, this.selectedAgendasData)
      .subscribe(resp => {
        console.log(resp);
        if(!(!resp.success)) {
          this.cancelForceVisitForms();
          this.hoursMenuClick(0, '.container');
          this.successErrorMessage = resp.message;
          this.showSuccessErrorAlert = 1;
          this.autoCloseSuccessErrorMsg();
          // $('body, html').animate({"scrollTop": 0}, 300);
          $('#left-panel').css('min-height', '');
          $('#main').css('min-height', '');
          
          /* initialize the calendar
          -----------------------------------------------------------------*/
          setTimeout(() => {
            var maxHeight;

            if($('#left-panel').height() > $('#main').height()) {
              maxHeight = $('#left-panel').height();
      
              $('#left-panel').css('min-height', maxHeight);
              $('#main').css('min-height', maxHeight + 35); 
            }
            else {
              maxHeight = $('#main').height();
      
              $('#left-panel').css('min-height', maxHeight + 52);
              $('#main').css('min-height', maxHeight);
            }

            // this.selectedAgendasData = '';
            // this.agendasData = [];
      
            $('#main .page-loader').delay(1000).fadeOut(300);

            // $('#calendar').datepicker({
            //   inline: true,
            //   sideBySide: true,
            //   keepOpen: true,
            //   format: 'YYYY-MM-DD',
            //   icons: {
            //     next: 'fa fa-chevron-circle-right',
            //     previous: 'fa fa-chevron-circle-left'
            //   },
            //   onSelect : (selectedDate) => {
            //     this.selectedDate = selectedDate.substring(6) + '/' + selectedDate.substring(0, 2) + '/' + selectedDate.toString().substring(3, 5);
            //     if(typeof this.selectedAgendasData !== 'undefined' && this.selectedAgendasData != '' && this.selectedAgendasData != null) {
                  this.getVisitorsList();
            //     }
            //   }
            // });
            setTimeout(function() {
              $('#calendar .ui-datepicker-prev span').html('<i class="fa fa-chevron-left"></i>');
              $('#calendar .ui-datepicker-next span').html('<i class="fa fa-chevron-right"></i>');
            }, 500);
          }, 500);
        }
      });
    }
    else {
      this.consultasExternasService.updatePatientVisitData(this.appAccessToken, this.appUserToken, formData, this.selectedAgendasData, this.selectedVisit[0])
      .subscribe(resp => {
        console.log(resp);
        if(!(!resp.success)) {
          this.cancelForceVisitForms();
          this.hoursMenuClick(0, '.container');
          this.successErrorMessage = resp.message;
          this.showSuccessErrorAlert = 1;
          this.autoCloseSuccessErrorMsg();
          // $('body, html').animate({"scrollTop": 0}, 300);
          $('#left-panel').css('min-height', '');
          $('#main').css('min-height', '');
          
          /* initialize the calendar
          -----------------------------------------------------------------*/
          setTimeout(() => {
            var maxHeight;

            if($('#left-panel').height() > $('#main').height()) {
              maxHeight = $('#left-panel').height();
      
              $('#left-panel').css('min-height', maxHeight);
              $('#main').css('min-height', maxHeight + 35); 
            }
            else {
              maxHeight = $('#main').height();
      
              $('#left-panel').css('min-height', maxHeight + 52);
              $('#main').css('min-height', maxHeight);
            }

            // this.selectedAgendasData = '';
            // this.agendasData = [];
      
            $('#main .page-loader').delay(1000).fadeOut(300);

            // $('#calendar').datepicker({
            //   inline: true,
            //   sideBySide: true,
            //   keepOpen: true,
            //   format: 'YYYY-MM-DD',
            //   icons: {
            //     next: 'fa fa-chevron-circle-right',
            //     previous: 'fa fa-chevron-circle-left'
            //   },
            //   onSelect : (selectedDate) => {
            //     this.selectedDate = selectedDate.substring(6) + '/' + selectedDate.substring(0, 2) + '/' + selectedDate.toString().substring(3, 5);
            //     if(typeof this.selectedAgendasData !== 'undefined' && this.selectedAgendasData != '' && this.selectedAgendasData != null) {
                  this.getVisitorsList();
            //     }
            //   }
            // });
            setTimeout(function() {
              $('#calendar .ui-datepicker-prev span').html('<i class="fa fa-chevron-left"></i>');
              $('#calendar .ui-datepicker-next span').html('<i class="fa fa-chevron-right"></i>');
            }, 500);
          }, 500);
        }
        else {
          this.successErrorMessage = resp.message;
          this.showSuccessErrorAlert = 2;
          this.autoCloseSuccessErrorMsg();
        }
      });
    }
  }

  getVisitorsList() {
    this.consultasExternasService.visitorsListData(this.appAccessToken, this.appUserToken, this.selectedDate, this.selectedAgendasData)
    .subscribe(resp => {
      // console.log(resp);
      this.visitorsListData = {};
      if(!(!resp.success)) {
        this.selectedVisit = [];
        this.visitorsListSelectAllChkBx = false;
        this.visitorsListData = resp;
      }
    });
  }
  
  visitorsListSelectAllCheckboxClicked() {
    if(typeof this.visitorsListData !== 'undefined') {
      this.selectedVisit = [];
      for (var i = 0; i < this.visitorsListData.visits.length; i++) {
        this.visitorsListData.visits[i].selectedVisit = this.visitorsListSelectAllChkBx;
        if(!(!this.visitorsListSelectAllChkBx)) {
          this.selectedVisit.push(this.visitorsListData.visits[i].vid);
          if(!this.isSelectedVisitConfirmed) {
            this.isSelectedVisitConfirmed = this.visitorsListData.visits[i].confirmada1 == 'SI';
          }
        }
      }
    }
    console.log(this.selectedVisit)
  }

  checkIfAllVisitsSelected(targetElem) {
    this.visitorsListSelectAllChkBx = this.visitorsListData.visits.every(function(item:any) {
      return item.selectedVisit == true;
    })
    if(targetElem.checked == true) {
      this.selectedVisit.push(parseInt(targetElem.value));
      this.isSelectedVisitConfirmed = this.getVisitDataFromVisitId(targetElem.value).confirmada1 == 'SI';
    }
    else {
      console.log(this.selectedVisit.indexOf(parseInt(targetElem.value)))
      this.selectedVisit.splice(this.selectedVisit.indexOf(parseInt(targetElem.value)), 1);
      if(this.selectedVisit.length == 1) {
        this.isSelectedVisitConfirmed = this.getVisitDataFromVisitId(this.selectedVisit[0]).confirmada1 == 'SI';
      }
    }
    console.log(this.selectedVisit)
  }
  
  deleteVisitsData() {
    if(this.selectedVisit.length == 0) {
      return false;
    }
    this.consultasExternasService.deleteVisit(this.appAccessToken, this.appUserToken, this.selectedVisit, this.selectedDate, this.selectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(!(!resp.success)) {
        this.selectedVisit = [];
        this.visitorsListSelectAllChkBx = false;
        this.visitorsListData = resp;
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
      }
    });
  }
  
  openDiagonisticModal() {
    $('#DiagonosticsAdd').modal('show');
  }

  ngOnInit() {
  }

  closeSuccessErrorMsg() {
    if(typeof this.successErrorMessageCloseTimeoutObj !== 'undefined') {
      clearTimeout(this.successErrorMessageCloseTimeoutObj);
    }
    this.showSuccessErrorAlert = 0;
  }

  autoCloseSuccessErrorMsg() {
    setTimeout(() => {
      $('.success-error-msg-wrapper').css('top', $(window).scrollTop() + $(window).height() - $('.success-error-msg-wrapper').outerHeight(true) - 25);
    }, 500);
    this.successErrorMessageCloseTimeoutObj = setTimeout(() => {
      this.closeSuccessErrorMsg();
    }, 15000);
  }

}
