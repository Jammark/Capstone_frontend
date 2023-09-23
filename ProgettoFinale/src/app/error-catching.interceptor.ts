import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, filter, throwError } from 'rxjs';
import { AuthService } from './components/auth/auth.service';
import { ErrorPayload } from './model/error-payload';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private srv: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.srv.deregister();
     return next.handle(request)
    .pipe(
    //  filter(event => !request.url.endsWith('login')),
          catchError((error: HttpErrorResponse) => {
             let errorMsg = '';
             if (error.error instanceof ErrorEvent) {
                console.log('This is client side error');
                errorMsg = `Error: ${error.error.message}`;
             } else {
                console.log('This is server side error');
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
             }
             console.log(errorMsg);
             if(!request.url.endsWith('login')){
              const payload: ErrorPayload = error.error;
              this.srv.register(payload.message);
             }

             return throwError(errorMsg);
          })
    )
  }
}
