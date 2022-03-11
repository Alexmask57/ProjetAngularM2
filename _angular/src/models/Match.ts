import {Participant} from "./Participant";

export interface Match {
  id?: string;
  participant1: Participant | undefined;
  participant2: Participant | undefined;
  personnage1: {
    id: string;
    nom: string;
  } | undefined;
  personnage2: {
    id: string;
    nom: string;
  } | undefined;
  winner: string;
  niveau: string;
  idTournoi: string;
  idParent: string | undefined;
  bracketNo: string;
  children: Match[] | undefined;
}
