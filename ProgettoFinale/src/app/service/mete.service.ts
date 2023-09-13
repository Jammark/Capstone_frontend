import { Injectable } from '@angular/core';
import { Meta } from '../model/meta';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Città } from '../model/città';
import { environment } from 'src/environments/environment';
import { Destinazione } from '../model/destinazione';

@Injectable({
  providedIn: 'root'
})
export class MeteService {

  private metaSubj = new BehaviorSubject<null | Meta>(null);

  meta$ = this.metaSubj.asObservable();

  constructor(private http: HttpClient) { }

  getCittà():Observable<Città[]>{
    return this.http.get<Città[]>(`${environment.baseURL}meta/città`);
  }

  getCittàById(id:number):Observable<Città>{
    return this.http.get<Città>(`${environment.baseURL}meta/città/${id}`);
  }

  getDestinazioni():Observable<Destinazione[]>{
    return this.http.get<Destinazione[]>(`${environment.baseURL}meta/destinazioni`);
  }

  getDestinazioneById(id:number):Observable<Destinazione>{
    return this.http.get<Destinazione>(`${environment.baseURL}meta/destinazioni/${id}`);
  }

  getMostRatedCities():Observable<Città[]>{
    return this.http.get<Città[]>(`${environment.baseURL}meta/città/most_rated`);
  }

  getMostRatedDest():Observable<Destinazione[]>{
    return this.http.get<Destinazione[]>(`${environment.baseURL}meta/destinazioni/most_rated`);
  }

  getMetaImgUrl(meta:Meta):string{
      return `${environment.baseURL}meta/image/${meta.imgUrl}`;
  }
}
