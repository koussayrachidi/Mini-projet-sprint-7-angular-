import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JeuxComponent } from './jeux/jeux.component';
import { AddJeuComponent } from './add-jeu/add-jeu.component';
import { UpdateJeuComponent } from './update-jeu/update-jeu.component';
import { RechercheParEntrepriseComponent } from './recherche-par-entreprise/recherche-par-entreprise.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeEntreprisesComponent } from './liste-entreprises/liste-entreprises.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { JeuGuard } from './jeu.guard';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

const routes: Routes = [
  { path: 'register', component: RegistrationFormComponent },
{ path: 'verification/:username', component: VerificationCodeComponent }, // Route with a parameter

  {path: "jeux", component : JeuxComponent},
  {path: "add-jeu", component : AddJeuComponent,  canActivate:[JeuGuard]},
  { path: "", redirectTo: "jeux", pathMatch: "full" },
  {path: "updateJeu/:id", component: UpdateJeuComponent},
  {path: "rechercheParEntreprise", component : RechercheParEntrepriseComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeEntreprises", component : ListeEntreprisesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
