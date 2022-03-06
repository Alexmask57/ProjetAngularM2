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
}
