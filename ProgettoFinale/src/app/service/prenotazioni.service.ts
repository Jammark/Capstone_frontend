import { Injectable } from '@angular/core';
import { Prenotazione } from '../model/prenotazione';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Acquisto } from '../model/acquisto';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  private trasportoSubj = new BehaviorSubject<null | Prenotazione>(null);

  trasporto$ = this.trasportoSubj.asObservable();


  constructor(private http: HttpClient) { }

  getSaldo():Observable<Prenotazione[]>{
    return this.http.get<Prenotazione[]>(`${environment.baseURL}prenotazioni/saldo`);
  }

  getRiepilogo():Observable<Acquisto[]>{
    return this.http.get<Acquisto[]>(`${environment.baseURL}prenotazioni/acquisti`);

  }

  getPacchetti(id:number):Observable<Prenotazione[]>{
    return this.http.get<Prenotazione[]>(`${environment.baseURL}prenotazioni/${id}`);
  }

  prenota(payload: Prenotazione):Observable<Prenotazione>{
    return this.http.post<Prenotazione>(`${environment.baseURL}prenotazioni`, payload);
  }

  acquista(p:Prenotazione):Observable<Acquisto>{
    return this.http.post<Acquisto>(`${environment.baseURL}prenotazioni/acquisti/${p.id}`, null);

  }
}
