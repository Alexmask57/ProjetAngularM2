export interface Match {
  id?: string;
  idUser1: string;
  idUser2: string;
  idChar1: string | undefined;
  idChar2: string | undefined;
  winner: string | undefined;
  niveau: string;
  idTournoi: string;
  idParent: string | undefined;
  bracketNo: string;
  children: Match[] | undefined;
}
