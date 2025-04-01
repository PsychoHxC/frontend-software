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
import { GerenciaComponent } from './modulos/clientes/clientes.component';
import { OfertaComponent } from './modulos/categorias/categorias.component';
import { PresentacionDePruebasComponent } from './modulos/presentacion-de-pruebas/presentacion-de-pruebas.component';
import { ListadoDeElegiblesComponent } from './modulos/listado-de-elegibles/listado-de-elegibles.component';
import { CapacitacionesComponent } from './modulos/capacitaciones/capacitaciones.component';
import { JuridicaComponent } from './modulos/juridica/juridica.component';
import { RecursosHumanosComponent } from './modulos/recursos-humanos/recursos-humanos.component';
import { AreaComponent } from './modulos/preguntas-frecuentes/preguntas-frecuentes.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CrearSolicitudComponent } from './modulos/preguntas-frecuentes/crear-solicitud/crear-solicitud.component';
import { CrearOfertaComponent } from './modulos/clientes/crear-oferta/crear-oferta.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogModule } from 'src/app/confirm-dialog/confirm-dialog.module';
import { VerOfertaComponent } from './modulos/categorias/ver-oferta/ver-oferta.component';
import { AplicarOfertaComponent } from './modulos/categorias/aplicar-oferta/aplicar-oferta.component';
import { RegistroComponent } from './registro/registro.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    GerenciaComponent,
    PresentacionDePruebasComponent,
    ListadoDeElegiblesComponent,
    CapacitacionesComponent,
    JuridicaComponent,
    RecursosHumanosComponent,
    AreaComponent,
    LoginComponent,
    NotFoundComponent,
    CrearSolicitudComponent,
    CrearOfertaComponent,
    OfertaComponent,
    VerOfertaComponent,
    AplicarOfertaComponent,
    RegistroComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule, 
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ConfirmDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
