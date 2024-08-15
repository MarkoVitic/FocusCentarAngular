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
  professorOne: Professors;

  constructor(private professorsService: ProfessorsService) {}
  ngOnInit(): void {
    this.getAllProfessors();
    this.getOneProfessor(7);
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
}
