import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubj = new BehaviorSubject<null | User>(null);


  user$ = this.userSubj.asObservable();

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.baseURL}users`);
  }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(`${environment.baseURL}users/${id}`);
  }

  salvaImmagineUtente(item: Partial<User>):Observable<boolean>{
    return this.http.patch<boolean>(`${environment.baseURL}users/${item.id}`, item);
  }

  upgrade(u:User):Observable<boolean>{
    return this.http.put<boolean>(`${environment.baseURL}users/upgrade/${u.id}`, {});
  }

  registra(item:User):void{
    this.userSubj.next(item);
  }

  hasWritePermission():boolean{
    return this.userSubj.getValue()?.ruolo == 'ADMIN';
  }
}
