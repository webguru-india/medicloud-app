import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConfigs } from '../global.config';
import { AgendasCentrosDeCosteService } from './agendas-centros-de-coste.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';
declare var $: any;
declare var modal: any;

@Component({
  selector: 'app-agendas-centros-de-coste',
  templateUrl: './agendas-centros-de-coste.component.html',
  styleUrls: ['./agendas-centros-de-coste.component.css']
})
export class AgendasCentrosDeCosteComponent implements OnInit {
  public appAccessToken: string = this.cookieService.get('accessToken');
  public appUserToken: string = this.cookieService.get('userToken');
  public costCenterListData: any;
  public especialidadData: any;
  public metgesData: any;
  public selectedAgenda: number;
  public addAgendaModalIndication: number = 0;
  public agendaAddedSuccess: number = 2;
  public agendaAddedSuccessMsg: string = '';
  
  public formGroup: FormGroup;
  public formNombre: string = '';
  public formCategory: string = '';
  public formMetges: string = '';
  public formVisitas: string = '';
  public formIva: string = '';
  public formProcedim: string = '';
  public formIrpf: string = '';
  public formCirugias: string = '';
  public formBloqueo: boolean = false;

  public selectedAgendas: any = [];
  public selectAllChkBx: boolean = false;

  constructor(private _formBuilder: FormBuilder, private globalConfigs: GlobalConfigs, private agendasCentrosDeCosteService: AgendasCentrosDeCosteService, private cookieService: CookieService, public pageTitle: Title) {
    if(typeof this.appAccessToken === 'undefined' || this.appAccessToken == '') {
      window.location.href = this.globalConfigs.baseUrl + 'login';
    }
    
    this.pageTitle.setTitle('Agendas Centros De Coste | Medicloude');

    this.agendasCentrosDeCosteService.getCostCenterData(this.appAccessToken, this.appUserToken)
    .subscribe(resp => {
      // console.log(resp);
      if(resp.success === true) {
        this.costCenterListData = resp.agendas;
        this.especialidadData = resp.especialidad;
        this.metgesData = resp.metges;
      }
    });

    this.formGroup = _formBuilder.group({
      'formNombre': [null, Validators.required],
      'formCategory': [null, Validators.required],
      'formMetges': [null, Validators.required],
      'formVisitas': [''],
      'formIva': [''],
      'formProcedim': [''],
      'formIrpf': [''],
      'formCirugias': [''],
      'formBloqueo': [false]
    });
  }

  ngOnInit() {
  }
  
  dismissAlert() {
    this.agendaAddedSuccess = 2;
  }

  addAgendaSubmit(addAgendaData) {
    this.agendasCentrosDeCosteService.addAgendaData(this.appAccessToken, this.appUserToken, addAgendaData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.agendaAddedSuccess = 1;
        this.agendaAddedSuccessMsg = resp.message;
        
        this.costCenterListData = resp.agendas;
        this.selectAllChkBx = false;

        $('#Anadir').modal('hide');
      }
      else {
        this.agendaAddedSuccess = 0;
      }
    });
  }
  
  getAgendaData() {
    this.addAgendaModalIndication = 1;
    this.agendasCentrosDeCosteService.getAgendaDataToEdit(this.appAccessToken, this.appUserToken, this.selectedAgendas)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.formGroup.controls['formNombre'].setValue(resp.agendas.metge);
        this.formGroup.controls['formCategory'].setValue(resp.agendas.especialitat);
        this.formGroup.controls['formMetges'].setValue(resp.agendas.medico);
        this.formGroup.controls['formVisitas'].setValue(resp.agendas.per_visita == null ? '' : resp.agendas.per_visita);
        this.formGroup.controls['formIva'].setValue(resp.agendas.iva == null ? '' : resp.agendas.iva);
        this.formGroup.controls['formProcedim'].setValue(resp.agendas.per_proc == null ? '' : resp.agendas.per_proc);
        this.formGroup.controls['formIrpf'].setValue(resp.agendas.irpf == null ? '' : resp.agendas.irpf);
        this.formGroup.controls['formCirugias'].setValue(resp.agendas.per_qx == null ? '' : resp.agendas.per_qx);
        this.formGroup.controls['formBloqueo'].setValue(resp.agendas.bloqueo);

        console.log(this.addAgendaModalIndication)
        $('#Anadir').modal('show');
      }
      else {
        this.agendaAddedSuccess = 0;
      }
    });
  }
  
  updateAgendaSubmit(updateAgendaData) {
    this.agendasCentrosDeCosteService.updateAgendaData(this.appAccessToken, this.appUserToken, this.selectedAgendas, updateAgendaData)
    .subscribe(resp => {
      console.log(resp);
      if(resp.success === true) {
        this.agendaAddedSuccess = 1;
        this.agendaAddedSuccessMsg = resp.message;
        
        this.costCenterListData = resp.agendas;
        this.selectAllChkBx = false;

        $('#Anadir').modal('hide');
      }
      else {
        this.agendaAddedSuccess = 0;
      }
    });
  }
  
  deleteAgenda() {
    this.agendasCentrosDeCosteService.deleteAgendaData(this.appAccessToken, this.appUserToken, this.selectedAgendas)
    .subscribe(resp => {
      // console.log(resp);

      $('#Borrar').modal('hide');

      if(resp.success === true) {
        this.agendaAddedSuccess = 1;
        this.agendaAddedSuccessMsg = resp.message;

        this.costCenterListData = resp.agendas;
        this.selectedAgendas = null;
        this.selectAllChkBx = false;
      }
      else {
        this.agendaAddedSuccess = 0;
      }
    });
  }
  
  selectAllCheckboxClicked() {
    if(typeof this.costCenterListData !== 'undefined') {
      this.selectedAgendas = [];
      for (var i = 0; i < this.costCenterListData.length; i++) {
        this.costCenterListData[i].selectedAgendas = this.selectAllChkBx;
        if(!(!this.selectAllChkBx)) {
          this.selectedAgendas.push(this.costCenterListData[i].ID)
        }
      }
    }
    console.log(this.selectedAgendas)
  }

  checkIfAllSelected(targetElem) {
    this.selectAllChkBx = this.costCenterListData.every(function(item:any) {
      return item.selectedAgendas == true;
    })
    if(targetElem.checked == true) {
      this.selectedAgendas.push(parseInt(targetElem.value));
    }
    else {
      // console.log(this.selectedAgendas.indexOf(parseInt(targetElem.value)))
      this.selectedAgendas.splice(this.selectedAgendas.indexOf(parseInt(targetElem.value)), 1)
    }
    // console.log(this.selectedAgendas)
  }

}
