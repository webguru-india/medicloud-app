import { Component, OnInit, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConfigs } from '../global.config';
import { FacultativosService } from './facultativos.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';
declare var $: any;
declare var initApp: any;
declare var modal: any;

@Component({
  selector: 'app-facultativos',
  templateUrl: './facultativos.component.html',
  styleUrls: ['./facultativos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FacultativosComponent implements OnInit {
  public appAccessToken: string = this.cookieService.get('accessToken');
  public appUserToken: string = this.cookieService.get('userToken');
  public doctorsListData: any;
  public specialistData: any;
  public selectedDoctor: any = [];
  public addEditDoctorModalIndication: number = 0;
  
  public formGroup: FormGroup;
  public addDoctorsData: any;
  public formDoctor: string = '';
  public formEspecialidad: string = '';
  public formCollegiate: string = '';
  public formNif: string = '';
  public formAddress: string = '';
  public formCip: string = '';
  public formPopulation: string = '';
  public formTelefono: string = '';
  public formEmail: string = '';
  public formFirmaBrowse: string = '';
  public formFirma: string = '';
  public doctorAddedSuccess: number = 2;
  public doctorAddedSuccessMsg: string = '';

  public selectAllChkBx: boolean = false;

  constructor(private _formBuilder: FormBuilder, private globalConfigs: GlobalConfigs, private facultativosService: FacultativosService, private cookieService: CookieService, public pageTitle: Title) {
    if(typeof this.appAccessToken === 'undefined' || this.appAccessToken == '') {
      window.location.href = this.globalConfigs.baseUrl + 'login';
    }
    this.pageTitle.setTitle('Facultivos | Medicloude');

    this.facultativosService.getDoctorsListData(this.appAccessToken, this.appUserToken)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.doctorsListData = resp.metges;
      }
    });

    this.facultativosService.loadSpecialistData(this.appAccessToken, this.appUserToken)
    .subscribe(resp => {
      // console.log(resp);
      // if(resp.success === true) {
      //   this.doctorsListData = resp.metges;
      // }
      this.specialistData = resp.especialidad;
    });


    this.formGroup = _formBuilder.group({
      'formDoctor': [null, Validators.required],
      'formEspecialidad': [null, Validators.required],
      'formCollegiate': [null],
      'formNif': [null],
      'formAddress': [null],
      'formCip': [null],
      'formPopulation': [null],
      'formTelefono': [null],
      'formEmail': [null],
      'formFirmaBrowse': [null],
      'formFirma': [null]
    });
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // initApp.leftNav();
  }

  dismissAlert() {
    this.doctorAddedSuccess = 2;
  }

  addDoctorSubmit(addDoctorsData) {
    this.facultativosService.addDoctorData(this.appAccessToken, this.appUserToken, addDoctorsData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.doctorAddedSuccess = 1;
        this.doctorAddedSuccessMsg = resp.message;
        
        this.doctorsListData = resp.doctor_list;
        this.selectAllChkBx = false;

        $('#Anadir').modal('hide');
      }
      else {
        this.doctorAddedSuccess = 0;
      }
    });
  }

  deleteDoctor() {
    if(this.selectedDoctor.length == 0) {
      return false;
    }

    this.facultativosService.deleteDoctorData(this.appAccessToken, this.appUserToken, this.selectedDoctor)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.doctorAddedSuccess = 1;
        this.doctorAddedSuccessMsg = resp.message;

        this.doctorsListData = resp.doctor_list;
        this.selectedDoctor = [];
        this.selectAllChkBx = false;
      }
      else {
        this.doctorAddedSuccess = 0;
        this.doctorAddedSuccessMsg = resp.message;
      }

      $('#Borrar').modal('hide');
    });
  }

  getEditDoctorData() {
    this.facultativosService.getDoctorsDataToEdit(this.appAccessToken, this.appUserToken, this.selectedDoctor)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.formGroup.controls['formDoctor'].setValue(resp.doctor_data.medico);
        this.formGroup.controls['formEspecialidad'].setValue(resp.doctor_data.Especialitat);
        this.formGroup.controls['formCollegiate'].setValue(resp.doctor_data.N_colegiat);
        this.formGroup.controls['formNif'].setValue(resp.doctor_data.Nif);
        this.formGroup.controls['formAddress'].setValue(resp.doctor_data.direccion);
        this.formGroup.controls['formCip'].setValue(resp.doctor_data.Cip);
        this.formGroup.controls['formPopulation'].setValue(resp.doctor_data.Poblacion);
        this.formGroup.controls['formTelefono'].setValue(resp.doctor_data.Telefono);
        this.formGroup.controls['formEmail'].setValue(resp.doctor_data.email);
        this.formGroup.controls['formFirmaBrowse'].setValue(resp.doctor_data.firma);
        this.formGroup.controls['formFirma'].setValue(resp.doctor_data.firma);

        this.addEditDoctorModalIndication = 1;
        $('#Anadir').modal('show');
      }
      else {
        this.doctorAddedSuccess = 0;
      }
    });
  }
  
  updateDoctorSubmit(addDoctorsData) {
    this.facultativosService.updateDoctorData(this.appAccessToken, this.appUserToken, this.selectedDoctor, addDoctorsData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.doctorAddedSuccess = 1;
        this.doctorAddedSuccessMsg = resp.message;
        
        this.doctorsListData = resp.doctor_list;
        this.selectAllChkBx = false;

        $('#Anadir').modal('hide');
      }
      else {
        this.doctorAddedSuccess = 0;
      }
    });
  }

  selectAllCheckboxClicked() {
    if(typeof this.doctorsListData !== 'undefined') {
      this.selectedDoctor = [];
      for (var i = 0; i < this.doctorsListData.length; i++) {
        this.doctorsListData[i].selectedDoctor = this.selectAllChkBx;
        if(!(!this.selectAllChkBx)) {
          this.selectedDoctor.push(this.doctorsListData[i].id)
        }
      }
    }
    console.log(this.selectedDoctor)
  }

  checkIfAllSelected(targetElem) {
    this.selectAllChkBx = this.doctorsListData.every(function(item:any) {
      return item.selectedDoctor == true;
    })
    if(targetElem.checked == true) {
      this.selectedDoctor.push(parseInt(targetElem.value));
    }
    else {
      console.log(this.selectedDoctor.indexOf(parseInt(targetElem.value)))
      this.selectedDoctor.splice(this.selectedDoctor.indexOf(parseInt(targetElem.value)), 1)
    }
    console.log(this.selectedDoctor)
  }

}
