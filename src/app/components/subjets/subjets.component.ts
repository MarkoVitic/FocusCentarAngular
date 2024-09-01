import { SubjetsService } from './../../services/subjetsService/subjets.service';
import { Subjets } from './../../models/subjets';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjets',
  templateUrl: './subjets.component.html',
  styleUrl: './subjets.component.css',
})
export class SubjetsComponent implements OnInit {
  subjets: Subjets[] = [];
  filterSubjets: Subjets[] = [];
  searchText: string;
  statusFilter: boolean = false;

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
  deleteSubject(id: number, idProfesoriPredmeti: number) {
    console.log(id, idProfesoriPredmeti);

    if (idProfesoriPredmeti) {
      this.subjetService
        .deleteFromSubjectProfesorTable(idProfesoriPredmeti)
        .subscribe((a) => {
          console.log(a);
          window.location.reload();
        });
    } else if (!idProfesoriPredmeti) {
      this.subjetService
        .deleteSubjet(id, idProfesoriPredmeti)
        .subscribe((a) => {
          console.log(a);
          window.location.reload();
        });
    }
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
  applyFilter(searchText: string): void {
    searchText = searchText.toLowerCase();

    this.filterSubjets = this.subjets.filter((subjets) => {
      return (
        subjets.nazivPredmeta?.toLowerCase().includes(searchText) ||
        subjets.ImePrezimeProfesor?.toLowerCase().includes(searchText)
      );
    });
    this.statusFilter = true;
  }

  resetFilter() {
    this.searchText = '';
    this.applyFilter('');
    this.statusFilter = false;
  }
}
