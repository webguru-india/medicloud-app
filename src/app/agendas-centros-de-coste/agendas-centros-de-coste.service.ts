import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConfigs } from '../global.config';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';

@Injectable()
export class AgendasCentrosDeCosteService {

  constructor(private http: Http, private globalConfigs: GlobalConfigs, private cookieService: CookieService) { }
  
  getCostCenterData(appAccessToken, appUserToken) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'get-cost-center',
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
  
  addAgendaData(appAccessToken, appUserToken, addAgendaData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("nombre", addAgendaData.formNombre);
    fd.append("especialidad", addAgendaData.formCategory);
    fd.append("metges", addAgendaData.formMetges);
    fd.append("visitas", addAgendaData.formVisitas);
    fd.append("iva", addAgendaData.formIva);
    fd.append("procedim", addAgendaData.formProcedim);
    fd.append("irpf", addAgendaData.formIrpf);
    fd.append("cirugias", addAgendaData.formCirugias);
    fd.append("bloqueo", addAgendaData.formBloqueo);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-cost-center',
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
  
  getAgendaDataToEdit(appAccessToken, appUserToken, selectedAgendaId) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", selectedAgendaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'edit-cost-center',
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
  
  updateAgendaData(appAccessToken, appUserToken, agendaId, updateAgendaData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    fd.append("nombre", updateAgendaData.formNombre);
    fd.append("especialidad", updateAgendaData.formCategory);
    fd.append("metges", updateAgendaData.formMetges);
    fd.append("visitas", updateAgendaData.formVisitas);
    fd.append("iva", updateAgendaData.formIva);
    fd.append("procedim", updateAgendaData.formProcedim);
    fd.append("irpf", updateAgendaData.formIrpf);
    fd.append("cirugias", updateAgendaData.formCirugias);
    fd.append("bloqueo", updateAgendaData.formBloqueo);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-cost-center',
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
  
  deleteAgendaData(appAccessToken, appUserToken, agendaId) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-cost-center',
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
