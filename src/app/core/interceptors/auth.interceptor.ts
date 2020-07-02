import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserDataStorageService} from '../services/user-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userData: UserDataStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.userData.getToken();

    if (token !== null) {
      const authorizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      // console.log(authorizedReq);
      return next.handle(authorizedReq);
    }
    // console.log(req);

    return next.handle(req);
  }
}
