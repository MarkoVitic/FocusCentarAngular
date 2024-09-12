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
  pageCount: number;
  countOfSubjects: number;

  showModal: boolean = false;
  idPredmet: number | undefined;
  idProfesoriPredmeti: number | undefined;

  constructor(private subjetService: SubjetsService) {}
  ngOnInit(): void {
    this.getAllSubjets();
  }

  getAllSubjets() {
    this.subjetService.getAllSubjets().subscribe((subjets: any) => {
      this.subjets = subjets;

      this.filterSubjets = subjets;
      this.pageCount = Math.ceil(this.filterSubjets.length / this.rows);
      const uniqueProfessors = new Set<number>();
      subjets.forEach((subjets: any) => {
        uniqueProfessors.add(subjets.idPredmet);
      });
      this.countOfSubjects = uniqueProfessors.size;
    });
  }
  // deleteSubject(id: number, idProfesoriPredmeti: number) {
  //   console.log(id, idProfesoriPredmeti);

  //   if (idProfesoriPredmeti) {
  //     this.subjetService
  //       .deleteFromSubjectProfesorTable(idProfesoriPredmeti)
  //       .subscribe((a) => {
  //         console.log(a);
  //         window.location.reload();
  //       });
  //   } else if (!idProfesoriPredmeti) {
  //     this.subjetService
  //       .deleteSubjet(id, idProfesoriPredmeti)
  //       .subscribe((a) => {
  //         console.log(a);
  //         window.location.reload();
  //       });
  //   }
  // }
  displayList(page: number) {
    const strat = this.rows * (page - 1);
    const end = strat + this.rows;
    return this.filterSubjets.slice(strat, end);
  }

  setPagination() {
    const pageCount = Math.ceil(this.filterSubjets.length / this.rows);
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

  onClickDelete(idPredmet?: number, idProfesoriPredmeti?: number) {
    this.idPredmet = idPredmet;
    this.idProfesoriPredmeti = idProfesoriPredmeti;
    this.showModal = !this.showModal;
  }

  onModalHandle(response: boolean) {
    console.log('Modal response:', response);
    if (response) {
      if (this.idProfesoriPredmeti) {
        this.subjetService
          .deleteFromSubjectProfesorTable(this.idProfesoriPredmeti)
          .subscribe((a) => {
            console.log(a);
            window.location.reload();
          });
      } else if (!this.idProfesoriPredmeti && this.idPredmet) {
        this.subjetService.deleteSubjet(this.idPredmet).subscribe((a) => {
          console.log(a);
          window.location.reload();
        });
      }
    } else {
      this.showModal = !this.showModal;
    }
  }
}
