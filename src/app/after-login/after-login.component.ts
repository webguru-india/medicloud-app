import { Component, OnInit } from '@angular/core';
import { GlobalConfigs } from '../global.config';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {
  public appAccessToken: string = '';
  public showSuccessErrorAlert: number = 0;
  public successErrorMessage: string = '';

  constructor(private cookieService: CookieService, private globalConfigs: GlobalConfigs) { }

  ngOnInit() {
    this.appAccessToken = this.cookieService.get('accessToken');
    console.log(this.appAccessToken);
    if(typeof this.appAccessToken === 'undefined' || this.appAccessToken == '') {
      window.location.href = this.globalConfigs.baseUrl + 'login';
    }

    $(window).scroll((e) => {
      $('.success-error-msg-wrapper').css('top', $(window).scrollTop() + $(window).height() - $('.success-error-msg-wrapper').outerHeight(true) - 25)
    })
  }

  closeSuccessErrorMsg() {
    this.showSuccessErrorAlert = 0;
  }

}
