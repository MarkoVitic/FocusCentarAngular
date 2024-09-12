import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Professors } from '../../models/professors';
import { ProfessorsService } from '../../services/professorService/professors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css',
})
export class ProfessorsComponent implements OnInit {
  professors: Professors[] = [];
  filterProfessor: Professors[] = [];
  searchText: string;
  statusFilter: boolean = false;

  currentPage: number = 1;
  rows: number = 10;
  pageCount: number;
  countOfProfessors: number;

  showModal: boolean = false;
  idProfesor: number | undefined;
  idProfesoriPredmeti: number | undefined;

  @Input() professor: Professors = new Professors();
  @Output() handleModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private professorsService: ProfessorsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllProfessors();
  }

  getAllProfessors() {
    this.professorsService.getAllProfessors().subscribe((professors: any) => {
      this.professors = professors;
      this.filterProfessor = professors;

      const uniqueProfessors = new Set<number>();
      professors.forEach((professor: any) => {
        uniqueProfessors.add(professor.idProfesor);
      });
      this,
        (this.pageCount = Math.ceil(this.filterProfessor.length / this.rows));
      this.countOfProfessors = uniqueProfessors.size;
    });
  }
  editProfessor(idPredemt: number, idProfesor: number) {
    this.professorsService
      .getOneProfessor(idPredemt, idProfesor)
      .subscribe(() => {
        this.router.navigateByUrl(
          `/professors/form/${idPredemt}/${idProfesor}`
        );
      });
  }

  createProfessor(professor: Professors) {
    this.professorsService.createProfessor(professor).subscribe();
  }

  displayList(page: number) {
    const strat = this.rows * (page - 1);
    const end = strat + this.rows;
    return this.filterProfessor.slice(strat, end);
  }

  setPagination() {
    const pageCount = Math.ceil(this.filterProfessor.length / this.rows);
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

    this.filterProfessor = this.professors.filter((professors) => {
      return (
        professors.nazivPredmeta?.toLowerCase().includes(searchText) ||
        professors.ImePrezimeProfesor?.toLowerCase().includes(searchText)
      );
    });
    this.statusFilter = true;
  }

  resetFilter() {
    this.searchText = '';
    this.applyFilter('');
    this.statusFilter = false;
  }

  onClickDelete(idProfesor?: number, idProfesoriPredmeti?: number) {
    this.idProfesor = idProfesor;
    this.idProfesoriPredmeti = idProfesoriPredmeti;
    this.showModal = !this.showModal;
  }

  onModalHandle(response: boolean) {
    console.log('Modal response:', response);
    if (response) {
      if (this.idProfesoriPredmeti) {
        console.log(this.idProfesoriPredmeti);
        this.professorsService
          .deleteFromProdessorSubjet(this.idProfesoriPredmeti)
          .subscribe(() => {
            window.location.reload();
          });
      } else if (!this.idProfesoriPredmeti && this.idProfesor) {
        this.professorsService
          .deleteProfessor(this.idProfesor)
          .subscribe(() => {
            window.location.reload();
          });
      }
    } else {
      this.showModal = !this.showModal;
    }
  }
}
