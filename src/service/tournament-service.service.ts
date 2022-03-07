import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tournoi, TournoiDetail} from "../models/Tournoi";

@Injectable({
  providedIn: 'root'
})
export class TournamentServiceService {

  private url = "http://localhost:3000/api/tournament";

  constructor(private readonly http: HttpClient) { }

  fetch(): Observable<Tournoi[]> {
    return this.http.get<Tournoi[]>(this.url);
  }

  fetchOne(id: string): Observable<TournoiDetail> {
    return this.http.get<TournoiDetail>(this.url + '/' + id);
  }

  create(newTournoi: Tournoi): Observable<Tournoi> {
    return this.http.post<Tournoi>(this.url, newTournoi);
  }

  update(updateTournoi: Tournoi): Observable<Tournoi> {
    return this.http.put<Tournoi>(this.url + '/' + updateTournoi.id, updateTournoi);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  setWinner(idM: string, idWinner: string): Observable<any> {
    return this.http.put(this.url + '/winner/' + idM, {"winner": idWinner});
  }
}
