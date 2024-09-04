import { GlobalDate } from './../../models/globalDate';
import { Component, OnInit } from '@angular/core';

import { GlobalDateService } from '../../services/globalDateServices/global-date.service';

@Component({
  selector: 'app-global-date',
  templateUrl: './global-date.component.html',
  styleUrl: './global-date.component.css',
})
export class GlobalDateComponent implements OnInit {
  globalDate: GlobalDate[] = [];
  trenutkaGodina: string = '10/09/2024';
  pocetakGodine: string;
  krajGodine: string;

  constructor(private golbalDateService: GlobalDateService) {}

  ngOnInit(): void {
    this.getAllDates();
  }

  getAllDates() {
    this.golbalDateService
      .getAllDates()
      .subscribe((dates) => (this.globalDate = dates));
  }
  formatDateToEuropean(date: string): string {
    let datee = date.slice(0, 9);
    const [year, month, day] = datee.split('-');
    console.log(day);
    return `${day}/${month}/${year}`;
  }

  onPredmetChange(event: Event) {
    const values = parseInt((event.target as HTMLSelectElement).value);
    console.log(values);

    this.globalDate.filter((date: any) => {
      if (date.idDatum === values) {
        console.log(date.pocetakGodine);
        this.pocetakGodine = this.formatDateToEuropean(date.pocetakGodine);
        this.krajGodine = this.formatDateToEuropean(date.krajGodine);
      }
    });
  }
}
