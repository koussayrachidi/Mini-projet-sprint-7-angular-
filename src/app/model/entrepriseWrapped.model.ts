import { Entreprise } from './entreprise.model';
export class EntrepriseWrapper{
_embedded!: { entreprises: Entreprise[]};
}