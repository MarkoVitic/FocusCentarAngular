import { Component, OnInit } from '@angular/core';
import { Payments } from '../../models/payments';
import { PaymentsService } from '../../services/paymentsService/payments.service';
import { PaymentDetails } from '../../models/paymentsDetails';
import { GlobalDate } from '../../models/globalDate';
import { GlobalDateService } from '../../services/globalDateServices/global-date.service';
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

  globalDate: GlobalDate[] = [];
  defaultDateForQuery: GlobalDate;

  showModal: boolean = false;
  idPayment: number | undefined;
  idProfesoriPredmeti: number | undefined;
  idStudent: number | undefined;

  constructor(
    private paymentService: PaymentsService,
    private globalDateService: GlobalDateService
  ) {}
  ngOnInit(): void {
    this.getAllDates();
  }

  getAllPayments(start: any, end: any) {
    this.paymentService.getAllPayments(start, end).subscribe((payment: any) => {
      this.allPayments = payment.data;
      this.filterPayments = payment.data;
    });
    this.pageCount = Math.ceil(this.filterPayments.length / this.rows);
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

  getAllDates() {
    this.globalDateService.getAllDates().subscribe((dates: any[]) => {
      // Assign the dates to the variable
      this.globalDate = dates;
      console.log(this.globalDate);

      // Sort the dates by the full 'azurirano' property in descending order (latest first)
      this.globalDate = this.globalDate.sort((a: any, b: any) => {
        const dateA = new Date(a.azurirano).getTime(); // Get full timestamp
        const dateB = new Date(b.azurirano).getTime(); // Get full timestamp

        return dateB - dateA; // Descending order (latest date first)
      });

      if (this.globalDate.length > 0) {
        this.defaultDateForQuery = this.globalDate[0]; // Get the first element after sorting

        this.getAllPayments(
          this.defaultDateForQuery.pocetakGodine,
          this.defaultDateForQuery.krajGodine
        );
      }
    });
  }

  onClickDelete(
    idPayment?: number,
    idProfesoriPredmeti?: number,
    idStudent?: number
  ) {
    this.idPayment = idPayment;
    this.idProfesoriPredmeti = idProfesoriPredmeti;
    this.idStudent = idStudent;
    this.showModal = !this.showModal;
  }

  onModalHandle(response: boolean) {
    if (response) {
      if (this.idPayment && this.idProfesoriPredmeti && this.idStudent) {
        this.paymentService
          .deletePayment(
            this.idPayment,
            this.idProfesoriPredmeti,
            this.idStudent
          )
          .subscribe(() => {
            window.location.reload();
          });
      }
    } else {
      this.showModal = !this.showModal;
    }
  }
}
