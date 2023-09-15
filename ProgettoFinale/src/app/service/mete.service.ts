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

  private metaSubj = new BehaviorSubject<null | Città | Destinazione>(null);

  meta$ = this.metaSubj.asObservable();
/*
  private cittàSubj = new BehaviorSubject<null | Città>(null);

  città$ = this.cittàSubj.asObservable();

  private destinazioneSubj = new BehaviorSubject<null | Destinazione>(null);

  destinazione$ = this.destinazioneSubj.asObservable();
*/
  constructor(private http: HttpClient) { }

  getCittà():Observable<Città[]>{
    return this.http.get<Città[]>(`${environment.baseURL}mete/città`);
  }

  getCittàById(id:number):Observable<Città>{
    return this.http.get<Città>(`${environment.baseURL}mete/città/${id}`);
  }

  getDestinazioni():Observable<Destinazione[]>{
    return this.http.get<Destinazione[]>(`${environment.baseURL}mete/destinazioni`);
  }

  getDestinazioneById(id:number):Observable<Destinazione>{
    return this.http.get<Destinazione>(`${environment.baseURL}mete/destinazioni/${id}`);
  }

  getMostRatedCities():Observable<Città[]>{
    return this.http.get<Città[]>(`${environment.baseURL}mete/${'città'}/most_rated`);
  }

  getMostRatedDest():Observable<Destinazione[]>{
    return this.http.get<Destinazione[]>(`${environment.baseURL}mete/destinazioni/most_rated`);
  }

  getMetaImgUrl(meta:Meta):string{
      return `${environment.baseURL}mete/image/${meta.imgUrl}`;
  }

  register(item:Città | Destinazione):void{
    this.metaSubj.next(item);
  }

  deregister():void{
    this.metaSubj.next(null);
  }
/*
  registerCittà(item:Città):void{
    this.cittàSubj.next(item);
  }

  deregisterCittà():void{
    this.cittàSubj.next(null);
  }

  registerDest(item:Destinazione):void{
    this.destinazioneSubj.next(item);
  }

  deregisterDest():void{
    this.destinazioneSubj.next(null);
  }
  */
}
