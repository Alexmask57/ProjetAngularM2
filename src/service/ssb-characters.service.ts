import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Character} from "../models/Character";



@Injectable({
  providedIn: 'root'
})
export class SsbCharactersService {

  //pour éviter des problemes de cors
  //on redirige le lien de l'api des personnages de smash vers notre propore api
  //voir proxy.conf.json
  private url = "http://localhost:4200/api"

  constructor(private readonly http: HttpClient) { }

  /**
   * Récupère la liste de l'ensemble des personnages
   */
  fetch(): Observable<Character[]> {
    return this.http.get<Character[]>(this.url);
  }

  /**
   * Récupère un personnage à partir de son nom
   * @param name nom du personnage
   */
  fetchOne(name: string): Observable<Character> {
    return this.http.get<Character>(this.url + "/" + name);
  }

}
