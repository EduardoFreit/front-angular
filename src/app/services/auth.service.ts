import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(user: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, user).pipe(
      tap((response: LoginResponseDto) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('tokenType', response.tokenType);
        localStorage.setItem('expiresIn', response.expiresIn.toString());
        localStorage.setItem('user', JSON.stringify(response.user));
      }),
    );
  }
}
