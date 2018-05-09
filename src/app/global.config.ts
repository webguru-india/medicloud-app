import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfigs {
  // Development Variables Starts
  // apiBaseUrl: string = 'http://192.168.5.29:83/medicloud_app/';
  // baseUrl: string = 'http://192.168.5.37:4002/';
  // Development Variables Starts

  // // Production Variables Starts
  apiBaseUrl: string = 'https://medicfacturaapi.azurewebsites.net/';
  baseUrl: string = '/';
  // // Production Variables Starts
}