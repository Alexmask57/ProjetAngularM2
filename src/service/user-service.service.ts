import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Participant} from "../models/Participant";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = "http://localhost:3000/api/user";   //url vers l'api

  constructor(private readonly http: HttpClient) { }

  /**
   * Récupère la liste de tout les participants
   */
  fetch(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.url);
  }

  /**
   * Récupère un participant à partir de son id
   * @param id id du participant
   */
  fetchOne(id: string): Observable<Participant> {
    return this.http.get<Participant>(this.url + '/' + id);
  }

  /**
   * Ajout d'un nouveau participant
   * nom et photo en base64
   * @param newParticipant objet Participant
   */
  create(newParticipant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.url, newParticipant);
  }

  /**
   * Met à jour un participant à partir de son id
   * nom et photo base64
   * @param updateParticipant objet Participant à mettre à jour
   */
  update(updateParticipant: Participant): Observable<Participant> {
    return this.http.put(this.url + '/' + updateParticipant.id, updateParticipant);
  }

  /**
   * Supprime un participant à partir de son id
   * le participant n'est pas réellement supprimé, on passe son champ "supprime" à vrai
   * le but est d'éviter un bug lors de l'affichage d'un participant supprimé dans un match
   * @param id id du participant à supprimer
   */
  delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  /**
   * Vérifie si un participant est dans un tournoi en cours, pour bloquer sa suppression
   * @param id id du participant à vérifier
   */
  checkOnTournoi(id: string): Observable<string> {
    return this.http.get<string>(this.url + '/onTournoi/' + id);
  }

}
