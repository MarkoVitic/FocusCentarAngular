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
  filterPayments: PaymentDetails[] = [];
  sortOrder: string;

  currentPage: number = 1;
  rows: number = 10;

  constructor(private paymentService: PaymentsService) {}
  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments() {
    this.paymentService.getAllPayments().subscribe((payment: any) => {
      this.allPayments = payment.data;
      this.filterPayments = payment.data;
    });
  }

  displayList(page: number) {
    const strat = this.rows * (page - 1);
    const end = strat + this.rows;
    return this.filterPayments.slice(strat, end);
  }

  setPagination() {
    const pageCount = Math.ceil(this.filterPayments.length / this.rows);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }

  applyFilter(event: Event): void {
    let searchTherm = (event.target as HTMLInputElement).value;
    searchTherm = searchTherm.toLowerCase();

    this.filterPayments = this.allPayments.filter((payment) => {
      return (
        payment.ImePrezimeUcenika.toLowerCase().includes(searchTherm) ||
        payment.nazivPredmeta.toLowerCase().includes(searchTherm)
      );
    });
    this.sortByDate(this.sortOrder);
  }

  sortByDate(sortValue: string) {
    this.sortOrder = sortValue;
    console.log(this.sortOrder);

    if (this.sortOrder === 'novi') {
      // Sort by newest first
      this.filterPayments.sort(
        (a, b) =>
          new Date(b.kreirano).getTime() - new Date(a.kreirano).getTime()
      );
    } else if (this.sortOrder === 'stari') {
      // Sort by oldest first
      this.filterPayments.sort(
        (a, b) =>
          new Date(a.kreirano).getTime() - new Date(b.kreirano).getTime()
      );
    }

    console.log(this.filterPayments);
  }
}
