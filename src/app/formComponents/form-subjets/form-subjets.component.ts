import { Component, OnInit } from '@angular/core';
import { SubjetsService } from '../../services/subjetsService/subjets.service';
import { Subjets } from '../../models/subjets';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-subjets',
  templateUrl: './form-subjets.component.html',
  styleUrl: './form-subjets.component.css',
})
export class FormSubjetsComponent implements OnInit {
  subjectForm: FormGroup = new FormGroup({});
  idSubject: number;

  constructor(
    private subjectsService: SubjetsService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      nazivPredmeta: ['', Validators.required],
      cijenaPrograma: ['', Validators.required],
      popustPrograma: ['', Validators.required],

      idProfesor: ['', Validators.required],
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
        this.subjectsService.createSubjets(this.subjectForm.value).subscribe();
        this.router.navigate(['/subjects']);
      } else {
        this.subjectsService
          .updateSubjet(this.idSubject, this.subjectForm.value)
          .subscribe();
        this.router.navigate(['/subjects']);
      }
      this.subjectForm.reset();
    }
  }
}
