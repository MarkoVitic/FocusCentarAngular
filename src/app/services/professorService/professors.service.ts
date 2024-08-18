import { Injectable } from '@angular/core';
import { Professors } from '../../models/professors';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfessorsService {
  private apiUrl = environment.apiUrl + '/professors';

  private professors: Professors[] = [];

  constructor(private http: HttpClient) {}

  getAllProfessors(): Observable<Professors[]> {
    return this.http.get<Professors[]>('http://127.0.0.1:3000/professorsall');
  }

  getOneProfessor(id: number): Observable<Professors> {
    return this.http.get<Professors>(this.apiUrl + `/${id}`);
  }
  createProfessor(professor: Professors): Observable<Professors> {
    console.log(professor);
    return this.http.post<Professors>(this.apiUrl, professor);
  }
  updateProfessor(id: number, professor: Professors) {
    return this.http.put<Professors>(this.apiUrl + `/${id}`, professor);
  }
  deleteProfessor(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
