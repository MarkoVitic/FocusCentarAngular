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
    let idPredemt = this.activeRoute.snapshot.paramMap.get('idPredmet');
    if (idPredemt) {
      this.idSubject = parseInt(idPredemt);
    }
    this.getStudentDetails(this.idStudent);
    this.getSubjectDetails(this.idSubject);

    this.formStudenPayment = this.formBuilder.group({
      iznosUplate: ['', Validators.required],
      idUcenik: this.student?.ImePrezimeUcenika,
      idPredmet: this.subject?.nazivPredmeta,
      idProfesor: this.subject?.idProfesor,
    });
  }

  getStudentDetails(id: number) {
    this.studentsService.getOneStudent(id).subscribe((studentDB: any) => {
      this.student = studentDB.data[0];
    });
  }

  getSubjectDetails(id: number) {
    this.subjectService.getOneSubjet(id).subscribe((subjectDB: any) => {
      this.subject = subjectDB.data[0];
    });
  }

  onSubmit() {
    let payment: any = {
      iznosUplate: parseInt(this.formStudenPayment.value.iznosUplate),
      idUcenik: this.student.idUcenik,
      idPredmet: this.student.idPredmet,
      idProfesor: parseInt(this.formStudenPayment.value.idProfesor),
    };

    this.paymentService.createPayment(payment).subscribe();
    // ***Napomena VAZNO*** aKO SE OVO NE UPISIVACE 2x ISTU UPLATU. vJEROVATNO ZBOG AHREF STO SAM STAVIOU STUDENTCOMPONENET
    this.router.navigate(['/payments']);
  }
}
