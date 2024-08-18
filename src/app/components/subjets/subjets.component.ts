import { Component, OnInit } from '@angular/core';
import { Subjets } from '../../models/subjets';
import { SubjetsService } from '../../services/subjetsService/subjets.service';
import { ProfessorsService } from '../../services/professorService/professors.service';
import { Professors } from '../../models/professors';

@Component({
  selector: 'app-subjets',
  templateUrl: './subjets.component.html',
  styleUrl: './subjets.component.css',
})
export class SubjetsComponent implements OnInit {
  subjets: Subjets[] = [];
  professors: Professors[] = [];

  constructor(
    private subjetService: SubjetsService,
    private professorService: ProfessorsService
  ) {}
  ngOnInit(): void {
    this.getAllProfessors();
    this.getAllSubjets();
  }

  getAllSubjets() {
    this.subjetService.getAllSubjets().subscribe((subjets: any) => {
      this.subjets = subjets.data;
      this.addNameOfProfessorsInSubjets();
    });
  }
  deleteSubject(id: number) {
    this.subjetService.deleteSubjet(id).subscribe();
  }
  getAllProfessors() {
    this.professorService.getAllProfessors().subscribe((professors: any) => {
      this.professors = professors;
    });
  }
  addNameOfProfessorsInSubjets() {
    this.subjets.forEach((subject: Subjets) => {
      this.professors.map((profesor: Professors) => {
        if (subject.idProfesor === profesor.idProfesor) {
          subject.imeProfesora = profesor.ImePrezimeProfesor;
        }
      });
    });
  }
}
