import { Component, OnInit } from '@angular/core';
import { Professors } from '../../models/professors';
import { ProfessorsService } from '../../services/professorService/professors.service';
import { Router } from 'express';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css',
})
export class ProfessorsComponent implements OnInit {
  professors: Professors[] = [];
  filterProfessor: Professors[] = [];

  currentPage: number = 1;
  rows: number = 10;

  constructor(private professorsService: ProfessorsService) {}
  ngOnInit(): void {
    this.getAllProfessors();
  }

  getAllProfessors() {
    this.professorsService.getAllProfessors().subscribe((professors: any) => {
      this.professors = professors;

      this.filterProfessor = professors;
    });
  }
  getOneProfessor(id: number) {
    this.professorsService.getOneProfessor(id).subscribe();
  }

  deleteProfessor(id: number) {
    this.professorsService.deleteProfessor(id).subscribe();
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

  applyFilter(event: Event): void {
    let searchTherm = (event.target as HTMLInputElement).value;
    searchTherm = searchTherm.toLowerCase();

    this.filterProfessor = this.professors.filter((professors) => {
      return professors.ImePrezimeProfesor.toLowerCase().includes(searchTherm);
    });
  }
}
