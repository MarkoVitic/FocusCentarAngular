import { Component, OnInit } from '@angular/core';
import { Professors } from '../../models/professors';
import { ProfessorsService } from '../../services/professorService/professors.service';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css',
})
export class ProfessorsComponent implements OnInit {
  professors: Professors[] = [];
  professorOne: Professors = new Professors();

  constructor(private professorsService: ProfessorsService) {}
  ngOnInit(): void {
    this.getAllProfessors();
    this.getOneProfessor(2);
  }

  getAllProfessors() {
    this.professorsService.getAllProfessors().subscribe((professors: any) => {
      this.professors = professors;
    });
  }
  getOneProfessor(id: number) {
    this.professorsService
      .getOneProfessor(id)
      .subscribe((professor) => (this.professorOne = professor));
  }
  updateProfessor(id: number, professor: Professors) {
    this.professorsService.updateProfessor(id, professor).subscribe();
  }
  deleteProfessor(id: number) {
    this.professorsService.deleteProfessor(id).subscribe();
  }
  createProfessor(professor: Professors) {
    this.professorsService.createProfessor(professor).subscribe();
  }
}
