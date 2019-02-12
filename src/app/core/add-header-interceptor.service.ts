import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`AddHeaderInterceptor - ${req.url}`);
    const authReq = req.clone({
      setHeaders: { 'Content-Type': 'appliction/json' }
    });
    return next.handle(authReq);
  }
}
