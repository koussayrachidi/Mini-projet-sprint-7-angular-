import { Entreprise } from "./entreprise.model";
import { Image } from "./image.model";

export class Jeu {
    idJeu! : number;
    titre! : string;
    taille! : number;
    niveauDifficulte! : string;
    dateCreation! : Date ;
    entreprise! : Entreprise;
    image! : Image;
    imageStr!:string;


    images!: Image[];

    }