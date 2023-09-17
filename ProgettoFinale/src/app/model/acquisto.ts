import { Prenotazione } from "./prenotazione";

export interface Acquisto {
  id:number;
  data:string;
  userId:number;
  prenotazioneId:number;
  prezzo:number;
  prenotazione:Prenotazione;
}
