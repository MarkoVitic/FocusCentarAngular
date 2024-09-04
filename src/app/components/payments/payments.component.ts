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
  searchText: string;
  statusFilter: boolean = false;
  statusDateFilter: boolean = false;

  currentPage: number = 1;
  rows: number = 10;
  pageCount: number;

  constructor(private paymentService: PaymentsService) {}
  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments() {
    this.paymentService.getAllPayments().subscribe((payment: any) => {
      this.allPayments = payment.data;
      this.filterPayments = payment.data;
      this.pageCount = Math.ceil(this.filterPayments.length / this.rows);
    });
  }

  deltePaymnet(id: number, idProfPred: number, idUcenk: number) {
    this.paymentService.deletePayment(id, idProfPred, idUcenk).subscribe(() => {
      window.location.reload();
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
  onPageChange(page: string) {
    console.log(page);
    console.log(this.pageCount);
    if (page == 'predhodna' && this.currentPage > 1) {
      this.currentPage -= 1;
    } else if (page == 'sledeca' && this.currentPage < this.pageCount) {
      this.currentPage += 1;
    }
  }

  applyFilter(searchText: string): void {
    searchText = searchText.toLowerCase();
    console.log(searchText);

    this.filterPayments = this.allPayments.filter((payment) => {
      console.log(payment);
      return (
        payment.ImePrezimeUcenika.toLowerCase().includes(searchText) ||
        payment.nazivPredmeta?.toLowerCase().includes(searchText)
      );
    });
    this.statusFilter = true;
  }

  sortByDate(sortValue: string) {
    this.sortOrder = sortValue;

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
    this.statusDateFilter = true;
  }

  resetFilter() {
    this.searchText = '';
    this.applyFilter('');
    this.statusFilter = false;
  }
  resetDateFilter() {
    this.sortByDate('');
    this.statusDateFilter = false;
  }
}
