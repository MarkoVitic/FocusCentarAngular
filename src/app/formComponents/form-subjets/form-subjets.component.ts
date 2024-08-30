import { Component, OnInit } from '@angular/core';
import { SubjetsService } from '../../services/subjetsService/subjets.service';
import { Subjets } from '../../models/subjets';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorsService } from '../../services/professorService/professors.service';
import { Professors } from '../../models/professors';

@Component({
  selector: 'app-form-subjets',
  templateUrl: './form-subjets.component.html',
  styleUrl: './form-subjets.component.css',
})
export class FormSubjetsComponent implements OnInit {
  subjectForm: FormGroup = new FormGroup({});
  idSubject: number;
  allProfessors: Professors[] = [];
  procenta: number;

  constructor(
    private subjectsService: SubjetsService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private professorsService: ProfessorsService
  ) {}
  ngOnInit(): void {
    this.getAllProfessors();
    this.subjectForm = this.formBuilder.group({
      nazivPredmeta: ['', Validators.required],
      cijenaPrograma: ['', Validators.required],
      popustPrograma: [0],
      ukupnaCijenaPrograma: [''],
      idProfesor: ['', Validators.required],
      idPredmet: this.idSubject,
      procenat: ['', Validators.required],
    });
    // Chekin for Params is there any
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.idSubject = parseInt(id);
      this.subjectsService
        .getOneSubjet(parseInt(id))
        .subscribe((subject: any) => {
          console.log(subject);
          this.subjectForm.patchValue(subject.data[0]);
        });
    }
  }

  onSubmit() {
    if (this.subjectForm.valid) {
      if (!this.idSubject) {
        console.log(this.subjectForm.value);
        this.subjectsService
          .createSubjets(this.subjectForm.value)
          .subscribe(() => {
            this.router.navigateByUrl('/subjects'); // Only navigate after professor is created
            this.subjectForm.reset(); // Reset form after successful creation
          });
      } else {
        console.log(this.subjectForm.value);
        this.subjectsService
          .updateSubjet(this.idSubject, this.subjectForm.value)
          .subscribe(() => {
            this.router.navigateByUrl('/subjects'); // Only navigate after professor is created
            this.subjectForm.reset(); // Reset form after successful creation
          });
      }
    }
  }
  getAllProfessors() {
    this.professorsService
      .getAllFromTableProfessors()
      .subscribe((professors: any) => {
        this.allProfessors = professors;
      });
  }
}
