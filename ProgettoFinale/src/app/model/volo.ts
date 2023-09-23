import { Aereoporto } from "./aereoporto";
import { Trasporto } from "./trasporto";

export interface Volo extends Trasporto{
  compagnia:string;
  partenzaId:number;
  arrivoId:number;
  stopId:number;
  partenza: Aereoporto;
  arrivo: Aereoporto;
  posti:number;
}
