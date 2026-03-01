import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllocationAssociationRequestDto } from '../dto/allocation-association-request.dto';
import { DeveloperResponseDto } from '../dto/developer-response.dto';
import { ProjectResponseDto } from '../dto/project-response.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AllocationService {
  private readonly baseUrl = `${environment.apiUrl}/allocations`;

  constructor(private http: HttpClient) {}

  history(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(`${this.baseUrl}/history`, { params: httpParams });
  }

  listAvailableDevelopers(): Observable<DeveloperResponseDto[]> {
    return this.http.get<DeveloperResponseDto[]>(`${this.baseUrl}/available-developers`);
  }

  listAllocatableProjects(): Observable<ProjectResponseDto[]> {
    return this.http.get<ProjectResponseDto[]>(`${this.baseUrl}/available-projects`);
  }

  associate(request: AllocationAssociationRequestDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/associate`, request);
  }
}
