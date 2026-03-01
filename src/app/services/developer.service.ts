import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeveloperRequestDto } from '../dto/developer-request.dto';
import { DeveloperResponseDto } from '../dto/developer-response.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DeveloperService {
  private readonly baseUrl = `${environment.apiUrl}/developers`;

  constructor(private http: HttpClient) {}

  findAll(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(`${this.baseUrl}`, { params: httpParams });
  }

  findById(id: number): Observable<DeveloperResponseDto> {
    return this.http.get<DeveloperResponseDto>(`${this.baseUrl}/${id}`);
  }

  create(request: DeveloperRequestDto): Observable<DeveloperResponseDto> {
    return this.http.post<DeveloperResponseDto>(`${this.baseUrl}`, request);
  }

  update(id: number, request: DeveloperRequestDto): Observable<DeveloperResponseDto> {
    return this.http.put<DeveloperResponseDto>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
