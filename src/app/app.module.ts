import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './estructura/nav/nav.component';
import { AsideComponent } from './estructura/aside/aside.component';
import { ContentComponent } from './estructura/content/content.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { CategoriasComponent } from './modulos/categorias/categorias.component';
import { PresentacionDePruebasComponent } from './modulos/presentacion-de-pruebas/presentacion-de-pruebas.component';
import { ListadoDeElegiblesComponent } from './modulos/listado-de-elegibles/listado-de-elegibles.component';
import { CapacitacionesComponent } from './modulos/capacitaciones/capacitaciones.component';
import { JuridicaComponent } from './modulos/juridica/juridica.component';
import { RecursosHumanosComponent } from './modulos/recursos-humanos/recursos-humanos.component';
import { PreguntasFrecuentesComponent } from './modulos/preguntas-frecuentes/preguntas-frecuentes.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    ClientesComponent,
    CategoriasComponent,
    PresentacionDePruebasComponent,
    ListadoDeElegiblesComponent,
    CapacitacionesComponent,
    JuridicaComponent,
    RecursosHumanosComponent,
    PreguntasFrecuentesComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
