import { Injectable } from '@angular/core';
import { Subjets } from '../../models/subjets';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjetsService {
  private apiUrl = environment.apiUrl + '/subjets';

  private Subjets: Subjets[] = [];

  constructor(private http: HttpClient) {}

  getAllSubjets(): Observable<Subjets[]> {
    return this.http.get<Subjets[]>(this.apiUrl);
  }

  getOneSubjet(id: number): Observable<Subjets> {
    return this.http.get<Subjets>(this.apiUrl + `/${id}`);
  }
  createSubjets(subject: Subjets) {
    return this.http.post<Subjets>(this.apiUrl, subject);
  }
  updateSubjet(id: number, subject: Subjets) {
    return this.http.put<Subjets>(this.apiUrl + `$/{id}`, subject);
  }
  deleteSubjet(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
