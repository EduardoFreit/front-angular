import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardGeneralMetricsDto } from '../dto/dashboard-general-metrics.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly baseUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getGeneralMetrics(): Observable<DashboardGeneralMetricsDto> {
    return this.http.get<DashboardGeneralMetricsDto>(`${this.baseUrl}/metrics`);
  }
}
