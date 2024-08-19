import { Component, OnInit } from '@angular/core';
import { Payments } from '../../models/payments';
import { PaymentsService } from '../../services/paymentsService/payments.service';

@Component({
  selector: 'app-form-payments',
  templateUrl: './form-payments.component.html',
  styleUrl: './form-payments.component.css',
})
export class FormPaymentsComponent implements OnInit {
  paymets: Payments[] = [];

  constructor(private paymetsService: PaymentsService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getAllPayments() {
    this.paymetsService.getAllPayments().subscribe((payment: any) => {
      this.paymets = payment;
    });
  }
  deletePayment(id: number) {
    this.paymetsService.deletePayment(id).subscribe();
  }
}
