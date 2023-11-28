import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const toExclude = ["/login", "/register","/verify"];

    // Check if the request URL is in the exclusion list
    if (toExclude.some(endpoint => request.url.includes(endpoint))) {
      return next.handle(request);
    }

    // For other requests, add the authorization header
    const jwt = this.authService.getToken();
    const reqWithToken = request.clone({
      setHeaders: { Authorization: "Bearer " + jwt },
    });

    return next.handle(reqWithToken);
  }
}