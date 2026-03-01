import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const reqCloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(reqCloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.clearStorage();
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        }),
      );
    }
    return next.handle(req);
  }

  private clearStorage(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('user');
  }
}
