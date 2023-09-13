import { Meta } from "./meta";

export interface Destinazione extends Meta{

  contenutoPrincipale: string;
  contenutoSecondario: string;
  cityIds: number[];
}
