import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultativosComponent } from './facultativos/facultativos.component';
import { AgendasCentrosDeCosteComponent } from './agendas-centros-de-coste/agendas-centros-de-coste.component';
import { DatosDelCentroMedicoComponent } from './datos-del-centro-medico/datos-del-centro-medico.component';
import { HorarioComponent } from './horario/horario.component';
import { ConsultasExternasComponent } from './consultas-externas/consultas-externas.component';
import { ConsultasExternasBkpComponent } from './consultas-externas-bkp/consultas-externas-bkp.component';

import { GlobalConfigs } from './global.config';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login/login.service';
import { FacultativosService } from './facultativos/facultativos.service';
import { AgendasCentrosDeCosteService } from './agendas-centros-de-coste/agendas-centros-de-coste.service';
import { DatosDelCentroMedicoService } from './datos-del-centro-medico/datos-del-centro-medico.service';
import { HorarioService } from './horario/horario.service';
import { ConsultasExternasService } from './consultas-externas/consultas-externas.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AsideNavComponent,
    AfterLoginComponent,
    DashboardComponent,
    FacultativosComponent,
    AgendasCentrosDeCosteComponent,
    DatosDelCentroMedicoComponent,
    HorarioComponent,
    ConsultasExternasComponent,
    ConsultasExternasBkpComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    GlobalConfigs,
    CookieService,
    LoginService,
    FacultativosService,
    AgendasCentrosDeCosteService,
    DatosDelCentroMedicoService,
    HorarioService,
    ConsultasExternasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
