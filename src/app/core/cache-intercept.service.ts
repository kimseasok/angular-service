import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { HttpCacheService } from './http-cache.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptorService implements HttpInterceptor {
  constructor(private cacheService: HttpCacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // pass along none validate cache
    if (req.method !== 'GET') {
      console.log(`Invalidate cache: ${req.method} ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    // Attemd to retrieve cache response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    // return cache response

    if (cachedResponse) {
      console.log(`Retrieve a cache response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    // send the request to the server and response to the cache
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`Adding item to cache ${req.url}`);
          this.cacheService.put(req.url, event);
        }
      })
    );
  }
}
