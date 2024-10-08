import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Payments } from '../../models/payments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private apiUrl = environment.apiUrl + '/payments';

  constructor(private http: HttpClient) {}

  getAllPayments(start: any, end: any) {
    return this.http.get<Payments[]>(`${this.apiUrl}/${start}/${end}`);
  }

  getOnePayment(id: number): Observable<Payments> {
    return this.http.get<Payments>(this.apiUrl + `/${id}`);
  }
  createPayment(payment: Payments) {
    return this.http.post<Payments>(this.apiUrl, payment);
  }
  updatePayment(id: number, payment: Payments) {
    return this.http.put<Payments>(this.apiUrl + `$/{id}`, payment);
  }
  deletePayment(id: number, idProfPred: number, idUcenk: number) {
    return this.http.delete(
      this.apiUrl + `/${id}` + `/${idProfPred}` + `/${idUcenk}`
    );
  }
}
