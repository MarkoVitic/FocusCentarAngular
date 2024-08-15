import { Injectable } from '@angular/core';
import { Professors } from '../../models/professors';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsService {
  private apiUrl = 'http://127.0.0.1:3000';

  private professors: Professors[] = [];

  constructor(private http: HttpClient) {}

  getAllProfessors(): Observable<Professors[]> {
    return this.http.get<Professors[]>(this.apiUrl + '/professors');
  }

  getOneProfessor(id: number): Observable<Professors> {
    return this.http.get<Professors>(this.apiUrl + '/professors' + `/${id}`);
  }
  createProfessor(professor: Professors) {
    return this.http.post<Professors>(
      this.apiUrl + '/professors',
      `${professor}`
    );
  }
  updateProfessor(id: number, professor: Professors) {
    return this.http.put<Professors>(
      this.apiUrl + '/professors' + `$/{id}`,
      professor
    );
  }
  deleteProfessor(id: number) {
    return this.http.delete(this.apiUrl + '/professors' + `/${id}`);
  }
}
