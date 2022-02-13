import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Participant} from "../models/Participant";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = "http://localhost:3000/api/user";

  constructor(private readonly http: HttpClient) { }

  fetch(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.url);
  }

  fetchOne(id: string): Observable<Participant> {
    return this.http.get<Participant>(this.url + '/' + id);
  }

  create(newParticipant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.url, newParticipant);
  }

  update(updateParticipant: Participant): Observable<Participant> {
    return this.http.put(this.url + '/' + updateParticipant.id, updateParticipant);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

}
