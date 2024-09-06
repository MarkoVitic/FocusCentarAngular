import { GlobalDate } from './../../models/globalDate';
import { Component, OnInit } from '@angular/core';

import { GlobalDateService } from '../../services/globalDateServices/global-date.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-global-date',
  templateUrl: './global-date.component.html',
  styleUrl: './global-date.component.css',
})
export class GlobalDateComponent implements OnInit {
  globalDate: GlobalDate[] = [];

  trenutaSkolskaGodina: Date;
  idUpdate: number;
  UpdateData: number;

  pocetakGodine: string;
  krajGodine: string;
  defaultDateForQuery: GlobalDate;

  formGlobalDate: FormGroup = new FormGroup({});

  constructor(
    private golbalDateService: GlobalDateService,
    private formGlobalDateBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllDates();

    this.formGlobalDate = this.formGlobalDateBuilder.group({
      nazivDatuma: ['', Validators.required],
      pocetakGodine: ['', Validators.required],
      krajGodine: ['', Validators.required],
    });
  }

  getAllDates() {
    this.golbalDateService.getAllDates().subscribe((dates: any[]) => {
      // Assign the dates to the variable
      this.globalDate = dates;

      // Sort the dates by the full 'azurirano' property in descending order (latest first)
      this.globalDate = this.globalDate.sort((a: any, b: any) => {
        const dateA = new Date(a.azurirano).getTime(); // Get full timestamp
        const dateB = new Date(b.azurirano).getTime(); // Get full timestamp

        return dateB - dateA; // Descending order (latest date first)
      });

      if (this.globalDate.length > 0) {
        this.defaultDateForQuery = this.globalDate[0]; // Get the first element after sorting
        console.log(this.globalDate);
        console.log(this.defaultDateForQuery);
      }
    });
  }

  formatDateToEuropean(date: string): string {
    let datee = date.slice(0, 9);
    const [year, month, day] = datee.split('-');

    return `${day}/${month}/${year}`;
  }

  onPredmetChange(event: Event) {
    const values = parseInt((event.target as HTMLSelectElement).value);

    this.globalDate.filter((date: any) => {
      if (date.idDatum === values) {
        this.pocetakGodine = this.formatDateToEuropean(date.pocetakGodine);
        this.krajGodine = this.formatDateToEuropean(date.krajGodine);
        this.idUpdate = values;
      }
    });
    return values;
  }

  updateAzuriranoDabase() {
    this.golbalDateService
      .updateGlobalDate(this.idUpdate, this.UpdateData)
      .subscribe(() => {
        window.location.reload();
      });
  }

  createGlobalDate() {
    if (this.formGlobalDate.valid) {
      this.golbalDateService
        .createGlobalDate(this.formGlobalDate.value)
        .subscribe(() => {
          window.location.reload();
        });
    }
  }

  deleteGlobalDate() {
    this.golbalDateService.deleteGlobalDate(this.idUpdate).subscribe(() => {
      window.location.reload();
    });
  }
}
