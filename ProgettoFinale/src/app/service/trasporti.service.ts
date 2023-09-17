import { Injectable } from '@angular/core';
import { Trasporto } from '../model/trasporto';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Volo } from '../model/volo';
import { environment } from 'src/environments/environment';
import { Tratta } from '../model/tratta';

@Injectable({
  providedIn: 'root'
})
export class TrasportiService {

  private trasportoSubj = new BehaviorSubject<null | Trasporto>(null);

  trasporto$ = this.trasportoSubj.asObservable();


  constructor(private http: HttpClient) { }

  cercaVoli( partenza: string, arrivo:string, data:string):Observable<Volo[]>{
    let url = new URL(`${environment.baseURL}trasporti/voli/cerca`);

      url.searchParams.append('partenza', `${partenza}`);


      url.searchParams.append('arrivo', `${arrivo}`);


      url.searchParams.append('data', data);



    return this.http.get<Volo[]>(url.toString());
  }

  getVoloById(id:number):Observable<Volo>{
    return this.http.get<Volo>(`${environment.baseURL}trasporti/voli/${id}`)
  }

  cercaTratte( partenza: string, arrivo:string, data:string):Observable<Tratta[]>{
    let url = new URL(`${environment.baseURL}trasporti/tratte/cerca`);

      url.searchParams.append('partenza', `${partenza}`);


      url.searchParams.append('arrivo', `${arrivo}`);


      url.searchParams.append('data', data);



    return this.http.get<Tratta[]>(url.toString());
  }
}
