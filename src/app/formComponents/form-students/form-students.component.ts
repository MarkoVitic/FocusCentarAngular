import { group } from 'console';
import { Component, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { StudentsService } from '../../services/studentsService/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form-students',
  templateUrl: './form-students.component.html',
  styleUrl: './form-students.component.css',
})
export class FormStudentsComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({});
  idStudent: number;
  constructor(
    private studentsServices: StudentsService,
    private FormBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
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
    });

    // Chekin for Params is there any
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.idStudent = parseInt(id);
      let student = this.studentsServices
        .getOneStudent(parseInt(id))
        .subscribe((student: any) => {
          console.log(student);
          this.studentForm.patchValue(student.data[0]);
        });
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (!this.idStudent) {
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
}
