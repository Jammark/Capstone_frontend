import { Injectable } from '@angular/core';
import { Alloggio } from '../model/alloggio';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../model/hotel';
import { environment } from 'src/environments/environment';
import { Appartamento } from '../model/appartamento';

@Injectable({
  providedIn: 'root'
})
export class AlloggiService {

  private alloggioSubj = new BehaviorSubject<null | Alloggio>(null);

  alloggio$ = this.alloggioSubj.asObservable();

  constructor(private http: HttpClient) { }

  getHotels():Observable<Hotel[]>{
    return this.http.get<Hotel[]>(`${environment.baseURL}alloggi/hotels`);
  }

  getHotelById(id:number):Observable<Hotel>{
    return this.http.get<Hotel>(`${environment.baseURL}alloggi/hotels/${id}`);
  }

  getHotelsByMeta(id:number):Observable<Hotel[]>{
    return this.http.get<Hotel[]>(`${environment.baseURL}alloggi/hotels/meta/${id}`);
  }

  getAppartamenti():Observable<Appartamento[]>{
    return this.http.get<Appartamento[]>(`${environment.baseURL}alloggi/appartamenti`);
  }

  getAppartamentoById(id:number):Observable<Appartamento>{
    return this.http.get<Appartamento>(`${environment.baseURL}alloggi/appartamenti/${id}`);
  }

  getAppartamentiByMeta(id:number):Observable<Appartamento[]>{
    return this.http.get<Appartamento[]>(`${environment.baseURL}alloggi/appartamenti/meta/${id}`);
  }

  getMetaImgUrl(a:Alloggio):string{
    return `${environment.baseURL}alloggi/image/${a.urlImmagine}`;
}
}
