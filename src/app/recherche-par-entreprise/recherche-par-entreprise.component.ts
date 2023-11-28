import { Component, OnInit } from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { JeuService } from '../services/jeu.service';
import { Entreprise } from '../model/entreprise.model';

@Component({
  selector: 'app-recherche-par-entreprise',
  templateUrl: './recherche-par-entreprise.component.html',
})
export class RechercheParEntrepriseComponent implements OnInit {
  IdEntreprise! : number;
  jeux! : Jeu[];
  entreprises! : Entreprise[];

  constructor(private jeuService : JeuService) { }

  ngOnInit(): void {
    this.jeuService.listeEntreprises().
subscribe(cats => {this.entreprises = cats._embedded.entreprises;
console.log(cats);

  });}

  onChange() {
    this.jeuService.rechercherParEntreprise(this.IdEntreprise).subscribe(prods =>{this.jeux=prods});
    }
}
