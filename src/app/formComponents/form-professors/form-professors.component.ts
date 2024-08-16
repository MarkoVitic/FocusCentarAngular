import { Component, OnInit } from '@angular/core';
import { ProfessorsService } from '../../services/professorService/professors.service';
import { Professors } from '../../models/professors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { group } from 'console';
@Component({
  selector: 'app-form-professors',
  templateUrl: './form-professors.component.html',
  styleUrl: './form-professors.component.css',
})
export class FormProfessorsComponent implements OnInit {
  professorForm: FormGroup = new FormGroup({});
  professor: Professors = new Professors();

  constructor(
    private professorsService: ProfessorsService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.professorForm = this.formBuilder.group({
      ImePrezimeProfesor: ['', Validators.required],
      kontaktProfesor: ['', Validators.required],
      emailProfesor: ['', [Validators.required, Validators.email]],
      adresaProfesor: [''],
      procenatProfesor: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.professorForm.valid) {
      console.log(this.professorForm.value);
      this.professorsService
        .createProfessor(this.professorForm.value)
        .subscribe();
      this.professorForm.reset();
    }
  }
}
