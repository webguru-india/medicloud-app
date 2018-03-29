import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConfigs } from '../global.config';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';

@Injectable()
export class HorarioService {

  constructor(private http: Http, private globalConfigs: GlobalConfigs, private cookieService: CookieService) { }
  
  loadSpecialtyData(appAccessToken, appUserToken) {
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
  
  loadAgendasData(appAccessToken, appUserToken, specialtyValue) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("specialist", specialtyValue);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'load-agendas',
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
  
  getHoursData(appAccessToken, appUserToken, day, agenda) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("day", day);
    fd.append("agenda", agenda);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'get-hours',
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
  
  saveHoursData(appAccessToken, appUserToken, finalTimeIntervals, selectedDay, selectedAgendasData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("day", selectedDay);
    fd.append("hours", finalTimeIntervals);
    fd.append("agenda", selectedAgendasData);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-hours',
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
  
  deleteHoursData(appAccessToken, appUserToken, selectedHours, selectedDay, selectedAgendasData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("day", selectedDay);
    fd.append("hours", selectedHours);
    fd.append("agenda", selectedAgendasData);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-hours',
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
