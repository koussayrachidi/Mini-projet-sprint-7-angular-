import { Injectable } from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { Entreprise } from '../model/entreprise.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { EntrepriseWrapper } from '../model/entrepriseWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class JeuService {
  apiURLEnt: string = 'http://localhost:8080/jeux/ent';


  jeux! : Jeu[];
  jeu !: Jeu;
  entreprises! : Entreprise[];
  constructor(private http : HttpClient,
    private authService : AuthService) {/*
    this.entreprises= [
      {idEnt : 1, nomEnt : "riot games",nombreEmployes:50},
       {idEnt: 2, nomEnt : "valve",nombreEmployes:10}
    ];
    this.jeux = [
      {idJeu : 1, titre : "lol", taille : 50.2,niveauDifficulte: "easy", dateCreation : new Date("01/14/2011"),entreprise:{idEnt : 1, nomEnt : "riot games",nombreEmployes:50}},
      {idJeu : 2, titre : "cs", taille : 50,niveauDifficulte: "easy", dateCreation : new Date("12/17/2010"),entreprise:{idEnt: 2, nomEnt : "valve",nombreEmployes:10}},
      {idJeu : 3, titre :"valo", taille : 40,niveauDifficulte: "easy", dateCreation : new Date("02/20/2020"),entreprise:{idEnt : 1, nomEnt : "riot games",nombreEmployes:50}}
       ];*/
   }



    listeJeux(): Observable<Jeu[]>{
    
     
       return this.http.get<Jeu[]>(apiURL+"/all");
  
      }

      ajouterJeu( prod: Jeu):Observable<Jeu>{
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.post<Jeu>(apiURL+"/addjeu", prod, {headers:httpHeaders});
        }

        supprimerJeu(id : number) {
          const url = `${apiURL}/deljeu/${id}`;
           let jwt = this.authService.getToken();
           jwt = "Bearer "+jwt;
           let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
             return this.http.delete(url,  {headers:httpHeaders});
           }
        
        

          consulterJeu(id: number): Observable<Jeu> {
            const url = `${apiURL}/getbyid/${id}`;
            console.log(url);
            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
              return this.http.get<Jeu>(url,{headers:httpHeaders});
            }
          


updateJeu(prod:Jeu): Observable<Jeu>{
     let jwt = this.authService.getToken();
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
       return this.http.put<Jeu>(apiURL+"/updatejeu", prod, {headers:httpHeaders});
     }


trierJeux(){
  this.jeux = this.jeux.sort((n1,n2) => {
  if (n1.idJeu! > n2.idJeu!) {
  return 1;
  }
  if (n1.idJeu! < n2.idJeu!) {
  return -1;
  }
  return 0;
  });
  }
  
  
   
        listeEntreprises():Observable<EntrepriseWrapper>{
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return  this.http.get<EntrepriseWrapper>(this.apiURLEnt,{headers:httpHeaders});
          
              }     
        
      
    consulterEntreprise(id:number): Entreprise{
    return this.entreprises.find(cat => cat.idEnt == id)!;
    }

  
      rechercherParEntreprise(idEnt: number):Observable< Jeu[]> {
        const url = `${apiURL}/jeuxent/${idEnt}`;
        return this.http.get<Jeu[]>(url);
       } 
     

        rechercherParNom(titre: string):Observable< Jeu[]> {
          const url = `${apiURL}/jeuxByName/${titre}`;
          return this.http.get<Jeu[]>(url);
          }

        

          ajouterEntreprise( ent: Entreprise):Observable<Entreprise>{
            return this.http.post<Entreprise>(this.apiURLEnt, ent, httpOptions);
            }


            uploadImage(file: File, filename: string): Observable<any>{
              const imageFormData = new FormData();
              imageFormData.append('image', file, filename);
              const url = `${apiURL + '/image/upload'}`;
              return this.http.post(url, imageFormData);
              }
              loadImage(id: number): Observable<Image> {
              const url = `${apiURL + '/image/get/info'}/${id}`;
              return this.http.get<Image>(url);
              }
 
              uploadImageJeu(file: File, filename: string, idJeu:number): Observable<any>{
                const imageFormData = new FormData();
                imageFormData.append('image', file, filename);
                const url = `${apiURL + '/image/uplaodImageJeu'}/${idJeu}`;
                return this.http.post(url, imageFormData);
                }

                supprimerImage(id : number) {
                  const url = `${apiURL}/image/delete/${id}`;
                  return this.http.delete(url, httpOptions);
                  }
                  

}
