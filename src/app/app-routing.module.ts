import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { GerenciaComponent } from './modulos/clientes/clientes.component';
import { OfertaComponent } from './modulos/categorias/categorias.component';
import { PresentacionDePruebasComponent } from './modulos/presentacion-de-pruebas/presentacion-de-pruebas.component';
import { ListadoDeElegiblesComponent } from './modulos/listado-de-elegibles/listado-de-elegibles.component';
import { CapacitacionesComponent } from './modulos/capacitaciones/capacitaciones.component';
import { JuridicaComponent } from './modulos/juridica/juridica.component';
import { RecursosHumanosComponent } from './modulos/recursos-humanos/recursos-humanos.component';
import { AreaComponent} from './modulos/preguntas-frecuentes/preguntas-frecuentes.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { validaruserGuard } from './guard/validaruser.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: PrincipalComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate:[validaruserGuard] },
      { path: 'Clientes', component: GerenciaComponent, canActivate:[validaruserGuard] },
      { path: 'Categorías', component: OfertaComponent, canActivate:[validaruserGuard] },
      { path: 'Presentación de pruebas',component: PresentacionDePruebasComponent, canActivate:[validaruserGuard]},
      { path: 'Listado de elegíbles', component: ListadoDeElegiblesComponent, canActivate:[validaruserGuard] },
      { path: 'Capacitaciones', component: CapacitacionesComponent, canActivate:[validaruserGuard] },
      { path: 'Jurídica', component: JuridicaComponent, canActivate:[validaruserGuard] },
      { path: 'Recursos humanos', component: RecursosHumanosComponent, canActivate:[validaruserGuard] },
      { path: 'Preguntas frecuentes', component: AreaComponent, canActivate:[validaruserGuard] },
    ],
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
