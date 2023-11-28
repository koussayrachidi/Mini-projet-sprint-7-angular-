import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JeuxComponent } from './jeux/jeux.component';
import { AddJeuComponent } from './add-jeu/add-jeu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateJeuComponent } from './update-jeu/update-jeu.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RechercheParEntrepriseComponent } from './recherche-par-entreprise/recherche-par-entreprise.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListeEntreprisesComponent } from './liste-entreprises/liste-entreprises.component';
import { UpdateEntrepriseComponent } from './update-entreprise/update-entreprise.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TokenInterceptor } from './services/token.interceptor';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

@NgModule({
  declarations: [
    AppComponent,
    JeuxComponent,
    AddJeuComponent,
    UpdateJeuComponent,
    RechercheParEntrepriseComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeEntreprisesComponent,
    UpdateEntrepriseComponent,
    LoginComponent,
    ForbiddenComponent,
    RegistrationFormComponent,
    VerificationCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule

  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
