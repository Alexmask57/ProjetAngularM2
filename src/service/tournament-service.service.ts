import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tournoi, TournoiDetail} from "../models/Tournoi";
import {Stats} from "../models/Stats";
import {Participant} from "../models/Participant";

@Injectable({
  providedIn: 'root'
})
export class TournamentServiceService {

  private url = "http://localhost:3000/api/tournament"; //url vers l'api

  constructor(private readonly http: HttpClient) { }

  /**
   * Récupère la liste de tout les tournois
   * sans les détails des combats
   */
  fetch(): Observable<Tournoi[]> {
    return this.http.get<Tournoi[]>(this.url);
  }

  /**
   * Récupère uniquement les tournois en cours
   * sans les détails des combats
   */
  fetchOpen(): Observable<Tournoi[]> {
    return this.http.get<Tournoi[]>(this.url + '/open');
  }

  /**
   * Récupère un tournoi avec l'ensemble de ses combats associés
   * @param id id du match à récupérer
   */
  fetchOne(id: string): Observable<TournoiDetail> {
    return this.http.get<TournoiDetail>(this.url + '/' + id);
  }

  /**
   * Permet de créer un tournoi
   * Crée la structure des matchs avec la liste des participants associés
   * @param listeParticipants liste des participants
   */
  create(listeParticipants: Participant[]): Observable<Tournoi> {
    let structParticipants: any = [];
    listeParticipants.forEach(p => {
      structParticipants.push({"idParticipant": p.id});
    });

    return this.http.post<Tournoi>(this.url, {"participants": structParticipants});
  }

  /**
   * Permet de mettre à jour les infos d'un tournoi à partir de son id
   * date, état et nbParticipants
   * @param updateTournoi objet Tournoi à mettre à jour
   */
  update(updateTournoi: Tournoi): Observable<Tournoi> {
    return this.http.put<Tournoi>(this.url + '/' + updateTournoi.id, updateTournoi);
  }

  /**
   * Permet de supprimer un tournoi avec tout ses matchs associés
   * @param id id du match à supprimer
   */
  delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  /**
   * Permet de définir le gagnant d'un combat
   * Met à jour automatiquement le tournoi pour compléter le match suivant
   * Passe l'état du tournoi à terminé le cas échéant
   * @param idM id du Match
   * @param idWinner id du gagnant
   */
  setWinner(idM: string, idWinner: string): Observable<any> {
    return this.http.put(this.url + '/winner/' + idM, {"winner": idWinner});
  }

  /**
   * Permet de mettre à jour les personnages choisis pour un match
   * @param idM id du Match
   * @param char1 nom du personnage du J1
   * @param char2 nom du personnage du J2
   */
  setCharacters(idM: string, char1: string, char2: string) {
    return this.http.put(this.url + '/personnages/' + idM, {"char1": char1, "char2": char2});
  }

  /**
   * Permet de retourner les statistiques de victoires par match et par tournoi pour l'ensemble des participants
   */
  getStats(): Observable<Stats> {
    return this.http.get<Stats>(this.url + '/stats');
  }
}
