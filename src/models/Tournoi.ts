import {Match} from "./Match";

export interface Tournoi {
  id?: string;
  date: Date;
  etat: string | undefined;
}

export interface TournoiDetail {
  id?: string;
  date: Date;
  etat: string | undefined;
  combats: Match[];
}
