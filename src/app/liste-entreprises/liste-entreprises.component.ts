import { Component, OnInit } from '@angular/core';
import { JeuService } from '../services/jeu.service';
import { Entreprise } from '../model/entreprise.model';

@Component({
  selector: 'app-liste-entreprises',
  templateUrl: './liste-entreprises.component.html',
})
export class ListeEntreprisesComponent implements OnInit {
  entreprises! : Entreprise[];
  updatedEnt:Entreprise = {"idEnt":0,"nomEnt":"","nombreEmployes":0};
  ajout:boolean=true;

  constructor(private jeuService: JeuService) { }

  ngOnInit(): void {
    this.chargerEntreprises();

  }

  chargerEntreprises(){
    this.jeuService.listeEntreprises().
    subscribe(cats => {this.entreprises = cats._embedded.entreprises;
    console.log(cats);
    });
    }

  entrepriseUpdated(ent:Entreprise){
    console.log("entreprise recue du composant updatedentreprise",ent);
    this.jeuService.ajouterEntreprise(ent).subscribe( ()=> this.chargerEntreprises());
  }

  updateEnt(ent:Entreprise) {
    this.updatedEnt=ent;
    this.ajout=false; 

    }


}
