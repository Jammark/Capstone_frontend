import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Logging interceptor: ' + request);
let req = request.clone({ url: decodeURI(request.url)});
    return next.handle(req).pipe(tap(richiesta => {
      console.table(richiesta);
    }));
  }
}
