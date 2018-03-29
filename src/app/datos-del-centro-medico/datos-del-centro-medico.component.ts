import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConfigs } from '../global.config';
import { DatosDelCentroMedicoService } from './datos-del-centro-medico.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-datos-del-centro-medico',
  templateUrl: './datos-del-centro-medico.component.html',
  styleUrls: ['./datos-del-centro-medico.component.css']
})
export class DatosDelCentroMedicoComponent implements OnInit {
  public appAccessToken: string = this.cookieService.get('accessToken');
  public appUserToken: string = this.cookieService.get('userToken');
  public medicalCenterData: any;
  public medicalCenterSavedSuccess: number = 2;
  public medicalCenterSavedSuccessMsg: string = '';

  public formGroup: FormGroup;
  public formCenterName: string = '';
  public formNif: string = '';
  public formResponsable: string = '';
  public formAddress: string = '';
  public formCip: string = '';
  public formPopulation: string = '';
  public formPhone: string = '';

  constructor(private _formBuilder: FormBuilder, private globalConfigs: GlobalConfigs, private datosDelCentroMedicoService: DatosDelCentroMedicoService, private cookieService: CookieService, public pageTitle: Title) {
    if(typeof this.appAccessToken === 'undefined' || this.appAccessToken == '') {
      window.location.href = this.globalConfigs.baseUrl + 'login';
    }
    this.pageTitle.setTitle('Datos Del Centro Medico | Medicloude');

    this.datosDelCentroMedicoService.getCenterData(this.appAccessToken, this.appUserToken)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.medicalCenterData = resp.center;

        this.formGroup.controls['formCenterName'].setValue(this.medicalCenterData.centro);
        this.formGroup.controls['formNif'].setValue(this.medicalCenterData.nif);
        this.formGroup.controls['formResponsable'].setValue(this.medicalCenterData.responsable);
        this.formGroup.controls['formAddress'].setValue(this.medicalCenterData.direccion);
        this.formGroup.controls['formCip'].setValue(this.medicalCenterData.cip);
        this.formGroup.controls['formPopulation'].setValue(this.medicalCenterData.poblacion);
        this.formGroup.controls['formPhone'].setValue(this.medicalCenterData.telefono);
      }
    });
    
    this.formGroup = _formBuilder.group({
      'formCenterName': [''],
      'formNif': [''],
      'formResponsable': [''],
      'formAddress': [''],
      'formCip': [''],
      'formPopulation': [''],
      'formPhone': ['']
    });
  }

  ngOnInit() {
  }

  addUpdateCenterSubmit(centerFormData) {
    this.datosDelCentroMedicoService.addUpdateMedicalCenterData(this.appAccessToken, this.appUserToken, centerFormData)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.medicalCenterSavedSuccess = 1;
        this.medicalCenterSavedSuccessMsg = resp.message;
      }
      else {
        this.medicalCenterSavedSuccess = 0;
      }
    });
  }

}
