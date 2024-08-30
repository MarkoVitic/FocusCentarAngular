import { Component, OnInit } from '@angular/core';
import { ProfessorsService } from '../../services/professorService/professors.service';
import { Professors } from '../../models/professors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form-professors',
  templateUrl: './form-professors.component.html',
  styleUrl: './form-professors.component.css',
})
export class FormProfessorsComponent implements OnInit {
  professorForm: FormGroup = new FormGroup({});
  professor: Professors = new Professors();
  idPredemt: number;
  idProfessor: number;

  constructor(
    private professorsService: ProfessorsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Form of Professor
    this.professorForm = this.formBuilder.group({
      ImePrezimeProfesor: ['', Validators.required],
      kontaktProfesor: ['', Validators.required],
      emailProfesor: ['', [Validators.email]],
      adresaProfesor: [''],
      procenat: [''],
      idPredmet: [''],
      idProfesor: [''],
    });
    //Cheking for Paras is there any
    let predmetId = this.activatedRoute.snapshot.paramMap.get('predmetId');
    let profesorId = this.activatedRoute.snapshot.paramMap.get('profesorId');

    if (predmetId && profesorId) {
      this.idPredemt = parseInt(predmetId);
      this.idProfessor = parseInt(profesorId);
      let professor = this.professorsService
        .getOneProfessor(parseInt(predmetId), parseInt(profesorId))
        .subscribe((professor: any) => {
          console.log(professor);
          this.professorForm.patchValue(professor);
        });
    }
  }

  onSubmit() {
    if (this.professorForm.valid) {
      const professorData = this.professorForm.value;

      if (!this.idProfessor) {
        this.professorsService.createProfessor(professorData).subscribe(() => {
          this.router.navigateByUrl('/professors'); // Only navigate after professor is created
          this.professorForm.reset(); // Reset form after successful creation
        });
      } else {
        this.professorsService
          .updateProfessor(this.idProfessor, professorData)
          .subscribe(() => {
            this.router.navigateByUrl('/professors'); // Only navigate after professor is updated
            this.professorForm.reset(); // Reset form after successful update
          });
      }
    }
  }
}
