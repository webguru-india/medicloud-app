import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConfigs } from '../global.config';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public appAccessToken: string = this.cookieService.get('accessToken');
  public appUserToken: string = this.cookieService.get('userToken');

  public formGroup: FormGroup;
  public loginData: any;
  public formCenter: string = '';
  public formUserName: string = '';
  public formPassword: string = '';
  public notValid: number = 0;
  public loginSuccess: number = 2;
  public loginErrorMsg: string = '';

  constructor(private _formBuilder: FormBuilder, private globalConfigs: GlobalConfigs, private loginService: LoginService, private cookieService: CookieService, public pageTitle: Title) {
    if(typeof this.appAccessToken !== 'undefined' && this.appAccessToken != '') {
      window.location.href = this.globalConfigs.baseUrl + 'app/dashboard';
    }
    
    this.pageTitle.setTitle('Login | Medicloude');

    this.formGroup = _formBuilder.group({
      'formCenter': [null, Validators.required],
      'formUserName': [null, Validators.required],
      'formPassword': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  logInValidate(loginData) {
    let flag = 0;
    if(loginData.formCenter == '') {
      flag = 1;
    }
    if(loginData.formUserName == '') {
      flag = 1;
    }
    if(loginData.formPassword == '') {
      flag = 1;
    }

    if(flag == 1) {
      this.notValid = 1;
      return false;
    }

    this.formCenter = loginData.formCenter;
    this.formUserName = loginData.formUserName;
    this.formPassword = loginData.formPassword;

    this.loginService.validateLogInData(this.formCenter, this.formUserName, this.formPassword)
    .subscribe(resp => {
      if(!resp.success) {
        this.loginSuccess = 0;
        this.loginErrorMsg = resp.message;
      }
      else {
        this.loginSuccess = 1;
        let _that = this;
        this.cookieService.set('accessToken', resp.access_token, 1, '/');
        this.cookieService.set('userToken', resp.user, 1, '/');
        setTimeout(function() {
          window.location.href = _that.globalConfigs.baseUrl + 'app/dashboard';
        }, 2000);
      }
    });
  }

}
