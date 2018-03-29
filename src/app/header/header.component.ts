import { Component, OnInit } from '@angular/core';
import { GlobalConfigs } from '../global.config';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private globalConfigs: GlobalConfigs, private cookieService: CookieService) { }

  ngOnInit() {
  }

  signoutFunc() {
    this.cookieService.delete('accessToken', '/');
    this.cookieService.delete('userToken', '/');
    window.location.href = this.globalConfigs.baseUrl + 'login';
  }

}
