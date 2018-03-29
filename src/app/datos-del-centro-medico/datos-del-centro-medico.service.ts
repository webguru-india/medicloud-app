import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConfigs } from '../global.config';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';

@Injectable()
export class DatosDelCentroMedicoService {

  constructor(private http: Http, private globalConfigs: GlobalConfigs, private cookieService: CookieService) { }
  
  getCenterData(appAccessToken, appUserToken) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'get-medical-center',
      fd
    )
    .map(
      (res: Response) => {
        console.log(res)
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
  
  addUpdateMedicalCenterData(appAccessToken, appUserToken, addUpdateMedicalCenterData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("center_name", addUpdateMedicalCenterData.formCenterName);
    fd.append("nif", addUpdateMedicalCenterData.formNif);
    fd.append("responsable", addUpdateMedicalCenterData.formResponsable);
    fd.append("address", addUpdateMedicalCenterData.formAddress);
    fd.append("cip", addUpdateMedicalCenterData.formCip);
    fd.append("population", addUpdateMedicalCenterData.formPopulation);
    fd.append("phone", addUpdateMedicalCenterData.formPhone);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-medical-center',
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
