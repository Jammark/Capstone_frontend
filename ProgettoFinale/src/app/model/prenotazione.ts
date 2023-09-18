export interface Prenotazione {

  id:number | undefined;
  data:string;
  dataFine:string;
  numeroGiorni:number | undefined;
  metaId:number;
  userId:number | undefined;
  alloggioId:number;
  trasportoId:number;
  ritornoId:number;
  prezzo:number | undefined;
}
