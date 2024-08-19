import { Component, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { StudentsService } from '../../services/studentsService/students.service';
import { Payments } from '../../models/payments';
import { PaymentsService } from '../../services/paymentsService/payments.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-student-payment',
  templateUrl: './form-student-payment.component.html',
  styleUrl: './form-student-payment.component.css',
})
export class FormStudentPaymentComponent implements OnInit {
  formStudenPayment: FormGroup = new FormGroup({});
  allStudents: Students[] = [];

  constructor(
    private studentsService: StudentsService,
    private paymentsService: PaymentsService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formStudenPayment = this.formBuilder.group({});
  }

  getAllStudents() {
    this.studentsService
      .getAllStudentWithNameOfSubjet()
      .subscribe((student) => (this.allStudents = student));
  }

  createPayment() {}
}
