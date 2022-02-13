export interface Tournoi {
  id?: string;
  nombreParticipants: number;
  date: Date;
  idGagnant: string | undefined;
}
