import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../model/rating';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  votaAlloggio(rate:number, id:number):Observable<Rating>{
    return this.http.post<Rating>(`${environment.baseURL}ratings`, {rate: rate, alloggioId: id})
  }
}
