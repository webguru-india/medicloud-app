import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConfigs } from '../global.config';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';
declare var $: any;

@Injectable()
export class ConsultasExternasService {

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
  
  loadMutuasData(appAccessToken, appUserToken) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'load-mutuas',
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
  
  savePetientData(appAccessToken, appUserToken, formData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("last_name", formData.formNewPatientLastName);

    if(typeof formData.formNewPatientMiddleName !== 'undefined' && formData.formNewPatientMiddleName != '' && formData.formNewPatientMiddleName != null) {
      fd.append("second_last_name", formData.formNewPatientMiddleName);
    }

    fd.append("name", formData.formNewPatientFirstName);

    if(typeof formData.formNewPatientAddress !== 'undefined' && formData.formNewPatientAddress != '' && formData.formNewPatientAddress != null) {
      fd.append("address", formData.formNewPatientAddress);
    }

    fd.append("telephone", formData.formNewPatientTelephone);

    if(typeof formData.formNewPatientDni !== 'undefined' && formData.formNewPatientDni != '' && formData.formNewPatientDni != null) {
      fd.append("identity_number", formData.formNewPatientDni);
    }

    if(typeof formData.formNewPatientPopulation !== 'undefined' && formData.formNewPatientPopulation != '' && formData.formNewPatientPopulation != null) {
      fd.append("city", formData.formNewPatientPopulation);
    }

    if(typeof formData.formNewPatientpostalCode !== 'undefined' && formData.formNewPatientpostalCode != '' && formData.formNewPatientpostalCode != null) {
      fd.append("zip", formData.formNewPatientpostalCode);
    }

    if(typeof formData.formNewPatientNota !== 'undefined' && formData.formNewPatientNota != '' && formData.formNewPatientNota != null) {
      fd.append("comments", formData.formNewPatientNota);
    }

    if(typeof formData.formNewPatientMutuaPrivadoRadio !== 'undefined' && formData.formNewPatientMutuaPrivadoRadio != '' && formData.formNewPatientMutuaPrivadoRadio != null) {
      fd.append("private", formData.formNewPatientMutuaPrivadoRadio);
    }

    if(typeof formData.formNewPatientMutuaText !== 'undefined' && formData.formNewPatientMutuaText != '' && formData.formNewPatientMutuaText != null && formData.formNewPatientMutuaPrivadoRadio == 0) {
      fd.append("insurance_id", formData.formNewPatientMutuaText);
    }

    if(typeof formData.formNewPatientBirthday !== 'undefined' && formData.formNewPatientBirthday != '' && formData.formNewPatientBirthday != null) {
      let dob = new Date(formData.formNewPatientBirthday),
          formattedDob = dob.getFullYear() + '-' + ('0'+(dob.getMonth()+1)).slice(-2) + '-' + dob.getDate();
      fd.append("dateofbirth", formattedDob);
    }

    if(typeof formData.formNewPatientSmsMobile !== 'undefined' && formData.formNewPatientSmsMobile != '' && formData.formNewPatientSmsMobile != null) {
      if(!formData.formNewPatientSmsMobile) {
        fd.append("'is_sms_allowed", '0');
      }
      else {
        fd.append("'is_sms_allowed", '1');
      }
    }

    if(typeof formData.formNewPatientSmsMobileText !== 'undefined' && formData.formNewPatientSmsMobileText != '' && formData.formNewPatientSmsMobileText != null && !(!formData.formNewPatientSmsMobile)) {
      fd.append("sms_number", formData.formNewPatientSmsMobileText);
    }

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-patient',
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

  searchPetientData(appAccessToken, appUserToken, patientLastName, patientMiddleName, patientFirstName) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    
    if(typeof patientFirstName !== 'undefined' && patientFirstName != null && patientFirstName != '') {
      fd.append('surname', patientFirstName);
    }
    if(typeof patientMiddleName !== 'undefined' && patientMiddleName != null && patientMiddleName != '') {
      fd.append('second_surname', patientMiddleName);
    }
    if(typeof patientLastName !== 'undefined' && patientLastName != null && patientLastName != '') {
      fd.append('first_name', patientLastName);
    }

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'search-patients',
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

  getSelectedPatientData(appAccessToken, appUserToken, patientId) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    
    if(typeof patientId !== 'undefined' && patientId != null && patientId != '' && !isNaN(patientId)) {
      fd.append('id', patientId);
    }

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'get-patients-details',
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
  
  addVisitPetientData(appAccessToken, appUserToken, visitData, agendaData) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("patient_id", visitData.addVisitPetientId);
    if(visitData.addVisitMutuaPrivadoRadio == 0) {
      fd.append("mutual_id", visitData.addVisitMutuaList);
    }
    fd.append("is_private", visitData.addVisitMutuaPrivadoRadio);
    fd.append("phone_number", visitData.addVisitTelephono);
    fd.append("type_of_visits", visitData.addVisitVisitType);
    fd.append("hours", visitData.addVisitHour);
    fd.append("date", visitData.addVisitDate);
    fd.append("agenda", agendaData);
    fd.append("comment", visitData.addVisitComment);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-visit',
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
  
  visitorsListData(appAccessToken, appUserToken, visitDate, agendaData) {
    let fd = new FormData();
    $('#ajax-data-loader').css('right', '0px');
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("selected_date", visitDate);
    fd.append("agenda_id", agendaData);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'visit-list',
      fd
    )
    .map(
      (res: Response) => {
        $('#ajax-data-loader').css('right', '-300px');
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
  
  deleteVisit(appAccessToken, appUserToken, vid, selectedDate, agendaId) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", vid);
    fd.append("selected_date", selectedDate);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-visit',
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
  
  loadVisitForEditData(appAccessToken, appUserToken, selectedVisit) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", selectedVisit[0]);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'edit-visit',
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
  
  changeDateData(appAccessToken, appUserToken, agendaId, changeVisitDate, changeVisitDay) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    fd.append("selected_date", changeVisitDate);
    fd.append("selected_day", changeVisitDay);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'change-of-date',
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
  
  setChangeVisitDate(appAccessToken, appUserToken, changeVisitDate, changeVisitTime, selectedVisit) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("forced", '1');
    fd.append("visit_date", changeVisitDate);
    fd.append("visit_time", changeVisitTime);
    fd.append("visit_id", selectedVisit);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'visit-time-change',
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
  
  getConfirmVisitData(appAccessToken, appUserToken, selectedVisitorId) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", selectedVisitorId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'confirm-visit',
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
  
  updatePatientVisit(appAccessToken, appUserToken, visitId, patientId, privat, mutualId, typeOfVisitId, amount, noCharge) {
    let fd = new FormData();
    
    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("visit_id", visitId);
    fd.append("patient_id", patientId);
    fd.append("private", privat);
    fd.append("mutual_id", mutualId);
    fd.append("type_of_visit_id", typeOfVisitId);
    fd.append("amount", amount);
    fd.append("no_charge", noCharge);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'update-patient-visit',
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
  
  updatePatientVisitData(appAccessToken, appUserToken, visitData, agendaData, selectedVisit) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("visit_id", selectedVisit);
    fd.append("patient_id", visitData.addVisitPetientId);
    if(visitData.addVisitMutuaPrivadoRadio == 0) {
      fd.append("mutual_id", visitData.addVisitMutuaList);
    }
    fd.append("is_private", visitData.addVisitMutuaPrivadoRadio);
    fd.append("vtel", visitData.addVisitTelephono);
    fd.append("vtip", visitData.addVisitVisitType);
    fd.append("hours", visitData.addVisitHour);
    fd.append("date", visitData.addVisitDate);
    fd.append("agenda", agendaData);
    fd.append("comment", visitData.addVisitComment);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'update-visit',
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
  
  getQuirofanoData(appAccessToken, appUserToken, agendaData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaData);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'load-clinics',
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
  
  getInstrumentista(appAccessToken, appUserToken, agendaData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaData);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'load-instrumentista',
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
  
  personalData54GetPrivatMutualData(appAccessToken, appUserToken, agendaData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaData);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'load-mutua-by-agenda',
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
  
  personalData54GetProcessListData(appAccessToken, appUserToken, agendaData, mutuasData) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaData);
    fd.append("mutual_id", mutuasData);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'list-process',
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
  
  personalData54ProcessListBorrar(appAccessToken, appUserToken, selectedProcessArr) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", selectedProcessArr);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-process',
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
  
  personalData55GrabberData(appAccessToken, appUserToken, insetOrUpdate, agendaId, codigo, nameOfTheProcedure, mutualId, privat, qx, rate, cma, ucias, ayudante, perayuda, processId) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("new", insetOrUpdate);
    if(insetOrUpdate == 0) {
      fd.append("id", processId);
    }
    fd.append("agenda_id", agendaId);
    fd.append("codigo", codigo);
    fd.append("name_of_the_procedure", nameOfTheProcedure);
    fd.append("mutual_id", mutualId);
    fd.append("private", privat);
    fd.append("qx", qx);
    fd.append("rate", rate);
    fd.append("cma", cma);
    fd.append("ucias", ucias);
    fd.append("ayudante", ayudante);
    fd.append("perayuda", perayuda);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-process',
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
  
  personalData53IntervencionesList(appAccessToken, appUserToken, agendaId, malaltId, isPrivado) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    fd.append("malalt_id", malaltId);
    fd.append("patient_mutual", isPrivado);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'intervenciones-list',
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
  
  personalData53AcceptSelectedInterventions(appAccessToken, appUserToken, actosId, selectedIndex, isPrivado, previousDataArr) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("actos_id", actosId);
    fd.append("button_index", selectedIndex);
    fd.append("private", isPrivado);
    fd.append("list_process", JSON.stringify(previousDataArr));

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'accept-interventions',
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
  
  personalData52FormSave(appAccessToken, appUserToken, formValue, interventionList, agendaId, privat, petientId, personalData52TotalTarifa) {
    let fd = new FormData(),
        interventionIdArr = [],
        tarifaArr = [];

    for(let i=0; i<interventionList.length; i++) {
      if(!isNaN(interventionList[i].actos_id)) {
        interventionIdArr.push(interventionList[i].actos_id);
        tarifaArr.push(interventionList[i].vtarifa);
      }
    }

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("intervention_id", interventionIdArr.toString());
    fd.append("tarifa", tarifaArr.toString()); // nombre
    // fd.append("qx_id", '1');
    fd.append("new", '1');
    fd.append("ayudante", formValue.personalData52Assintant);
    fd.append("instrumentista", formValue.personalData52Instrumentalist);
    fd.append("expenses", formValue.personalData52Expenses);
    fd.append("anesthesia", formValue.personalData52TypeOfDiagonsis);
    fd.append("private", privat);
    fd.append("agenda_id", agendaId);
    if(typeof formValue.personalDataWithoutDate === 'undefined' || !formValue.personalDataWithoutDate) {
      formValue.personalDataWithoutDate = 0;
    }
    else {
      formValue.personalDataWithoutDate = 1;
    }
    fd.append("sin_fetcha", formValue.personalDataWithoutDate);
    if(formValue.personalDataWithoutDate == 0) {
      fd.append("date", formValue.personalData52datePickerValue);
    }
    fd.append("patient_id", petientId);
    fd.append("time_of_the_day", formValue.personalData52TimePickerValue);
    fd.append("quirofano", formValue.personalData52Quirofano);
    fd.append("observation", formValue.personalData52Observation);
    fd.append("diagnosis", formValue.personalData52Diagonsis);
    fd.append("gastos", formValue.personalData52Expenses);
    fd.append("mutual_id", formValue.personalData52Mutual);
    fd.append("type_of_intervencion", formValue.personalData52TypeOfIntervention);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-qx',
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
  
  getPersonalData51WithOrWithoutSchedule(appAccessToken, appUserToken, agendaId, dateVal) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    fd.append("date", dateVal);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'list-pqx',
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
  
  loadPersonalData5(appAccessToken, appUserToken, agendaId, patientId, personalData5AllAgendasCheckbox) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("patient_id", patientId);
    if(!personalData5AllAgendasCheckbox) {
      fd.append("agenda_id", agendaId);
    }

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'load-clinic-history',
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
  
  setPersonalData5ToWriteData(appAccessToken, appUserToken, agendaId, patientId, course) {
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("course", course);
    fd.append("patient_id", patientId);
    fd.append("user_name", "Static Test User");
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-clinic-history',
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

  getPreviousActivityData(appAccessToken, appUserToken, patientId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("patient_id", patientId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'previous-activity',
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

  saveDiagnosticData(appAccessToken, appUserToken, agendaId, diagnosticData){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    fd.append("diagnostic", diagnosticData);
    // fd.append("diagnostic_id", diagnosticId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-diagnostic',
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

  modifyDiagnosticData(appAccessToken, appUserToken, agendaId, diagnosticData, diagnosticId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    fd.append("diagnostic", diagnosticData);
    fd.append("diagnostic_id", diagnosticId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-diagnostic',
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

  borrarDiagnosticData(appAccessToken, appUserToken, diagnosticId, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", diagnosticId);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-diagnostic',
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

  personalData56ShowAllDiagnosticData(appAccessToken, appUserToken, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'show-all-diagnostic',
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

  personalData56SelectDiagnosticGrabar(appAccessToken, appUserToken, diagnosticId, patientId, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("diagnostic_id", diagnosticId);
    fd.append("patient_id", patientId);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'assign-diagnostic',
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

  personalData56ShowAssignDiagnosticList(appAccessToken, appUserToken, showAll, agendaId, patientId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("show_all", showAll);
    fd.append("agenda_id", agendaId);
    fd.append("patient_id", patientId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'show-assign-diagnostic',
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

  personalData56SelectDiagnosticDeleted(appAccessToken, appUserToken, diagnosticId, patientId, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("diagnostic_id", diagnosticId);
    fd.append("patient_id", patientId);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-assign-diagnostic',
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

  personalData56SelectDiagnosticEditGrabar(appAccessToken, appUserToken, diagnosticId, patientId, assignedDiagnosticId, showAll, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("diagnostic_id", diagnosticId);
    fd.append("patient_id", patientId);
    fd.append("id", assignedDiagnosticId);
    fd.append("show_all", showAll);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'assign-diagnostic',
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

  personalData57DepartmentSave(appAccessToken, appUserToken, departmentName, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("department", departmentName);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-department',
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

  personalData57DepartmentModificar(appAccessToken, appUserToken, departmentId, departmentName, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("department_id", departmentId);
    fd.append("department", departmentName);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-department',
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

  personalData57DepartmentDelete(appAccessToken, appUserToken, departmentId, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", departmentId);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-department',
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

  personalData57ShowDepartment(appAccessToken, appUserToken, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);

    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'show-department',
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

  personalData57PruebaAnadirGrabar(appAccessToken, appUserToken, departmentId, pruebaText, peticionText, agendaId, plantillaNo){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("department_id", departmentId);
    fd.append("prueba", pruebaText);
    fd.append("peticion", peticionText);
    fd.append("agenda_id", agendaId);
    fd.append("plantilla", plantillaNo);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-peticions',
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

  personalData57ShowPeticionList(appAccessToken, appUserToken, departmentId, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("department_id", departmentId);
    fd.append("agenda_id", agendaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'show-peticions',
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

  personalData57PruebaModificarGrabar(appAccessToken, appUserToken, departmentId, pruebaText, peticionText, agendaId, plantillaNo, peticionId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("department_id", departmentId);
    fd.append("prueba", pruebaText);
    fd.append("peticion", peticionText);
    fd.append("agenda_id", agendaId);
    fd.append("plantilla", plantillaNo);
    fd.append("peticion_id", peticionId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-peticions',
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

  personalData57PruebaBorrar(appAccessToken, appUserToken, peticionId, departmentId, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("id", peticionId);
    fd.append("department_id", departmentId);
    fd.append("agenda_id", agendaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-peticions',
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

  personalData57AssignPeticions(appAccessToken, appUserToken, peticionId, usuario, patientId, agendaId, texto, hasPeticion){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("peticion_id", peticionId);
    fd.append("usuario", usuario);
    fd.append("patient_id", patientId);
    fd.append("agenda_id", agendaId);
    fd.append("texto", texto);
    fd.append("has_peticion", hasPeticion);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'assign-peticions',
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

  personalData57ListPeticons(appAccessToken, appUserToken, today, patientId, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("today", today);
    fd.append("patient_id", patientId);
    fd.append("agenda_id", agendaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'list-peticions',
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

  personalData517PatologiaGrabar(appAccessToken, appUserToken, patologia, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("patologia", patologia);
    fd.append("agenda_id", agendaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-patologia',
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

  personalData517PatologiaList(appAccessToken, appUserToken, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'list-patologia',
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

  personalData517PatologiaModificar(appAccessToken, appUserToken, patologia, agendaId, Id){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("patologia", patologia);
    fd.append("agenda_id", agendaId);
    fd.append("id", Id);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-patologia',
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

  personalData517PatologiaBorrar(appAccessToken, appUserToken, agendaId, patologiaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("agenda_id", agendaId);
    fd.append("patologia_id", patologiaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'delete-patologia',
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

  saveRecetasData(appAccessToken, appUserToken, patologia, farmaco, tratamiento, agendaId, posologia, unidades, pauta){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("patologia", patologia);
    fd.append("farmaco", farmaco);
    fd.append("tratamiento", tratamiento);
    fd.append("agenda_id", agendaId);
    fd.append("posologia", posologia);
    fd.append("unidades", unidades);
    fd.append("pauta", pauta);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'save-recetas',
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

  personalData515RecetasList(appAccessToken, appUserToken, patologiaId, agendaId){
    let fd = new FormData();

    fd.append("access_token", appAccessToken);
    fd.append("user_token", appUserToken);
    fd.append("patologia", patologiaId);
    fd.append("agenda_id", agendaId);
    
    return this.http.post(
      this.globalConfigs.apiBaseUrl + 'list-recetas',
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
