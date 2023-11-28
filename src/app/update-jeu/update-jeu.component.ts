import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuService } from '../services/jeu.service';
import { Jeu } from '../model/jeu.model';
import { Entreprise } from '../model/entreprise.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-jeu',
  templateUrl: './update-jeu.component.html',
})
export class UpdateJeuComponent implements OnInit {
  currentJeu = new Jeu();
  entreprises! : Entreprise[];
  updatedEntId! : number;
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;
  
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private jeuService: JeuService) { }

  /*ngOnInit(): void {
    this.jeuService.listeEntreprises().
subscribe(cats => {this.entreprises = cats._embedded.entreprises;
console.log(cats);
});
this.jeuService.consulterJeu(this.activatedRoute.snapshot.params['id']).
subscribe( prod =>{ this.currentJeu = prod;
this.updatedEntId =this.currentJeu.entreprise.idEnt;


this.jeuService
.loadImage(this.currentJeu.image.idImage)
.subscribe((img: Image) => {
this.myImage = 'data:' + img.type + ';base64,' + img.image;
});
} ) ;
}*/

ngOnInit(): void {
  this.jeuService.listeEntreprises().
  subscribe(cats => {this.entreprises = cats._embedded.entreprises;
  });
  this.jeuService.consulterJeu(this.activatedRoute.snapshot.params['id'])
  .subscribe( prod =>{ this.currentJeu = prod;
  this.updatedEntId = prod.entreprise.idEnt;
  } ) ;
  console.log( this.myImage)
  
  }
  


  
  /*updateJeu()
{ this.currentJeu.entreprise = this.entreprises.find(cat => cat.idEnt == this.updatedEntId)!;
  this.jeuService.updateJeu(this.currentJeu).subscribe(prod => {
  this.router.navigate(['jeux']); }
  );

}*/


/*updateJeu() {
  this.currentJeu.entreprise = this.entreprises.find(cat => cat.idEnt ==
  this.updatedEntId)!;
  //tester si l'image du produit a été modifiée
  if (this.isImageUpdated)
  {
  this.jeuService
  .uploadImage(this.uploadedImage, this.uploadedImage.name)
  .subscribe((img: Image) => {
  this.currentJeu.image = img;
  this.jeuService
  .updateJeu(this.currentJeu)
  .subscribe((prod) => {
  this.router.navigate(['jeux']);
  });
  });
  }
  else{
  this.jeuService
  .updateJeu(this.currentJeu)
  .subscribe((prod) => {
  this.router.navigate(['jeux']);
  });
  }
  }*/

onImageUpload(event: any) {
  if(event.target.files && event.target.files.length) {
  this.uploadedImage = event.target.files[0];
  this.isImageUpdated =true;
  const reader = new FileReader();
  reader.readAsDataURL(this.uploadedImage);
  reader.onload = () => { this.myImage = reader.result as string; };
}
  }

  onAddImageJeu() {
    this.jeuService
    .uploadImageJeu(this.uploadedImage,
    this.uploadedImage.name,this.currentJeu.idJeu)
    .subscribe( (img : Image) => {
    this.currentJeu.images.push(img);
    });
    }

    updateJeu() {
      this.currentJeu.entreprise = this.entreprises.find(cat => cat.idEnt==
      this.updatedEntId)!;
      this.jeuService
      .updateJeu(this.currentJeu)
      .subscribe((prod) => {
      this.router.navigate(['jeux']);
      });
      }
  
      supprimerImage(img: Image){
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.jeuService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentJeu.images.indexOf(img, 0);
        if (index > -1) {
        this.currentJeu.images.splice(index, 1);
        }
        });
        }

}
