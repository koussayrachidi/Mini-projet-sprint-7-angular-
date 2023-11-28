import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entreprise } from '../model/entreprise.model';

@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.component.html',
})
export class UpdateEntrepriseComponent implements OnInit {
  @Input()
  entreprise! : Entreprise;

  @Input()
ajout!:boolean;

  @Output()
  entrepriseUpdated = new EventEmitter<Entreprise>();
  

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateEntreprise ",this.entreprise);

  }
  saveEntreprise(){
    this.entrepriseUpdated.emit(this.entreprise);
    }
    

}
