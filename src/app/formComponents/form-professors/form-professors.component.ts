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
      procenatProfesor: ['', Validators.required],
    });
    //Cheking for Paras is there any
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.idProfessor = parseInt(id);
      let professor = this.professorsService
        .getOneProfessor(parseInt(id))
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
