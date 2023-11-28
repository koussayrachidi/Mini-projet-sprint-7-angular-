import { Component, OnInit } from '@angular/core';
import { JeuService } from '../services/jeu.service';
import { Jeu } from '../model/jeu.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {
titre! : string;
jeux!: Jeu [];
allJeux! : Jeu [];
searchTerm! : string;
  constructor(private jeuService : JeuService) { }

  ngOnInit(): void {
    this.jeuService.listeJeux().subscribe(prods => {
      console.log(prods);
      this.jeux = prods;
      });
      
  }
  rechercherProds(){
    this.jeuService.rechercherParNom(this.titre).
    subscribe(prods => {
    this.jeux = prods;
    console.log(prods)});
    }
    onKeyUp(filterText : string){
      this.jeux = this.allJeux.filter(item =>
      item.titre.toLowerCase().includes(filterText));
      }

}
