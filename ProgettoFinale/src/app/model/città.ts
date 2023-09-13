import { Destinazione } from "./destinazione";
import { Meta } from "./meta";


export interface Città extends Meta{

  destinazione: Destinazione;
}
