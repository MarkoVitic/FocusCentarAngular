import { Component, OnInit } from '@angular/core';
import { Payments } from '../../models/payments';
import { PaymentsService } from '../../services/paymentsService/payments.service';
import { PaymentDetails } from '../../models/paymentsDetails';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})
export class PaymentsComponent implements OnInit {
  allPayments: PaymentDetails[] = [];

  constructor(private paymentService: PaymentsService) {}
  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments() {
    this.paymentService.getAllPayments().subscribe((payment: any) => {
      this.allPayments = payment.data;
    });
  }
}
