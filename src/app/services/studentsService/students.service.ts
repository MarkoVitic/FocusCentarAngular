import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from '../../models/students';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalDate } from '../../models/globalDate';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiUrl = environment.apiUrl + '/students';

  private Students: Students[] = [];

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(this.apiUrl);
  }
  getAllStudentWithNameOfSubjet(start: any, end: any) {
    return this.http.get<Students[]>(
      'http://127.0.0.1:3000/studentsall' + `/${start}` + `/${end}`
    );
  }

  getOneStudent(id: number): Observable<Students> {
    return this.http.get<Students>(this.apiUrl + `/${id}`);
  }
  createStudent(student: Students) {
    return this.http.post<Students>(this.apiUrl, student);
  }
  updateStudent(id: number, student: Students) {
    return this.http.put<Students>(this.apiUrl + `/${id}`, student);
  }
  deleteStudent(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
