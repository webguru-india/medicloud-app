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
  public agendaId: any;
  public diagnosticData: any;
  public diagnosticId: any;
  public convertAllCheckBooleanToInteger: number;

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

  public showPreparingData: number = 0;

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

  public personalData516PrescribeFormGroup: FormGroup;
  public personalData516Patient: string = '';
  // public personalData516DNI: any = '';   As already declared
  // public personalData516Date: any = '';    As already declared
  public personalData516Tratamiento: any = '';
  public personalData516Posologia: any = '';
  public personalData516Unidades: number = 1;
  public personalData516Pauta: any = '';
  public personalData516Instrucciones: any = '';
  public personalData516Prescriptor: any = '';
  public personalData516Idioma: any = '';
  public personalData516Direccion: any = '';
  public personalData516Poblacion: any = '';
  public personalData516Colegiado: any = '';
  // public personalData516Especialidad: any = '';    As already declared
  
  public personalData518FormGroup: FormGroup;
  public personalData518Tratamiento: string = '';
  public personalData518Posologia: string = '';
  public personalData518Unidades: number = 1;
  public personalData518Pauta: string = '';
  public personalData518Instrucciones: string = '';
  
  public personalData519FormGroup: FormGroup;
  public personalData519Tratamiento: string = '';
  public personalData519Posologia: string = '';
  public personalData519Unidades: number = 1;
  public personalData519Pauta: string = '';
  public personalData519Instrucciones: string = '';

  public mutuaEditClass: boolean = false;

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
  public personalData5PreviousActivityData: any = [];

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

  public personalData56DiagnosisAdd: any = '';
  public personalData56DiagnosisModify: any = '';
  public personalData56ShowAllDiagnosticDataList: any = [];
  public personalData56DiagnosticListSelectAllChkBx: boolean = false;
  public personalData56DiagnosticListSelectAllChkBxDiagnostico5: boolean = false;
  public personalData56DiagnosticListSelectedData: any = [];
  public personalData56DiagnosticListSelectedDataDiagnostico5: any = [];
  public personalData56DiagnosticListModifiedId: number;
  public personalData56DiagnosticListModifiedName: string;
  public personalData56DiagnosticSelectDiagnosticIdForGrabar: any = '';
  public personalData56ShowAssignDiagnostic5: any = [];
  public personalData56DiagnosticDiagnosticIdForSelectedDiagnostic: any ='';
  public personalData56ShowAllDiagnosticDataListToHoldItIndDiagnosticEdit: any = [];
  public personalData56DiagnosticListSelectedDataDiagnosticName: string = '';
  
  public personalData57DepartmentName: any = '';
  public personalData57ShowDepartmentlist: any = [];
  public personalData57DepartmentListSelectAllChkBx: boolean = false;
  public personalData57DepartmentListSelectedData: any = [];
  public personalData57DepartmentModificarNamePick: string = '';
  public personalData57DepartmentModifiedName: string = '';
  public personalData57PeticionTextareaVal: any = '';
  public personalData57ObservacionesTextareaVal: any = '';
  public personalData57PlantillaSelectVal: number = 0;
  public personalData57selectedDepartmentId: number = 0;
  public personalData57ShowPeticionlist: any = [];
  public personalData57PeticionListSelectedData: any = [];
  public personalData57PeticionListSelectAllChkBx: boolean = false;
  public personalData57PeticionTextareaPick: any = '';
  public personalData57ObservacionesTextareaPick: any = '';
  public personalData57PeticionModificarTextareaVal: any = '';
  public personalData57ObservacionesModificarTextareaVal: any = '';
  public personalData57PeticionAssignSelectedDataId: any = 0;
  public personalData57PeticionAssignSelectedData: any = '';
  public personalData57PruebaAssignSelectedData: any = '';
  public personalData57PeticionAssignSelectedNewData: any = '';
  public personalData57ShowAssignedPeticions: any = [];
  public personalData57AssignPeticionsPdfUrl: any = '';
  public personalData57PeticionAssignListSelectedData: any = '';

  public personalData511selectedPatologiatId: number = 0;
  public personalData511RecetasDataList: any = [];
  public personalData511RecetasListSelectedData: any = [];
  public personalData511RecetasListSelectAllChkBx: boolean =false;
  public personalData511ShowAllAssignedRecetas: any = [];
  public personalData511AssignedRecetasListSelectedData: any = '';

  public personalData512getAllImagesData: any = [];
  public personalData512SelectedImageId: any = '';
  public personalData512SelectedImage: any = '';

  // public personalData513ImageUrl: any = '';
  public personalData513ImageName: any = '';
  public personalData513ImageWidth: any = '';
  public personalData513ImageHeight: any = '';
  public personalData513ImageResizedHeight: any = '';
  public personalData513GetDate: any = '';
  public personalData513Title: any = '';
  public personalData513Description: any = '';
  public personalData513ResizedImageUrl: any = '';

  public personalData515RecetasListSelectedData: any = [];
  public personalData515RecetasListSelectAllChkBx: boolean = false;
  public personalData515RecetasDataList: any = [];

  public personalData516fullName: string = '';
  public personalData516DNI: any = '';
  public personalData516Date: any = '';
  public personalData516Especialidad: any = '';
  public personalData516AssignedRecetasList: any = [];
  public personalData516SelectedTratamiento: any ='';
  public personalData516SelectedPosologia: any = '';
  public personalData516SelectedUnidades: number = 0;
  public personalData516SelectedPauta: any = '';
  public personalData516SelectedInstrucciones: any = '';
  public personalData516RecetasPdfUrl: any = '';

  public personalData517PatologiaData: any = '';
  public personalData517PatologiaDataList: any = [];
  public personalData517PatologiaListSelectedData: any = [];
  public personalData517PatologiaListSelectAllChkBx: boolean = false;
  public personalData517PatologiaSelectedToModify: any = '';
  public personalData517PatologiaModificarData: any = '';
  public personalData517selectedPatologiatId: number = 0;

  public personalData519TratamientoModifyData: string = ''; 
  public personalData519PosologiaModifyData: string = ''; 
  public personalData519UnidadesModifyData: number = 1; 
  public personalData519PautaModifyData: string = ''; 
  public personalData519InstruccionesModifyData: string = ''; 

  public personalData520InfromesSummernoteTitulo: any = '';

  public personalData521SelectedImageDate: any = '';
  public personalData521SelectedImageTitle: any = '';
  public personalData521SelectedImageDescription: any = '';
  public personalData521ImageName: any = '';
  public personalData521ImageWidth: any = '';
  public personalData521ImageHeight: any = '';
  public personalData521ImageResizedHeight: any = '';
  public personalData521ResizedImageUrl: any = '';
  // public personalData521Title: any = '';
  // public personalData521Description: any = '';

  public personalData522SelectedImage: any = '';
  public personalData522Image: any = '';
  public personalData522EditedImageURL: any = '';


  public fullDate = new Date();
  public twoDigitMonth = ((this.fullDate.getMonth()+1) === 1)? (this.fullDate.getMonth()+1) : '0' + (this.fullDate.getMonth()+1);
 
  public todayDate = this.fullDate.getDate() + "/" + this.twoDigitMonth + "/" + this.fullDate.getFullYear();

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

    this.personalData516PrescribeFormGroup = _formBuilder.group({
      'personalData516Patient': ['', Validators.required],
      'personalData516DNI': ['', Validators.required],
      'personalData516Date': ['', Validators.required],
      'personalData516Tratamiento': ['', Validators.required],
      'personalData516Posologia': ['', Validators.required],
      'personalData516Unidades': [1, Validators.required],
      'personalData516Pauta': ['', Validators.required],
      'personalData516Instrucciones': [''],
      'personalData516Prescriptor': ['', Validators.required],
      'personalData516Idioma': ['Catala'],
      'personalData516Direccion': ['', Validators.required],
      'personalData516Poblacion': ['', Validators.required],
      'personalData516Colegiado': ['', Validators.required],
      'personalData516Especialidad': ['', Validators.required]
    });

    this.personalData518FormGroup = _formBuilder.group({
      'personalData518Tratamiento': ['', Validators.required],
      'personalData518Posologia': ['', Validators.required],
      'personalData518Unidades': [1, Validators.required],
      'personalData518Pauta': ['', Validators.required],
      'personalData518Instrucciones': ['', Validators.required]
    });
  
    this.personalData519FormGroup = _formBuilder.group({
      'personalData519Tratamiento': ['', Validators.required],
      'personalData519Posologia': ['', Validators.required],
      'personalData519Unidades': [1, Validators.required],
      'personalData519Pauta': ['', Validators.required],
      'personalData519Instrucciones': ['', Validators.required]
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

      /* initialize the calendar-----------------------------------------------------------------*/
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
      if(resp.success === true) {
        for(let i=0; i<resp.course_history.length; i++) {
          this.personalData5ToWriteText += resp.course_history[i].decoded_curso;
        }
      }
    });

    this.convertAllCheckBooleanToInteger = (this.personalData5AllAgendasCheckbox == true) ? 1 : 0;
    this.consultasExternasService.personalData56ShowAssignDiagnosticList(this.appAccessToken, this.appUserToken, this.convertAllCheckBooleanToInteger, this.personalData5SelectedAgendasData, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt)
    .subscribe(resp => {
      if(resp.success === true) {
        if(resp.assign_diagnostic_list === false) {
          this.personalData56ShowAssignDiagnostic5 = [];
          this.personalData56DiagnosticListSelectedDataDiagnostico5 = [];
        }else {
          this.personalData56ShowAssignDiagnostic5 = resp.assign_diagnostic_list;
        }
        this.personalData56DiagnosticListSelectedDataDiagnostico5 = [];
        this.personalData56DiagnosticListSelectAllChkBx = false;
      }
    });

    this.consultasExternasService.personalData57ListPeticons(this.appAccessToken, this.appUserToken, this.convertAllCheckBooleanToInteger, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        if(resp.assigned_peticions === false) {
          this.personalData57ShowAssignedPeticions = [];
        }else {
          this.personalData57ShowAssignedPeticions = resp.assigned_peticions;
        }
      }
    });

    this.consultasExternasService.personalData516ListAssignedRecetas(this.appAccessToken, this.appUserToken, this.convertAllCheckBooleanToInteger, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        if(resp.return_data.recetas === false) {
          this.personalData511ShowAllAssignedRecetas = [];
        } else {
          this.personalData511ShowAllAssignedRecetas = resp.return_data.recetas;
          // console.log(this.personalData511ShowAllAssignedRecetas);
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
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        
        this.personalData5ToWriteText += editorText;
      }
    });
  }

  personalData5PreviousActivity() {
    this.consultasExternasService.getPreviousActivityData(this.appAccessToken, this.appUserToken, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt)
    .subscribe(resp => {
      if(resp.success === true) {
        this.personalData5PreviousActivityData = resp.previous_activity;
        $('#my-modal-previous-activity').modal('show');
      }
    });
  }

  personalData5PreviousActivityGetDate(dateString) {
    return dateString.split(' ')[0];
  }
  
  personalData5PreviousActivityGetHour(hourString) {
    return hourString.split('.')[0];
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

  /* ===================== 5.6 personalData56 Func Starts ====================== */

  personalData56DiagnosisAddButton() {
    this.consultasExternasService.saveDiagnosticData(this.appAccessToken, this.appUserToken, this.personalData5SelectedAgendasData, this.personalData56DiagnosisAdd)
    .subscribe(resp => {
      if(resp.success === true) {
        this.successErrorMessage = resp.message;
        this.showSuccessErrorAlert = 1;
        this.autoCloseSuccessErrorMsg();
        this.personalData56ShowAllDiagnostic();
        this.personalData56DiagnosticListSelectedData = [];
        this.personalData56DiagnosisAdd = '';
      }
    });
  }

  personalData56DiagnosisModifyButton() {
    this.consultasExternasService.modifyDiagnosticData(this.appAccessToken, this.appUserToken, this.personalData5SelectedAgendasData, this.personalData56DiagnosisModify, this.personalData56DiagnosticListSelectedData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.successErrorMessage = resp.message;
        this.showSuccessErrorAlert = 1;
        this.autoCloseSuccessErrorMsg();
        this.personalData56ShowAllDiagnostic();
        this.personalData56DiagnosticListSelectedData = [];
      }
    });
  }

  personalData56DiagnosisBorrarButton() {
    this.consultasExternasService.borrarDiagnosticData(this.appAccessToken, this.appUserToken, this.personalData56DiagnosticListSelectedData, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        if(resp.diagnostic_list === false) {
          this.personalData56ShowAllDiagnosticDataList = [];
          this.personalData56DiagnosticListSelectAllChkBx = false;
        }else {
          this.personalData56ShowAllDiagnosticDataList = resp.diagnostic_list;
        }
        this.successErrorMessage = resp.message;
        this.showSuccessErrorAlert = 1;
        this.autoCloseSuccessErrorMsg();
        this.personalData56ShowAllDiagnostic();
        this.personalData56DiagnosticListSelectedData = [];
      }
    });
  }
  
  personalData56ShowAllDiagnostic() {
    this.personalData56DiagnosticListSelectedDataDiagnostico5 = [];
    this.consultasExternasService.personalData56ShowAllDiagnosticData(this.appAccessToken, this.appUserToken, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
      this.personalData56ShowAllDiagnosticDataList = resp.diagnostic_list;
      }
    });
  }

  personalData56AssignDiagnostic() {
    this.consultasExternasService.personalData56SelectDiagnosticGrabar(this.appAccessToken, this.appUserToken, this.personalData56DiagnosticSelectDiagnosticIdForGrabar, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData56ShowAssignDiagnostic5 = resp.assign_diagnostic_list;
        this.personalData56DiagnosticSelectDiagnosticIdForGrabar = '';
      }
    });
  }


  personalData56SelectedDiagnosticEdit() {
    console.log(this.personalData56DiagnosticListSelectedDataDiagnostico5);
  }

  personalData56AssignDiagnosticEditGrabar() {
    this.consultasExternasService.personalData56ShowAllDiagnosticData(this.appAccessToken, this.appUserToken, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.personalData56ShowAllDiagnosticDataList = resp.diagnostic_list;
        for(let i=0; i< this.personalData56ShowAssignDiagnostic5.length; i++) {
          if(this.personalData56ShowAssignDiagnostic5[i].personalData56DiagnosticListSelectedDataDiagnostico5 == true) {
            this.personalData56DiagnosticListSelectedDataDiagnosticName = this.personalData56ShowAssignDiagnostic5[i].DIAGNOSTIC;
          }
        }
        for(let j=0; j<this.personalData56ShowAllDiagnosticDataList.length; j++) {
          if(this.personalData56ShowAllDiagnosticDataList[j].diagnostic === this.personalData56DiagnosticListSelectedDataDiagnosticName) {
            this.personalData56DiagnosticDiagnosticIdForSelectedDiagnostic = this.personalData56ShowAllDiagnosticDataList[j].id;
          }
        }
        // console.log(this.personalData56DiagnosticDiagnosticIdForSelectedDiagnostic); //diagnostic_id
        // console.log(this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt);  //patient_id
        // console.log(this.personalData56DiagnosticListSelectedDataDiagnostico5); //id
        // console.log(this.convertAllCheckBooleanToInteger); // All sheckbox true(1) or false(0)
        // console.log(this.personalData5SelectedAgendasData); //agenda id
        this.consultasExternasService.personalData56SelectDiagnosticEditGrabar(this.appAccessToken, this.appUserToken, this.personalData56DiagnosticDiagnosticIdForSelectedDiagnostic, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData56DiagnosticListSelectedDataDiagnostico5, this.convertAllCheckBooleanToInteger, this.personalData5SelectedAgendasData)
        .subscribe(resp => {
          if(resp.success === true) {
            this.successErrorMessage = resp.message;
            this.showSuccessErrorAlert = 1;
            this.autoCloseSuccessErrorMsg();
            this.personalData56ShowAssignDiagnostic5 = resp.assign_diagnostic_list;
            this.personalData56DiagnosticListSelectedDataDiagnostico5 = [];
          }
        });
      } 
    });
  }

  personalData56AssignDiagnosticEditCancelar() {
    this.consultasExternasService.personalData56ShowAssignDiagnosticList(this.appAccessToken, this.appUserToken, this.convertAllCheckBooleanToInteger, this.personalData5SelectedAgendasData, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt)
    .subscribe(resp => {
      if(resp.success === true) {
        if(resp.assign_diagnostic_list === false) {
          this.personalData56ShowAssignDiagnostic5 = [];
        }else {
        this.personalData56ShowAssignDiagnostic5 = resp.assign_diagnostic_list;
        this.personalData56DiagnosticListSelectedDataDiagnostico5 = [];
        }
      }
    });
  }

  personalData56DiagnosisDelete() {
    this.consultasExternasService.personalData56SelectDiagnosticDeleted(this.appAccessToken, this.appUserToken, this.personalData56DiagnosticListSelectedDataDiagnostico5, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        if(resp.assign_diagnostic_list === false) {
          this.personalData56ShowAssignDiagnostic5 = [];
          this.personalData56DiagnosticListSelectAllChkBxDiagnostico5 = false;
        }else {
          this.personalData56ShowAssignDiagnostic5 = resp.assign_diagnostic_list;
        }
        this.personalData56DiagnosticListSelectedDataDiagnostico5 = [];
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
      }
    });
  }

  
  //-------------------------All Checked for 56 personal main page------------------------------
  personalData56DiagnosticListSelectAllChkBxClicked() {
    if(typeof this.personalData56ShowAllDiagnosticDataList !== 'undefined') {
      this.personalData56DiagnosticListSelectedData = [];
      for (var i = 0; i < this.personalData56ShowAllDiagnosticDataList.length; i++) {
        this.personalData56ShowAllDiagnosticDataList[i].personalData56DiagnosticListSelectedData = this.personalData56DiagnosticListSelectAllChkBx;
        if(!(!this.personalData56DiagnosticListSelectAllChkBx)) {
          this.personalData56DiagnosticListSelectedData.push(this.personalData56ShowAllDiagnosticDataList[i].id);
        }
      }
    }
  }

  //--------------------------Check Individual for 56 personal main page-------------------------
  personalData56DiagnosticListSelected(targetElem) {
    this.personalData56DiagnosticListSelectAllChkBx = this.personalData56ShowAllDiagnosticDataList.every(function(item:any) {
      return item.personalData56DiagnosticListSelectedData == true;
    })
    if(targetElem.checked == true) {
      this.personalData56DiagnosticListSelectedData.push(parseInt(targetElem.value));
      // this.personalData56DiagnosticListModifiedId = parseInt(targetElem.value);
    }
    else {
      this.personalData56DiagnosticListSelectedData.splice(this.personalData56DiagnosticListSelectedData.indexOf(parseInt(targetElem.value)), 1);
    }
    for(let i=0; i<this.personalData56ShowAllDiagnosticDataList.length; i++) {
      if(this.personalData56ShowAllDiagnosticDataList[i].id == this.personalData56DiagnosticListSelectedData) {
        this.personalData56DiagnosticListModifiedName = this.personalData56ShowAllDiagnosticDataList[i].diagnostic;
      }
    }
    console.log(this.personalData56DiagnosticListSelectedData);
    console.log(this.personalData56DiagnosticListModifiedName);
  }


  //-------------------------All Checked for 56Diagonostics page------------------------------
  personalData56DiagnosticListSelectAllChkBxClickedDiagnostico5() {
    if(typeof this.personalData56ShowAssignDiagnostic5 !== 'undefined') {
      this.personalData56DiagnosticListSelectedDataDiagnostico5 = [];
      for (var i = 0; i < this.personalData56ShowAssignDiagnostic5.length; i++) {
        this.personalData56ShowAssignDiagnostic5[i].personalData56DiagnosticListSelectedDataDiagnostico5 = this.personalData56DiagnosticListSelectAllChkBxDiagnostico5;
        if(!(!this.personalData56DiagnosticListSelectAllChkBxDiagnostico5)) {
          this.personalData56DiagnosticListSelectedDataDiagnostico5.push(this.personalData56ShowAssignDiagnostic5[i].id);
        }
      }
    }
  }

  //--------------------------Check Individual for 56Diagonostics page-------------------------
  personalData56DiagnosticListSelectedDiagnostico5(targetElem) {
    this.personalData56DiagnosticListSelectAllChkBxDiagnostico5 = this.personalData56ShowAssignDiagnostic5.every(function(item:any) {
      return item.personalData56DiagnosticListSelectedDataDiagnostico5 == true;
    })
    if(targetElem.checked == true) {
      this.personalData56DiagnosticListSelectedDataDiagnostico5.push(parseInt(targetElem.value));
    }
    else {
      this.personalData56DiagnosticListSelectedDataDiagnostico5.splice(this.personalData56DiagnosticListSelectedDataDiagnostico5.indexOf(parseInt(targetElem.value)), 1);
    }
  }

  /* ===================== 5.6 personalData56 Func Ends ====================== */
  

  /* ===================== 5.7 personalData57 Func Starts ====================== */
  personalData57ShowAllDepartmentList() {
    this.consultasExternasService.personalData57ShowDepartment(this.appAccessToken, this.appUserToken,this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.personalData57ShowDepartmentlist = resp.department_list;
        this.personalData57DepartmentListSelectedData = [];
        this.personalData57DepartmentListSelectAllChkBx = false;
      }
    });
  }

  personalData57DepartmentAnadirGrabarBtn() {
    this.consultasExternasService.personalData57DepartmentSave(this.appAccessToken, this.appUserToken, this.personalData57DepartmentName, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData57ShowDepartmentlist = resp.department_list;
        this.personalData57DepartmentListSelectedData = [];
        this.personalData57DepartmentName = '';
      }
    });
  }
  
  // personalData57DepartmentModificarBtn(){
  //   this.consultasExternasService.personalData57ShowDepartment(this.appAccessToken, this.appUserToken,this.personalData5SelectedAgendasData)
  //   .subscribe(resp => {
  //     if(resp.success === true) {
  //       this.personalData57ShowDepartmentlist = resp.department_list;
  //       for(let i=0; i<this.personalData57ShowDepartmentlist.length; i++){
  //         if(this.personalData57ShowDepartmentlist[i].id == this.personalData57DepartmentListSelectedData){
  //           this.personalData57DepartmentModificarNamePick = this.personalData57ShowDepartmentlist[i].departamento;
  //         }
  //       }
  //     }
  //   });
  // }

  personalData57DepartmentModificarGrabarBtn() {
    console.log(this.personalData57DepartmentListSelectedData);
    console.log(this.personalData57DepartmentModifiedName);
    this.consultasExternasService.personalData57DepartmentModificar(this.appAccessToken, this.appUserToken, this.personalData57DepartmentListSelectedData, this.personalData57DepartmentModifiedName, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData57ShowDepartmentlist = resp.department_list;
        this.personalData57DepartmentListSelectedData = [];
      }
    });
  }

  // personalData57DepartmentModificarCancelarBtn(){
  //   this.personalData57DepartmentListSelectedData = [];
  // }


  personalData57DepartmentBorrarButton() {
    this.consultasExternasService.personalData57DepartmentDelete(this.appAccessToken, this.appUserToken, this.personalData57DepartmentListSelectedData, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        if(resp.department_list === false) {
          this.personalData57ShowDepartmentlist = [];
        }else {
        this.personalData57ShowDepartmentlist = resp.department_list;
        }
        this.personalData57DepartmentListSelectAllChkBx = false;
        this.personalData57DepartmentListSelectedData = [];
      }
    });
  }

  //-------------------------All Checked for 57Department page------------------------------
  personalData57DepartmentListSelectAllChkBxClicked() {
    if(typeof this.personalData57ShowDepartmentlist !== 'undefined') {
      this.personalData57DepartmentListSelectedData = [];
      for (var i = 0; i < this.personalData57ShowDepartmentlist.length; i++) {
        this.personalData57ShowDepartmentlist[i].personalData57DepartmentListSelectedData = this.personalData57DepartmentListSelectAllChkBx;
        if(!(!this.personalData57DepartmentListSelectAllChkBx)) {
          this.personalData57DepartmentListSelectedData.push(this.personalData57ShowDepartmentlist[i].id);
        }
      }
    }
  }
    
  //--------------------------Check Individual for 57Department page-------------------------
  personalData57DepartmentListSelected(targetElem) {
    this.personalData57DepartmentListSelectAllChkBx = this.personalData57ShowDepartmentlist.every(function(item:any) {
      return item.personalData57DepartmentListSelectedData == true;
    })
    if(targetElem.checked == true) {
      this.personalData57DepartmentListSelectedData.push(parseInt(targetElem.value));
    }
    else {
      this.personalData57DepartmentListSelectedData.splice(this.personalData57DepartmentListSelectedData.indexOf(parseInt(targetElem.value)), 1);
    }
    console.log(this.personalData57DepartmentListSelectedData);
    for(let i=0; i<this.personalData57ShowDepartmentlist.length; i++) {
      if(this.personalData57ShowDepartmentlist[i].id == this.personalData57DepartmentListSelectedData) {
        this.personalData57DepartmentModificarNamePick = this.personalData57ShowDepartmentlist[i].departamento;
      }
    }
  }

  personalData57ShowAllPeticionList() {
    this.consultasExternasService.personalData57ShowPeticionList(this.appAccessToken, this.appUserToken, this.personalData57selectedDepartmentId,this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showPreparingData = 0;
        if(resp.peticion_list === false) {
          this.showSuccessErrorAlert = 1;
          this.successErrorMessage = resp.message;
          this.autoCloseSuccessErrorMsg();
          this.personalData57ShowPeticionlist = [];
        }else {
          this.personalData57ShowPeticionlist = resp.peticion_list;
        }
      }
    });
  }

  personalData57PruebaAnadirGrabar() {
    this.consultasExternasService.personalData57PruebaAnadirGrabar(this.appAccessToken, this.appUserToken, this.personalData57selectedDepartmentId, this.personalData57ObservacionesTextareaVal, this.personalData57PeticionTextareaVal, this.personalData5SelectedAgendasData, this.personalData57PlantillaSelectVal)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData57ShowPeticionlist = resp.peticion_list;
        this.personalData57DepartmentListSelectedData = [];
        this.personalData57PeticionTextareaVal = '';
        this.personalData57ObservacionesTextareaVal = '';
      }
    });
  }

  personalData57PruebaModificarGrabarBtn() {
    this.consultasExternasService.personalData57PruebaModificarGrabar(this.appAccessToken, this.appUserToken, this.personalData57selectedDepartmentId, this.personalData57ObservacionesModificarTextareaVal, this.personalData57PeticionModificarTextareaVal, this.personalData5SelectedAgendasData, this.personalData57PlantillaSelectVal, this.personalData57PeticionListSelectedData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData57ShowPeticionlist = resp.peticion_list;
        this.personalData57PeticionListSelectedData = [];
        this.personalData57PeticionModificarTextareaVal = '';
        this.personalData57ObservacionesModificarTextareaVal = '';
      }
    });
  }

  personalData57PruebaBorrarButton() {
    this.consultasExternasService.personalData57PruebaBorrar(this.appAccessToken, this.appUserToken, this.personalData57PeticionListSelectedData, this.personalData57selectedDepartmentId, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        if(resp.peticion_list === false) {
          this.personalData57ShowPeticionlist = [];
          this.personalData57PeticionListSelectAllChkBx = false;
        }else {
        this.personalData57ShowPeticionlist = resp.peticion_list;
        }
        this.personalData57PeticionListSelectedData = [];
      }
    });
  }

  //-------------------------All Checked for 57Peticion page------------------------------
  personalData57PeticionListSelectAllChkBxClicked() {
    if(typeof this.personalData57ShowPeticionlist !== 'undefined') {
      this.personalData57PeticionListSelectedData = [];
      for (var i = 0; i < this.personalData57ShowPeticionlist.length; i++) {
        this.personalData57ShowPeticionlist[i].personalData57PeticionListSelectedData = this.personalData57PeticionListSelectAllChkBx;
        if(!(!this.personalData57PeticionListSelectAllChkBx)) {
          this.personalData57PeticionListSelectedData.push(this.personalData57ShowPeticionlist[i].id);
        }
      }
    }
  }
  
  //--------------------------Check Individual for 57Peticion page-------------------------
  personalData57PeticionListSelected(targetElem) {
    this.personalData57PeticionListSelectAllChkBx = this.personalData57ShowPeticionlist.every(function(item:any) {
      return item.personalData57PeticionListSelectedData == true;
    })
    if(targetElem.checked == true) {
      this.personalData57PeticionListSelectedData.push(parseInt(targetElem.value));
    }
    else {
      this.personalData57PeticionListSelectedData.splice(this.personalData57PeticionListSelectedData.indexOf(parseInt(targetElem.value)), 1);
    }
    for(let i=0; i<this.personalData57ShowPeticionlist.length; i++) {
      if(this.personalData57ShowPeticionlist[i].id == this.personalData57PeticionListSelectedData) {
        this.personalData57PeticionTextareaPick = this.personalData57ShowPeticionlist[i].peticion;
        this.personalData57ObservacionesTextareaPick = this.personalData57ShowPeticionlist[i].prueba;
      }
    }
  }

  personalData57PeticionSolicitarBtn() {
    for(let i=0; i<this.personalData57ShowPeticionlist.length; i++) {
      if(this.personalData57ShowPeticionlist[i].id == this.personalData57PeticionAssignSelectedDataId) {
        this.personalData57PeticionAssignSelectedData = this.personalData57ShowPeticionlist[i].peticion;
        this.personalData57PruebaAssignSelectedData = this.personalData57ShowPeticionlist[i].prueba;
      }
    }
    setTimeout(() => {
      $('.summernote-1').summernote('reset');
      $('.summernote-1').summernote({
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
    }, 100)
  }

  cancelPeticionSolicitarData() {
    this.personalData57PeticionAssignSelectedDataId = 0;
    this.personalData57PeticionAssignSelectedData = '';
    this.personalData57PruebaAssignSelectedData = '';
  }

  savePeticionSolicitarData() {
    let editorText1 = $(".summernote-1").summernote("code");
    let usuario = 'pending';
    // console.log(this.personalData57PeticionAssignSelectedDataId); //peticion_id
    // // usuario send pending for now
    // console.log(this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt);  //patient_id
    // console.log(this.personalData5SelectedAgendasData); //agenda_id
    // console.log(editorText1); //texto
    // // has_peticion send 1 or true for now
    this.consultasExternasService.personalData57AssignPeticions(this.appAccessToken, this.appUserToken, this.personalData57PeticionAssignSelectedDataId, usuario, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData, editorText1, 1)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData57AssignPeticionsPdfUrl = resp.return_data;
        this.personalData57PeticionAssignSelectedDataId = 0;
        $('#peticionSolicitar').modal('hide');
      }
    });
  }

  personalData57AssignedPeticionSelectedShow() {
    console.log(this.personalData57PeticionAssignListSelectedData);
  }

  /* ===================== 5.7 personalData57 Func Ends ====================== */

  /* ===================== 5.11 personalData511 Func Start ====================== */
  personalData511PatologiaOnChange(targetValue) {
    // this.personalData515RecetasListSelectAllChkBx = false;
    // this.personalData515RecetasListSelectedData = [];
    this.personalData511selectedPatologiatId = targetValue;
    this.showPreparingData = 1;
    this.consultasExternasService.personalData515RecetasList(this.appAccessToken, this.appUserToken, this.personalData511selectedPatologiatId, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.personalData511RecetasListSelectedData = [];
        this.personalData511RecetasListSelectAllChkBx = false;
        this.showPreparingData = 0;
        if(resp.recetas_list === false) {
          this.personalData511RecetasDataList = [];
        }else {
          this.personalData511RecetasDataList = resp.recetas_list;
        }
      }
    });
  }

  //-------------------------All Checked for 511Patologia page------------------------------
  personalData511RecetasListSelectAllChkBxClicked() {
    if(typeof this.personalData511RecetasDataList !== 'undefined') {
      this.personalData511RecetasListSelectedData = [];
      for (var i = 0; i < this.personalData511RecetasDataList.length; i++) {
        this.personalData511RecetasDataList[i].personalData511RecetasListSelectedData = this.personalData511RecetasListSelectAllChkBx;
        if(!(!this.personalData511RecetasListSelectAllChkBx)) {
          this.personalData511RecetasListSelectedData.push(this.personalData511RecetasDataList[i].id);
        }
      }
    }
  }
    
  //--------------------------Check Individual for 511Patologia page-------------------------
  personalData511RecetasListSelected(targetElem) {
    this.personalData511RecetasListSelectAllChkBx = this.personalData511RecetasDataList.every(function(item:any) {
      return item.personalData511RecetasListSelectedData == true;
    })
    if(targetElem.checked == true) {
      this.personalData511RecetasListSelectedData.push(parseInt(targetElem.value));
    }
    else {
      this.personalData511RecetasListSelectedData.splice(this.personalData511RecetasListSelectedData.indexOf(parseInt(targetElem.value)), 1);
    }
    console.log(this.personalData511RecetasListSelectedData);
    // for(let i=0; i<this.personalData511RecetasDataList.length; i++) {
    //   if(this.personalData511RecetasDataList[i].id == this.personalData511RecetasListSelectedData[0]) {
    //     this.personalData517PatologiaSelectedToModify = this.personalData511RecetasDataList[i].patologia;
    //   }
    // }
  }
  /* ===================== 5.11 personalData511 Func Ends ====================== */

  /* ===================== 5.12 personalData512 Func Start ====================== */

  personalData512SelectedImageRemove() {
    console.log(this.personalData512SelectedImageId);
    this.consultasExternasService.personalData512SelectedImageRemove(this.appAccessToken, this.appUserToken, this.personalData512SelectedImageId, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData512getAllImagesData = resp.imagenes_list;
        this.personalData512SelectedImageId = '';
      }
    })
  }

  personalData512SelectedImageEnlarge() {
    console.log(this.personalData512SelectedImageId);
    this.showPreparingData = 1;
    this.consultasExternasService.personalData512SelectedImageEnlarge(this.appAccessToken, this.appUserToken, this.personalData512SelectedImageId)
    .subscribe(resp => {
      this.showPreparingData = 0;
      console.log(resp);
      this.personalData512SelectedImage = resp.image[0].Content;
    })
  }

  personalData512SelectedImageEnlargeModalClose() {
    this.showPreparingData = 0;
    this.personalData512SelectedImage = '';
  }

  /* ===================== 5.12 personalData512 Func End ====================== */

  /* ===================== 5.13 personalData513 Func Start ====================== */

  onSelectFile(e) {
    console.log(e);
    // this.files = event.target.files;
    // console.log(event.target.files[0].name);
    this.personalData513ImageName = e.target.files[0].name;
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.personalData513ImageUrl = reader.result;

        // var canvas = <HTMLCanvasElement> document.getElementById("imageCanvas");
        // var ctx = canvas.getContext("2d");
        // ===============================  OR ==============================
        var canvas : any = document.getElementById("imageCanvas");
        var ctx = canvas.getContext("2d");
        var image = new Image();
        image.onload = () => {
          // console.log(image.width);
          // console.log(image.height);
          if(image.width > 800) {
            console.log('hello1')
            this.personalData513ImageWidth = image.width;
            this.personalData513ImageHeight = image.height;
            this.personalData513ImageResizedHeight = Math.trunc((800*image.height)/image.width);
            // console.log(this.personalData513ImageResizedHeight);
            canvas.width = 800;
            canvas.height = this.personalData513ImageResizedHeight;
            ctx.drawImage(image, 0, 0, 800, this.personalData513ImageResizedHeight);

            this.personalData513ResizedImageUrl = canvas.toDataURL("image/*");
            // document.getElementById('image').src = dataurl;
            console.log(this.personalData513ResizedImageUrl);
          }
          else {
            console.log('hello2')
            this.personalData513ResizedImageUrl = reader.result;
            console.log(this.personalData513ResizedImageUrl);
          }
        }
        image.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  personalData513GetImageGrabar() {
    console.log(this.personalData513GetDate);
    console.log(this.personalData513Title);
    console.log(this.personalData513Description);
    //pass a static value as width
    console.log(this.personalData513ImageResizedHeight);
    console.log(this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt);
    console.log(this.personalData5SelectedAgendasData);
    console.log(this.personalData513ResizedImageUrl);
    this.consultasExternasService.personalData513ImageGrabar(this.appAccessToken, this.appUserToken, this.personalData513GetDate, this.personalData513Title, this.personalData513Description, 800, this.personalData513ImageResizedHeight, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData, this.personalData513ResizedImageUrl)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData513ImageName = '';
        this.personalData513ResizedImageUrl = '';
        this.personalData513GetDate = '';
        this.personalData513Title = '';
        this.personalData513Description = '';
        this.hoursMenuClick(5.12, '.ribbon');
      }
    });
  }

  /* ===================== 5.13 personalData513 Func Ends ====================== */

  
  /* ===================== 5.21 personalData521 Func Start ====================== */
  
  onSelectFileEdit(e) {
    console.log(e);
    // this.files = event.target.files;
    // console.log(event.target.files[0].name);
    this.personalData521ImageName = e.target.files[0].name;
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => { // called once readAsDataURL is completed

        // var canvas = <HTMLCanvasElement> document.getElementById("imageCanvas");
        // var ctx = canvas.getContext("2d");
        // ===============================  OR ==============================
        var canvas : any = document.getElementById("imageCanvasOfEdit");
        var ctx = canvas.getContext("2d");
        var image = new Image();
        image.onload = () => {
          // console.log(image.width);
          // console.log(image.height);
          if(image.width > 800) {
            console.log('hello12')
            this.personalData521ImageWidth = image.width;
            this.personalData521ImageHeight = image.height;
            this.personalData521ImageResizedHeight = Math.trunc((800*image.height)/image.width);
            // console.log(this.personalData513ImageResizedHeight);
            canvas.width = 800;
            canvas.height = this.personalData521ImageResizedHeight;
            ctx.drawImage(image, 0, 0, 800, this.personalData521ImageResizedHeight);

            this.personalData521ResizedImageUrl = canvas.toDataURL("image/*");
            // document.getElementById('image').src = dataurl;
            console.log(this.personalData521ResizedImageUrl);
          }
          else {
            console.log('hello22')
            this.personalData521ResizedImageUrl = reader.result;
            console.log(this.personalData521ResizedImageUrl);
          }
        }
        image.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  personalData521GetImageGrabar() {
    console.log(this.personalData512SelectedImageId);
    console.log(this.personalData521SelectedImageTitle);
    console.log(this.personalData521SelectedImageDescription);
    //pass a static value as width
    console.log(this.personalData521ResizedImageUrl);
    this.consultasExternasService.personalData521ImageGrabarEdit(this.appAccessToken, this.appUserToken, this.personalData512SelectedImageId, this.personalData521SelectedImageTitle, this.personalData521SelectedImageDescription, this.personalData521ResizedImageUrl)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData512SelectedImageId = '';
        this.personalData521ImageName = '';
        this.personalData521ResizedImageUrl = '';
        this.personalData521SelectedImageTitle = '';
        this.personalData521SelectedImageDescription = '';
        this.hoursMenuClick(5.12, '.ribbon'); 
      }
    });
  }
  
  /* ===================== 5.21 personalData521 Func Ends ====================== */

  /* ===================== 5.15 personalData515 Func Start ====================== */

  personalData515RecetasListSelectAllChkBxClicked() {
    if(typeof this.personalData515RecetasDataList !== 'undefined') {
      this.personalData515RecetasListSelectedData = [];
      for (var i = 0; i < this.personalData515RecetasDataList.length; i++) {
        this.personalData515RecetasDataList[i].personalData515RecetasListSelectedData = this.personalData515RecetasListSelectAllChkBx;
        if(!(!this.personalData515RecetasListSelectAllChkBx)) {
          this.personalData515RecetasListSelectedData.push(this.personalData515RecetasDataList[i].id);
        }
      }
    }
  }
    
  //--------------------------Check Individual for 515Patologia page-------------------------
  personalData515RecetasListSelected(targetElem) {
    this.personalData515RecetasListSelectAllChkBx = this.personalData515RecetasDataList.every(function(item:any) {
      return item.personalData515RecetasListSelectedData == true;
    })
    if(targetElem.checked == true) {
      this.personalData515RecetasListSelectedData.push(parseInt(targetElem.value));
    }
    else {
      this.personalData515RecetasListSelectedData.splice(this.personalData515RecetasListSelectedData.indexOf(parseInt(targetElem.value)), 1);
    }
    // for(let i=0; i<this.personalData515RecetasDataList.length; i++) {
    //   if(this.personalData515RecetasDataList[i].id == this.personalData515RecetasListSelectedData[0]) {
    //     this.personalData517PatologiaSelectedToModify = this.personalData515RecetasDataList[i].patologia;
    //   }
    // }
    // console.log(this.personalData515RecetasListSelectedData);
  }

  personalData515RecetasBorrarButton() {
    this.consultasExternasService.personalData515DeleteRecetas(this.appAccessToken, this.appUserToken, this.personalData515RecetasListSelectedData, this.personalData517selectedPatologiatId, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        if(resp.recetas_list === false) {
          this.personalData515RecetasDataList = [];
        }else {
          this.personalData515RecetasDataList = resp.recetas_list;
        }
        this.personalData515RecetasListSelectedData = [];
        this.personalData515RecetasListSelectAllChkBx = false;
      }
    });
  }

  personalData515Cancelar() {
    this.personalData511selectedPatologiatId = 0;
    this.personalData511RecetasDataList = [];
    this.personalData511RecetasListSelectedData = [];
    this.personalData511RecetasListSelectAllChkBx = false;
  }

  /* ===================== 5.15 personalData515 Func Ends ====================== */

  /* ===================== 5.16 personalData516 Func Start ====================== */
  
  personalData516AddPrescribeData(formData) {
    // console.log(this.personalData511RecetasListSelectedData);
    // console.log(formData.personalData516Unidades);
    // console.log(formData.personalData516Pauta);
    // console.log(formData.personalData516Posologia);
    // console.log(formData.personalData516Instrucciones);
    // console.log(formData.personalData516Direccion);
    // console.log(formData.personalData516Tratamiento);
    this.consultasExternasService.personalData516SavePrescribtion(this.appAccessToken, this.appUserToken, this.personalData511RecetasListSelectedData, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData, formData.personalData516Unidades, formData.personalData516Pauta, formData.personalData516Posologia, formData.personalData516Instrucciones, formData.personalData516Direccion, formData.personalData516Tratamiento)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData516AssignedRecetasList = resp.return_data;
        this.personalData516RecetasPdfUrl = resp.pdf;
        // this.personalData511RecetasListSelectedData = [];
        this.personalData516PrescribeFormGroup.reset({personalData516Unidades: 1, personalData516Idioma: 'Catala'});
        this.hoursMenuClick(5.11, '.ribbon');
      }
    })
  }
  
  /* ===================== 5.16 personalData516 Func Ends ====================== */

  /* ===================== 5.17 personalData517 Func Start ====================== */

  personalData517ShowAllPatologiaList() {
    this.consultasExternasService.personalData517PatologiaList(this.appAccessToken, this.appUserToken, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      if(resp.success === true) {
        if(resp.patologia_list === false) {
          this.personalData517PatologiaDataList = [];
        }else {
          this.personalData517PatologiaDataList = resp.patologia_list;
        }
      }
    });
  }

  personalData517PatologiaAnadirGrabarButton() {
    this.consultasExternasService.personalData517PatologiaGrabar(this.appAccessToken, this.appUserToken, this.personalData517PatologiaData, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        if(resp.patologia_list === false) {
          this.personalData517PatologiaDataList = [];
        }else {
          this.personalData517PatologiaDataList = resp.patologia_list;
        }
        this.personalData517PatologiaData = '';
      }
    });
  }
  
  personalData517PatologiaModificarGrabarButton() {
    this.consultasExternasService.personalData517PatologiaModificar(this.appAccessToken, this.appUserToken, this.personalData517PatologiaModificarData, this.personalData5SelectedAgendasData, this.personalData517PatologiaListSelectedData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        if(resp.patologia_list === false) {
          this.personalData517PatologiaDataList = [];
        }else {
          this.personalData517PatologiaDataList = resp.patologia_list;
        }
        this.personalData517PatologiaModificarData = '';
        this.personalData517PatologiaListSelectedData = [];
      }
    });
  }

  personalData517PatologiaBorrarButton() {
    this.consultasExternasService.personalData517PatologiaBorrar(this.appAccessToken, this.appUserToken, this.personalData5SelectedAgendasData, this.personalData517PatologiaListSelectedData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        if(resp.patologia_list === false) {
          this.personalData517PatologiaDataList = [];
        }else {
          this.personalData517PatologiaDataList = resp.patologia_list;
        }
        this.personalData517PatologiaListSelectedData = [];
        this.personalData517PatologiaListSelectAllChkBx = false;
      }
    });
  }

  personalData517Cancelar() {
    this.personalData517selectedPatologiatId = 0;
    this.personalData515RecetasDataList = [];
    this.personalData515RecetasListSelectAllChkBx = false;
    this.personalData515RecetasListSelectedData = [];
  }

  
  //-------------------------All Checked for 517Patologia page------------------------------
  personalData517PatologiaSelectAllChkBxClicked() {
    if(typeof this.personalData517PatologiaDataList !== 'undefined') {
      this.personalData517PatologiaListSelectedData = [];
      for (var i = 0; i < this.personalData517PatologiaDataList.length; i++) {
        this.personalData517PatologiaDataList[i].personalData517PatologiaListSelectedData = this.personalData517PatologiaListSelectAllChkBx;
        if(!(!this.personalData517PatologiaListSelectAllChkBx)) {
          this.personalData517PatologiaListSelectedData.push(this.personalData517PatologiaDataList[i].id);
        }
      }
    }
  }
    
  //--------------------------Check Individual for 517Patologia page-------------------------
  personalData517PatologiaListSelected(targetElem) {
    this.personalData517PatologiaListSelectAllChkBx = this.personalData517PatologiaDataList.every(function(item:any) {
      return item.personalData517PatologiaListSelectedData == true;
    })
    if(targetElem.checked == true) {
      this.personalData517PatologiaListSelectedData.push(parseInt(targetElem.value));
    }
    else {
      this.personalData517PatologiaListSelectedData.splice(this.personalData517PatologiaListSelectedData.indexOf(parseInt(targetElem.value)), 1);
    }
    for(let i=0; i<this.personalData517PatologiaDataList.length; i++) {
      if(this.personalData517PatologiaDataList[i].id == this.personalData517PatologiaListSelectedData[0]) {
        this.personalData517PatologiaSelectedToModify = this.personalData517PatologiaDataList[i].patologia;
      }
    }
  }

  personalData517PatologiaOnChange(targetValue) {
    // this.personalData515RecetasListSelectAllChkBx = false;
    // this.personalData515RecetasListSelectedData = [];
    this.personalData517selectedPatologiatId = targetValue;
    this.showPreparingData = 1;
    this.consultasExternasService.personalData515RecetasList(this.appAccessToken, this.appUserToken, this.personalData517selectedPatologiatId, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showPreparingData = 0;
        if(resp.recetas_list === false) {
          this.personalData515RecetasDataList = [];
        }else {
          this.personalData515RecetasDataList = resp.recetas_list;
        }
      }
    });
  }

  /* ===================== 5.17 personalData517 Func Ends ====================== */

  /* ===================== 5.18 personalData518 Func Start ====================== */

  personalData518AddTratamientoData(formData) {    
    this.consultasExternasService.saveRecetasData(this.appAccessToken, this.appUserToken, this.personalData517selectedPatologiatId, formData.personalData518Instrucciones, formData.personalData518Tratamiento, this.personalData5SelectedAgendasData, formData.personalData518Posologia, formData.personalData518Unidades, formData.personalData518Pauta)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData515RecetasDataList = resp.recetas_list;
        this.personalData518FormGroup.reset({personalData518Unidades: 1});
        this.hoursMenuClick(5.15, '.ribbon');
        this.personalData515RecetasListSelectedData = [];
      }
    });
  }

  /* ===================== 5.18 personalData518 Func Ends ====================== */

  /* ===================== 5.19 personalData519 Func Start ====================== */

  personalData519ModifyTratamientoData(formData) {
    this.consultasExternasService.modifyRecetasData(this.appAccessToken, this.appUserToken, this.personalData517selectedPatologiatId, formData.personalData519Instrucciones, formData.personalData519Tratamiento, this.personalData5SelectedAgendasData, formData.personalData519Posologia, formData.personalData519Unidades, formData.personalData519Pauta, this.personalData515RecetasListSelectedData)
    .subscribe(resp => {
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData515RecetasDataList = resp.recetas_list;
        this.personalData519FormGroup.reset();
        this.hoursMenuClick(5.15, '.ribbon');
        this.personalData515RecetasListSelectedData = [];
      }
    });
  }

  /* ===================== 5.19 personalData519 Func Ends ====================== */
  
  /* ===================== 5.20 personalData520 Infromes Func Start ====================== */

  personalData520InfromesVacio() {
    setTimeout(() => {
      $('.summernote-2').summernote('reset');
      $('.summernote-2').summernote({
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
    }, 100)
  }

  personalData520InfromesSummernoteGrabar() {
    let summernote2Text = $(".summernote-2").summernote("code");
    console.log(summernote2Text);
    console.log(this.personalData520InfromesSummernoteTitulo);
    console.log(this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt);
    console.log(this.personalData5SelectedAgendasData);
    this.consultasExternasService.personalData520SaveInfromes(this.appAccessToken, this.appUserToken, this.personalData520InfromesSummernoteTitulo, summernote2Text, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.showSuccessErrorAlert = 1;
        this.successErrorMessage = resp.message;
        this.autoCloseSuccessErrorMsg();
        this.personalData520InfromesSummernoteTitulo = '';
      }
    })
  }

  /* ===================== 5.20 personalData520 Infromes Func Ends ====================== */

  /* ===================== 5.22 personalData522 Infromes Func Start ====================== */

  personalData522EditedImageSave() {
    console.log(this.personalData522EditedImageURL);
    console.log(this.personalData512SelectedImageId);
  }

  /* ===================== 5.22 personalData522 Infromes Func Ends ====================== */
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

        this.consultasExternasService.loadSpecialtyData(this.appAccessToken, this.appUserToken)
        .subscribe(resp => {
          if(typeof resp.especialidad === 'object') {
            this.especialidadData = resp.especialidad;
          }
        });
      }
      else if(value == 3) {
        this.forceVisitFunc();
      }
      else if(value == 4) {
        this.changeDateFunc();
      }
      else if(value == 5) {
        this.personalDataFunc();
        this.personalData57ShowPeticionlist = [];
        this.personalData56DiagnosticListSelectedData = [];
        this.personalData56DiagnosticListSelectAllChkBx = false;
        this.personalData57PeticionAssignSelectedDataId = 0;
        this.personalData57PeticionAssignListSelectedData = '';
        this.personalData511RecetasDataList = [];
        this.personalData511RecetasListSelectedData = [];
        this.personalData511RecetasListSelectAllChkBx =false;
        this.personalData511selectedPatologiatId = 0;
        this.personalData511AssignedRecetasListSelectedData = '';
        this.personalData512SelectedImageId = '';
        this.consultasExternasService.personalData512GetAllImagesData(this.appAccessToken, this.appUserToken, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
        .subscribe(resp => {
          console.log(resp);
          if(resp.success === true) {
            this.showPreparingData = 0;
            this.personalData512getAllImagesData = resp.imagenes_list;
            this.personalData521ImageName = '';
            this.personalData521ResizedImageUrl = '';
          }
        });
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
      else if(value == 5.6) {
        this.personalData56ShowAllDiagnostic();
      }
      else if(value == 5.7) {
        this.personalData57ShowAllDepartmentList();
        this.personalData57PeticionListSelectAllChkBx = false;
        this.personalData57PeticionListSelectedData = [];
        this.personalData57ShowPeticionlist = [];
      }
      else if(value == 5.8) {
        this.personalData57ShowAllDepartmentList();
        this.personalData57selectedDepartmentId = 0;
        this.personalData57ShowPeticionlist = [];
        this.personalData57PeticionAssignSelectedDataId = 0;

      }
      else if(value == 5.9) {
        this.personalData57ShowAllDepartmentList();
      }
      else if(value == 5.11) {
        console.log(this.personalData511selectedPatologiatId);
        this.personalData517ShowAllPatologiaList();
        this.personalData517selectedPatologiatId = 0;
        this.personalData515RecetasDataList = [];
        this.personalData515RecetasListSelectedData = [];
        this.personalData515RecetasListSelectAllChkBx = false;
      }
      else if(value == 5.12) {
        this.showPreparingData = 1;
        this.consultasExternasService.personalData512GetAllImagesData(this.appAccessToken, this.appUserToken, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
        .subscribe(resp => {
          console.log(resp);
          if(resp.success === true) {
            this.showPreparingData = 0;
            this.personalData512getAllImagesData = resp.imagenes_list;
            this.personalData521ImageName = '';
            this.personalData521ResizedImageUrl = '';
          }
        })
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
      else if(value == 5.15) {
        this.personalData517ShowAllPatologiaList();
        this.personalData517PatologiaListSelectedData = [];
        this.personalData517PatologiaListSelectAllChkBx = false;
        this.personalData517PatologiaDataList = [];
      }
      else if(value == 5.16) {
        console.log(this.personalData511RecetasDataList);
        for(let i=0; i<this.personalData511RecetasDataList.length; i++) {
          if(this.personalData511RecetasDataList[i].id == this.personalData511RecetasListSelectedData) {
            this.personalData516SelectedTratamiento = this.personalData511RecetasDataList[i].tratamientos;
            this.personalData516SelectedPosologia = this.personalData511RecetasDataList[i].posologia;
            this.personalData516SelectedUnidades = this.personalData511RecetasDataList[i].unidades;
            this.personalData516SelectedPauta = this.personalData511RecetasDataList[i].pauta;
            this.personalData516SelectedInstrucciones = this.personalData511RecetasDataList[i].farmaco;
          }
        }
        this.consultasExternasService.personalData516PrescribeRecetas(this.appAccessToken, this.appUserToken, this.getVisitDataFromVisitId(this.selectedVisit).ID_malalt, this.personalData5SelectedAgendasData)
        .subscribe(resp => {
          console.log(resp);
          if(resp.success === true) {
            this.personalData516fullName = resp.patient_details.nom + ' ' + resp.patient_details.cog1 + ' '  + resp.patient_details.cog2;
            this.personalData516DNI = resp.patient_details.dni;
            this.personalData516Date = resp.patient_details.datai;
            this.personalData516Especialidad = resp.doctors_details.txtespe;
          }
        });
      }
      else if(value == 5.17) {
        this.personalData517ShowAllPatologiaList();
      }
      else if(value == 5.19) {
        for(let i=0; i<this.personalData515RecetasDataList.length; i++) {
          if(this.personalData515RecetasDataList[i].id == this.personalData515RecetasListSelectedData) {
            this.personalData519TratamientoModifyData = this.personalData515RecetasDataList[i].tratamientos;
            this.personalData519PosologiaModifyData = this.personalData515RecetasDataList[i].posologia;
            this.personalData519UnidadesModifyData = this.personalData515RecetasDataList[i].unidades;
            this.personalData519PautaModifyData = this.personalData515RecetasDataList[i].pauta;
            this.personalData519InstruccionesModifyData = this.personalData515RecetasDataList[i].farmaco;
          }
        }
        this.personalData519FormGroup.controls['personalData519Tratamiento'].setValue(this.personalData519TratamientoModifyData);
        this.personalData519FormGroup.controls['personalData519Posologia'].setValue(this.personalData519PosologiaModifyData);
        this.personalData519FormGroup.controls['personalData519Unidades'].setValue(this.personalData519UnidadesModifyData);
        this.personalData519FormGroup.controls['personalData519Pauta'].setValue(this.personalData519PautaModifyData);
        this.personalData519FormGroup.controls['personalData519Instrucciones'].setValue(this.personalData519InstruccionesModifyData);
      }
      else if(value == 5.21) {
        console.log(this.personalData512SelectedImageId);
        console.log(this.personalData512getAllImagesData);
        this.showPreparingData = 1;
        this.consultasExternasService.personalData512SelectedImageEnlarge(this.appAccessToken, this.appUserToken, this.personalData512SelectedImageId)
        .subscribe(resp => {
          this.showPreparingData = 0;
          console.log(resp);
          this.personalData521ResizedImageUrl = resp.image[0].Content;
        })
        for(let i=0; i<this.personalData512getAllImagesData.length; i++) {
          if(this.personalData512SelectedImageId == this.personalData512getAllImagesData[i].id) {
            this.personalData521SelectedImageDate = this.personalData512getAllImagesData[i].data.slice(0,10);
            this.personalData521SelectedImageTitle = this.personalData512getAllImagesData[i].title;
            this.personalData521SelectedImageDescription = this.personalData512getAllImagesData[i].comentaris;
          }
        }
        console.log(this.personalData521SelectedImageDate);
        console.log(this.personalData521SelectedImageTitle);
        console.log(this.personalData521SelectedImageDescription);
      }
      else if(value == 5.22) {
        // var _that = this;
        console.log(this.personalData512SelectedImageId);
        this.showPreparingData = 1;
        this.consultasExternasService.personalData512SelectedImageEnlarge(this.appAccessToken, this.appUserToken, this.personalData512SelectedImageId)
        .subscribe(resp => {
          this.showPreparingData = 0;
          console.log(resp);
          this.personalData522SelectedImage = resp.image[0].Content;
          
          $('#target').on('load', () => {
            /* Enable Cross Origin Image Editing */
            console.log(this.personalData522SelectedImage);
            var r, canvasProp;
            var cropperWidth = $('.cropper-image').width() - 10,
            cropperheight = $('.cropper-image').height() - 12,
            imageObj = $("#target")[0], // Show image preview
            orgImgWidth = imageObj.naturalWidth,
            canvas = $("#canvas-crop-preview")[0],
            context = canvas.getContext("2d"),
            jcrop_api = '', // The variable jcrop_api will hold a reference to the -- // Jcrop API once Jcrop is instantiated.
            // imgRatio = (imageObj.naturalWidth - parseInt($(".cropper-image").width())),
            brightnessVal = $('#brightnessRange').val(),
            contrastVal = $('#contrastRange').val(),

            bright = document.getElementById('brightnessRange');
            bright.addEventListener('input', () => {
              // console.log(parseInt(bright.value, 10));
              brightness(parseInt((<HTMLInputElement>bright).value, 10));
            }, false);
            
            let con = document.getElementById('contrastRange');
            con.addEventListener('input', () => {
              console.log(parseFloat((<HTMLInputElement>con).value));
              contrast(parseFloat((<HTMLInputElement>con).value));
            }, false);
            
            let initJcrop = function() // The function is pretty simple
            {
              // Invoke Jcrop in typical fashion
              console.log(cropperWidth,cropperheight);
              $('#target').Jcrop({
                setSelect: [10,10,cropperWidth,cropperheight],
                allowSelect: false,
                onChange : showCoords,
                onSelect : updatePreview,
                // onRelease:  clearCoords
              },function(){
                jcrop_api = this;
                // jcrop_api.setSelect([10,10,cropperWidth,cropperheight]);
              });
            },
            updatePreview = function(c) {
              if(parseInt(c.w) > 0) {
                canvas.width = 300; //c.w
                canvas.height = (300*c.h)/c.w;
                r = orgImgWidth / $('.cropper-image').width();
                canvasProp = c;
                drawPreviewCanvas();
              }
            },
            brightness = function (amount) {
              brightnessVal = amount;
              $("#brightness-val").text((brightnessVal+100)/2);
              drawPreviewCanvas();
            },
            contrast = function (amount) {
              contrastVal = amount;
              $("#contrast-val").text(Math.floor(contrastVal*50));
              drawPreviewCanvas();
            },
            drawPreviewCanvas = function() {
              context.drawImage(imageObj, canvasProp.x*r, canvasProp.y*r, canvasProp.w*r, canvasProp.h*r, 0, 0, canvas.width, canvas.height);
              context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
              var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
              var pixelData = imgData.data; // original array modified, but canvas not updated
              /// no change, just exit
              // if (amount === 0) return;
              var brightnessVal1 = parseFloat(brightnessVal) || 0;
              for (var i = 0; i < pixelData.length; i += 4) {
                pixelData[i] += brightnessVal1;
                pixelData[i + 1] += brightnessVal1;
                pixelData[i + 2] += brightnessVal1
              }

              var contrastVal1 = (parseFloat(contrastVal) || 0);
              // console.log(contrastVal1)
              for (var i = 0; i < pixelData.length; i += 4) {
                pixelData[i] = ((((pixelData[i] / 255) - 0.5) * contrastVal1) + 0.5) * 255;
                pixelData[i + 1] = ((((pixelData[i + 1] / 255) - 0.5) * contrastVal1) + 0.5) * 255;
                pixelData[i + 2] = ((((pixelData[i + 2] / 255) - 0.5) * contrastVal1) + 0.5) * 255;
              }
              context.putImageData(imgData, 0, 0);
            },
            // getImage = function() {
            //   image.src = canvas.toDataURL();
            //   console.log(image.src)
            // },
            showCoords = function(c) // Simple event handler,called from onChange and onSelect // event handlers,as per the Jcrop invocation above
            {
              $('#x1').val(c.x);
              $('#y1').val(c.y);
              // $('#x2').val(c.x2);
              // $('#y2').val(c.y2);
              $('#w').val(c.w);
              $('#h').val(c.h);
            };
            $('#resetBtn').on('click', function() {
              (<HTMLInputElement>bright).value = '0';
              (<HTMLInputElement>con).value = '1';
              brightness(0);
              contrast(1);
              initJcrop();
            });
            
            $('#saveBtn').on('click', () => {
              canvas.src = canvas.toDataURL();
              this.personalData522EditedImageURL = canvas.src;
              console.log(canvas.src);
              console.log(this.personalData512SelectedImageId);
              this.consultasExternasService.personalData522EditedImage(this.appAccessToken, this.appUserToken, this.personalData512SelectedImageId,canvas.src)
              .subscribe(resp => {
                console.log(resp);
                if(resp.success === true) {
                  this.showSuccessErrorAlert = 1;
                  this.successErrorMessage = resp.message;
                  this.autoCloseSuccessErrorMsg();
                  this.hoursMenuClick(5.12, '.ribbon');
                }
              });
            });
            initJcrop();
          });
          
        });
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
      if(resp.success === true) {
        this.personalData54AgendasData = resp.agendas;
      }
      this.loadingAgendas = false;
    });
  }
  
  agendasOnChange(agendasValue) {
    this.showPreparingData = 1;
    this.selectedAgendasData = agendasValue;
    this.personalData5SelectedAgendasData = agendasValue;
    this.personalData51SelectedAgendasData = agendasValue;
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

  personalData57departmentOnChange(departmentId) {
    this.showPreparingData = 1;
    this.personalData57selectedDepartmentId = departmentId;
    this.personalData57PeticionListSelectedData = [];
    this.personalData57ShowAllPeticionList();
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
        // console.log(resp.malalt.id)
        this.addVisitFormGroup.controls["addVisitPetientId"].setValue(resp.malalt.id);
      }
    });
  }

  searchPetients() {
    this.consultasExternasService.searchPetientData(this.appAccessToken, this.appUserToken, this.patientLastName, this.patientMiddleName, this.patientFirstName)
    .subscribe(resp => {
      if(!(!resp.success)) {
        this.searchedPatientName = !(!resp.patient_list) && resp.patient_list.length > 0 ? resp.patient_list : [];
      }
    });
  }

  patientNameSelected(patientId) {
    if(typeof patientId !== 'undefined' && patientId != null && patientId != '' && !isNaN(patientId)) {
      this.consultasExternasService.getSelectedPatientData(this.appAccessToken, this.appUserToken, patientId)
      .subscribe(resp => {
        if(!(!resp.success)) { 
          this.malaltData = resp.patient_details;

          this.addVisitHour = $('#visit-time').val();
          this.addVisitFormGroup.controls["addVisitPetientId"].setValue(resp.patient_details.maid);
          this.addVisitFormGroup.controls["addVisitMutuaPrivadoRadio"].setValue(resp.patient_details.privat);
          this.addVisitFormGroup.controls["addVisitTelephono"].setValue(resp.patient_details.telefono);
          this.addVisitFormGroup.controls["addVisitComment"].setValue(resp.patient_details.observaciones);
          this.addVisitFormGroup.controls["addVisitMutuaList"].setValue(resp.patient_details.id_mutua);

          this.addVisitMutuaPrivadoRadio = resp.patient_details.privat;
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
    if(this.addVisitMutuaPrivadoRadio === '0') {
      if(this.addVisitMutuaList == '') {
        this.mutuaEditClass = true;
        return false;
      }
    }

    if(!this.forEdit) {
      this.consultasExternasService.addVisitPetientData(this.appAccessToken, this.appUserToken, formData, this.selectedAgendasData)
      .subscribe(resp => {
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
      this.showPreparingData = 0;
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
