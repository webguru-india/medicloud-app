import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConfigs } from '../global.config';
import 'rxjs/add/operator/map';
declare var $: any;

@Injectable()
export class LoginService {

  constructor(private http: Http, private globalConfigs: GlobalConfigs) { }
  
  validateLogInData(centerData, userNameData, passwordData) {
    let fd = new FormData();
    $('#ajax-data-loader').css('right', '0px');

    fd.append("center", centerData);
    fd.append("username", userNameData);
    fd.append("password", passwordData);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'authLogin',
      fd
    )
    .map(
      (res: Response) => {
        $('#ajax-data-loader').css('right', '-300px');
        return res.json()
      }
    )
  }

}