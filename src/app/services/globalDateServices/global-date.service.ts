import { GlobalDate } from './../../models/globalDate';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDateService {
  private apiUrl = 'http://127.0.0.1:3000/globalDate';

  constructor(private http: HttpClient) {}

  createGlobalDate(globalDate: GlobalDate): Observable<GlobalDate> {
    return this.http.post<GlobalDate>(this.apiUrl, globalDate);
  }

  updateGlobalDate(idGlobalDate: number, globalDate: any) {
    return this.http.put(this.apiUrl + `/${idGlobalDate}`, globalDate);
  }

  deleteGlobalDate(idGlobalDate: number) {
    return this.http.delete(this.apiUrl + `/${idGlobalDate}`);
  }
}
