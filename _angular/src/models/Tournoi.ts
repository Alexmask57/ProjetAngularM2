import {Match} from "./Match";

export interface Tournoi {
  id: string;
  date: Date;
  etat: string | undefined;
  nbParticipants: string;
}

export interface TournoiDetail {
  id?: string;
  date: Date;
  etat: string | undefined;
  nbParticipants: string;
  combats: Match[];
}
