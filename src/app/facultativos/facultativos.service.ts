import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConfigs } from '../global.config';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';

@Injectable()
export class FacultativosService {

  constructor(private http: Http, private globalConfigs: GlobalConfigs, private cookieService: CookieService) { }
  
  getDoctorsListData(appAccessToken, appUserToken) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'get-doctors',
      fd
    )
    .map(
      (res: Response) => {
        if(typeof res.json().logged_out !== 'undefined' && res.json().logged_out === true) {
          window.location.href = this.globalConfigs.baseUrl + 'login';
          this.cookieService.delete('accessToken', '/');
          this.cookieService.delete('userToken', '/');
        }
        else {
          this.cookieService.set('accessToken', appAccessToken, 1, '/');
          this.cookieService.set('userToken', appUserToken, 1, '/');
        }
        return res.json();
      }
    )
  }
  
  loadSpecialistData(appAccessToken, appUserToken) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'load-metges',
      fd
    )
    .map(
      (res: Response) => {
        if(typeof res.json().logged_out !== 'undefined' && res.json().logged_out === true) {
          window.location.href = this.globalConfigs.baseUrl + 'login';
          this.cookieService.delete('accessToken', '/');
          this.cookieService.delete('userToken', '/');
        }
        else {
          this.cookieService.set('accessToken', appAccessToken, 1, '/');
          this.cookieService.set('userToken', appUserToken, 1, '/');
        }
        return res.json();
      }
    )
  }
  
  addDoctorData(appAccessToken, appUserToken, addDoctorsData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("doctor", addDoctorsData.formDoctor);
    fd.append("category", addDoctorsData.formEspecialidad);
    fd.append("collegiate", addDoctorsData.formCollegiate);
    fd.append("nif", addDoctorsData.formNif);
    fd.append("address", addDoctorsData.formAddress);
    fd.append("cip", addDoctorsData.formCip);
    fd.append("population", addDoctorsData.formPopulation);
    fd.append("phone", addDoctorsData.formTelefono);
    fd.append("email", addDoctorsData.formEmail);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-doctor',
      fd
    )
    .map(
      (res: Response) => {
        if(typeof res.json().logged_out !== 'undefined' && res.json().logged_out === true) {
          window.location.href = this.globalConfigs.baseUrl + 'login';
          this.cookieService.delete('accessToken', '/');
          this.cookieService.delete('userToken', '/');
        }
        else {
          this.cookieService.set('accessToken', appAccessToken, 1, '/');
          this.cookieService.set('userToken', appUserToken, 1, '/');
        }
        return res.json();
      }
    )
  }
  
  deleteDoctorData(appAccessToken, appUserToken, doctorId) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", doctorId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-doctor',
      fd
    )
    .map(
      (res: Response) => {
        if(typeof res.json().logged_out !== 'undefined' && res.json().logged_out === true) {
          window.location.href = this.globalConfigs.baseUrl + 'login';
          this.cookieService.delete('accessToken', '/');
          this.cookieService.delete('userToken', '/');
        }
        else {
          this.cookieService.set('accessToken', appAccessToken, 1, '/');
          this.cookieService.set('userToken', appUserToken, 1, '/');
        }
        return res.json();
      }
    )
  }
  
  getDoctorsDataToEdit(appAccessToken, appUserToken, doctorId) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", doctorId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'edit-doctor',
      fd
    )
    .map(
      (res: Response) => {
        if(typeof res.json().logged_out !== 'undefined' && res.json().logged_out === true) {
          window.location.href = this.globalConfigs.baseUrl + 'login';
          this.cookieService.delete('accessToken', '/');
          this.cookieService.delete('userToken', '/');
        }
        else {
          this.cookieService.set('accessToken', appAccessToken, 1, '/');
          this.cookieService.set('userToken', appUserToken, 1, '/');
        }
        return res.json();
      }
    )
  }
  
  updateDoctorData(appAccessToken, appUserToken, doctorId, addDoctorsData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("doctor_id", doctorId);
    fd.append("doctor", addDoctorsData.formDoctor);
    fd.append("category", addDoctorsData.formEspecialidad);
    fd.append("collegiate", addDoctorsData.formCollegiate);
    fd.append("nif", addDoctorsData.formNif);
    fd.append("address", addDoctorsData.formAddress);
    fd.append("cip", addDoctorsData.formCip);
    fd.append("population", addDoctorsData.formPopulation);
    fd.append("phone", addDoctorsData.formTelefono);
    fd.append("email", addDoctorsData.formEmail);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-doctor',
      fd
    )
    .map(
      (res: Response) => {
        if(typeof res.json().logged_out !== 'undefined' && res.json().logged_out === true) {
          window.location.href = this.globalConfigs.baseUrl + 'login';
          this.cookieService.delete('accessToken', '/');
          this.cookieService.delete('userToken', '/');
        }
        else {
          this.cookieService.set('accessToken', appAccessToken, 1, '/');
          this.cookieService.set('userToken', appUserToken, 1, '/');
        }
        return res.json();
      }
    )
  }

}
