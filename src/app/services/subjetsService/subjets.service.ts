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
    return this.http.get<Subjets[]>('http://127.0.0.1:3000/subjetsall');
  }

  getOneSubjet(id: number, idProfessor: number): Observable<Subjets> {
    return this.http.get<Subjets>(this.apiUrl + `/${id}` + `/${idProfessor}`);
  }

  createSubjets(subject: Subjets) {
    return this.http.post<Subjets>(this.apiUrl, subject);
  }

  crateInsideProdessorSubjectTable(subject: Subjets) {
    return this.http.post<Subjets>(
      `http://127.0.0.1:3000/professorSubject`,
      subject
    );
  }
  updateSubjet(id: number, subject: Subjets) {
    return this.http.put<Subjets>(this.apiUrl + `/${id}`, subject);
  }
  deleteSubjet(idPredemt: number) {
    return this.http.delete(this.apiUrl + `/${idPredemt}`);
  }

  deleteFromSubjectProfesorTable(idProfesoriPredmeti: number) {
    return this.http.delete(
      `http://127.0.0.1:3000/professorSubjects/${idProfesoriPredmeti}`
    );
  }
}
