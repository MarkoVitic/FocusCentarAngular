import { group } from 'console';
import { Component, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { StudentsService } from '../../services/studentsService/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subjets } from '../../models/subjets';
import { SubjetsService } from '../../services/subjetsService/subjets.service';
@Component({
  selector: 'app-form-students',
  templateUrl: './form-students.component.html',
  styleUrl: './form-students.component.css',
})
export class FormStudentsComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({});
  idStudent: number;
  allSubjects: Subjets[] = [];
  constructor(
    private studentsServices: StudentsService,
    private FormBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private subjetsService: SubjetsService
  ) {}
  ngOnInit(): void {
    this.getAllSubjets();
    // Form Student
    this.studentForm = this.FormBuilder.group({
      ImePrezimeUcenika: ['', Validators.required],
      ImeRoditelja: ['', Validators.required],
      kontaktRoditelja: ['', Validators.required],
      emailRoditelja: [''],
      ocjenaJedan: [''],
      ocjenaDva: [''],
      ocjenaTri: [''],
      ocjenaCetiri: [''],
      idPredmet: [''],
      ukupnoPlacenoDoSada: [''],
      popust: [''],
    });

    // Chekin for Params is there any
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.idStudent = parseInt(id);
      let student = this.studentsServices
        .getOneStudent(parseInt(id))
        .subscribe((student: any) => {
          this.studentForm.patchValue(student.data[0]);
        });
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (!this.idStudent) {
        console.log(this.studentForm.value);
        this.studentsServices.createStudent(this.studentForm.value).subscribe();
        this.router.navigate(['/students']);
      } else {
        console.log(this.idStudent);
        this.studentsServices
          .updateStudent(this.idStudent, this.studentForm.value)
          .subscribe();
        this.router.navigate(['/students']);
      }
      this.studentForm.reset();
    }
  }

  getAllSubjets() {
    this.subjetsService
      .getAllSubjets()
      .subscribe((sub) => (this.allSubjects = sub));
  }
}
