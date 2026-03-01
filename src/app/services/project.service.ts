import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectRequestDto } from '../dto/project-request.dto';
import { ProjectResponseDto } from '../dto/project-response.dto';
import { ProjectStatusEnum } from '../enums/project-status.enum';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly baseUrl = `${environment.apiUrl}/projects`;

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

  findById(id: number): Observable<ProjectResponseDto> {
    return this.http.get<ProjectResponseDto>(`${this.baseUrl}/${id}`);
  }

  create(request: ProjectRequestDto): Observable<ProjectResponseDto> {
    return this.http.post<ProjectResponseDto>(`${this.baseUrl}`, request);
  }

  update(id: number, request: ProjectRequestDto): Observable<ProjectResponseDto> {
    return this.http.put<ProjectResponseDto>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
