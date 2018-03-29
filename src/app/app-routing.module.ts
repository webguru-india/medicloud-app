import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultativosComponent } from './facultativos/facultativos.component';
import { AgendasCentrosDeCosteComponent } from './agendas-centros-de-coste/agendas-centros-de-coste.component';
import { DatosDelCentroMedicoComponent } from './datos-del-centro-medico/datos-del-centro-medico.component';
import { HorarioComponent } from './horario/horario.component';
import { ConsultasExternasComponent } from './consultas-externas/consultas-externas.component';
import { ConsultasExternasBkpComponent } from './consultas-externas-bkp/consultas-externas-bkp.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: AfterLoginComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'facultativos', component: FacultativosComponent },
      { path: 'agendas-centros-de-coste', component: AgendasCentrosDeCosteComponent },
      { path: 'datos-del-centro-medico', component: DatosDelCentroMedicoComponent },
      { path: 'horario', component: HorarioComponent },
      { path: 'consultas-externas', component: ConsultasExternasComponent },
      { path: 'consultas-externas-bkp', component: ConsultasExternasBkpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
