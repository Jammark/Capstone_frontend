import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs'; // Tipo particolare di Observable che richiede un valore iniziale ed emette in tempo reale il suo cambiamento di valore, desottoscrivendosi immediatamente dopo
import { JwtHelperService } from '@auth0/angular-jwt'; // Libreria per la lettura del token
import { tap, catchError } from 'rxjs/operators'; // Operatore utilizzato per manipolare il primo valore emesso da una chiamata
import { AuthData } from './auth-data.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; // Utilizzato per reindirizzare ad altra pagina dopo il logout

@Injectable({
    providedIn: 'root',
})
export class AuthService{
    jwtHelper = new JwtHelperService(); // Serve per leggere e validare il token
    baseURL = environment.baseURL;
    private authSubj = new BehaviorSubject<null | AuthData>(null); // Serve per comunicare in tempo reale all'applicazione la presenza dell'utente autenticato
    utente!: AuthData;

    user$ = this.authSubj.asObservable(); // La variabile di tipo BehaviourSubject che trasmetterà la presenza o meno dell'utente
    timeoutLogout: any;

    private msgSubj = new BehaviorSubject<null | string>(null);
    msg$ = this.msgSubj.asObservable();

    constructor(private http: HttpClient, private router: Router) {}


    login(data: { email: string; password: string }) {
        return this.http.post<AuthData>(`${this.baseURL}auth/login`, data).pipe(

            tap((data) => {
              console.log('login');
                console.log(data);
                this.authSubj.next(data);
                this.utente = data;
                console.log(this.utente);
                localStorage.setItem('user', JSON.stringify(data));
                this.autoLogout(data);
            }),
            catchError(this.errors)
        );
    }

    restore() {

        const user = localStorage.getItem('user');
        if (!user) {
            return;
        }
        const userData: AuthData = JSON.parse(user);
        if (this.jwtHelper.isTokenExpired(userData.accessToken)) {

            return;
        }
        this.authSubj.next(userData);
        this.autoLogout(userData);
    }

    signup(data: {
        name: string;
        username: string;
        email: string;
        password: string;
        phone: string;
        website: string;
    }) {
        return this.http.post(`${this.baseURL}auth/register`, data);
    }

    logout() {
      console.log('logout');
        this.authSubj.next(null);
        localStorage.removeItem('user');
        sessionStorage.removeItem('tmpUrl');
        this.router.navigate(['/']);
        if (this.timeoutLogout) {

            clearTimeout(this.timeoutLogout);
        }
    }

    autoLogout(data: AuthData) {
        const expirationDate = this.jwtHelper.getTokenExpirationDate(
            data.accessToken
        ) as Date;
        const expirationMilliseconds =
            expirationDate.getTime() - new Date().getTime();
        this.timeoutLogout = setTimeout(() => {
            this.logout();
            console.log('autologout');
        }, expirationMilliseconds);
    }

    private errors(err: any) {
        switch (err.error) {
            case 'Email already exists':
                return throwError('Utente già presente');
                break;

            case 'Email format is invalid':
                return throwError('Formato mail non valido');
                break;

            default:
                return throwError('Errore nella chiamata');
                break;
        }
    }

    register(msg:string):void{
      this.msgSubj.next(msg);
    }

    deregister():void{
      this.msgSubj.next(null);
    }
}
