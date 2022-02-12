import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Character {
  order?: string;
  name?: string;
  availability?: string;
  alsoAppearsIn?: string[];
  images?: {
    icon?: string | ArrayBuffer | null;
    portrait?: string | ArrayBuffer | null;
  }
  series?: {
    icon?: string | ArrayBuffer | null;
    name?: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SsbCharactersService {

  private url = "https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters"

  constructor(private readonly http: HttpClient) { }

  fetch(): Observable<Character[]> {
    return this.http.get<Character[]>(this.url);
  }

  //TODO gerer erreur API
  fetchOne(name: string): Observable<Character> {
    return this.http.get<Character>(this.url + "/" + name);
  }

}
