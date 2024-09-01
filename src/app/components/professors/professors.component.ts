import { Component, OnInit } from '@angular/core';
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

  deleteProfessor(idProfesor: number, idProfesoriPredmeti: number) {
    console.log(idProfesoriPredmeti, idProfesor);
    if (idProfesoriPredmeti) {
      this.professorsService
        .deleteFromProdessorSubjet(idProfesoriPredmeti)
        .subscribe(() => {
          window.location.reload();
        });
    } else if (!idProfesoriPredmeti) {
      this.professorsService.deleteProfessor(idProfesor).subscribe(() => {
        window.location.reload();
      });
    }
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
  onPageChange(page: number) {
    this.currentPage = page;
  }

  applyFilter(searchText: string): void {
    searchText = searchText.toLowerCase();

    this.filterProfessor = this.professors.filter((professors) => {
      return professors.ImePrezimeProfesor?.toLowerCase().includes(searchText);
    });
    this.statusFilter = true;
  }

  resetFilter() {
    this.searchText = '';
    this.applyFilter('');
    this.statusFilter = false;
  }
}
