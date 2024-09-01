import { Component, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { Subjets } from '../../models/subjets';
import { StudentsService } from '../../services/studentsService/students.service';
import { SubjetsService } from '../../services/subjetsService/subjets.service';
import { Payments } from '../../models/payments';
import { PaymentsService } from '../../services/paymentsService/payments.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-student-payment',
  templateUrl: './form-student-payment.component.html',
  styleUrl: './form-student-payment.component.css',
})
export class FormStudentPaymentComponent implements OnInit {
  formStudenPayment: FormGroup = new FormGroup({});
  student: Students;
  subject: Subjets;
  idStudent: number;
  idSubject: number;
  idProfessor: number;

  constructor(
    private studentsService: StudentsService,
    private subjectService: SubjetsService,
    private paymentService: PaymentsService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    let idUcenik = this.activeRoute.snapshot.paramMap.get('idUcenik');
    if (idUcenik) {
      this.idStudent = parseInt(idUcenik);
    }

    this.getStudentDetails(this.idStudent);
    // this.getSubjectDetails(this.idSubject, this.idProfessor);

    this.formStudenPayment = this.formBuilder.group({
      iznosUplate: ['', Validators.required],
      idUcenik: this.student?.idUcenik,
      idProfesoriPredmeti: this.student?.idProfesoriPredmeti,
    });
  }

  getStudentDetails(id: number) {
    this.studentsService.getOneStudent(id).subscribe((studentDB: any) => {
      this.student = studentDB.data[0];
    });
  }

  // getSubjectDetails(id: number, idProfessor: number) {
  //   this.subjectService
  //     .getOneSubjet(id, idProfessor)
  //     .subscribe((subjectDB: any) => {
  //       this.subject = subjectDB.data[0];
  //     });
  // }

  onSubmit() {
    if (this.formStudenPayment.valid) {
      console.log(this, this.formStudenPayment.value);
      this.paymentService
        .createPayment(this.formStudenPayment.value)
        .subscribe(() => {
          this.router.navigateByUrl('/payments'); // Only navigate after professor is created
          this.formStudenPayment.reset(); // Reset form after successful creation
        });
    }
  }
}
