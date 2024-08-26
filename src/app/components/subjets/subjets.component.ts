import { Subjets } from './../../models/subjets';
import { Component, OnInit } from '@angular/core';

import { SubjetsService } from '../../services/subjetsService/subjets.service';

@Component({
  selector: 'app-subjets',
  templateUrl: './subjets.component.html',
  styleUrl: './subjets.component.css',
})
export class SubjetsComponent implements OnInit {
  subjets: Subjets[] = [];
  filterSubjets: Subjets[] = [];

  currentPage: number = 1;
  rows: number = 10;

  constructor(private subjetService: SubjetsService) {}
  ngOnInit(): void {
    this.getAllSubjets();
  }

  getAllSubjets() {
    this.subjetService.getAllSubjets().subscribe((subjets: any) => {
      this.subjets = subjets;
      this.filterSubjets = subjets;
    });
  }
  deleteSubject(id: number) {
    this.subjetService.deleteSubjet(id).subscribe();
  }
  displayList(page: number) {
    const strat = this.rows * (page - 1);
    const end = strat + this.rows;
    return this.filterSubjets.slice(strat, end);
  }

  setPagination() {
    const pageCount = Math.ceil(this.filterSubjets.length / this.rows);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }
  applyFilter(event: Event): void {
    let searchTherm = (event.target as HTMLInputElement).value;
    searchTherm = searchTherm.toLowerCase();

    this.filterSubjets = this.subjets.filter((subjets) => {
      return (
        subjets.ImePrezimeProfesor.toLowerCase().includes(searchTherm) ||
        subjets.nazivPredmeta.toLowerCase().includes(searchTherm)
      );
    });
  }
}
