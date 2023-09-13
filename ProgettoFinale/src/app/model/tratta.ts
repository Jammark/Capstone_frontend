import { Trasporto } from "./trasporto";

export interface Tratta extends Trasporto{
  nomeAzienda:string;
  partenzaId:number;
  arrivoId:number;
}
