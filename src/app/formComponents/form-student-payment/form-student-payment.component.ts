import { Component, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { Subjets } from '../../models/subjets';
import { StudentsService } from '../../services/studentsService/students.service';
import { SubjetsService } from '../../services/subjetsService/subjets.service';
import { Payments } from '../../models/payments';
import { PaymentsService } from '../../services/paymentsService/payments.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalDate } from '../../models/globalDate';
import { GlobalDateService } from '../../services/globalDateServices/global-date.service';

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

  globalDate: GlobalDate[] = [];
  defaultDateForQuery: GlobalDate;

  constructor(
    private studentsService: StudentsService,
    private subjectService: SubjetsService,
    private paymentService: PaymentsService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private globalDateService: GlobalDateService
  ) {}
  ngOnInit(): void {
    this.getAllDates();
    let idUcenik = this.activeRoute.snapshot.paramMap.get('idUcenik');
    if (idUcenik) {
      this.idStudent = parseInt(idUcenik);
    }

    this.getStudentDetails(this.idStudent);
    // this.getSubjectDetails(this.idSubject, this.idProfessor);

    this.formStudenPayment = this.formBuilder.group({
      iznosUplate: ['', Validators.required],
      imeUcenika: this.student?.ImePrezimeUcenika,
      predmet: this.student?.nazivPredmeta,
      idUcenik: this.student?.idUcenik,
      idProfesoriPredmeti: this.student?.idProfesoriPredmeti,
      starDate: this.defaultDateForQuery?.pocetakGodine,
      endDate: this.defaultDateForQuery?.krajGodine,
    });
  }

  getStudentDetails(id: number) {
    this.studentsService.getOneStudent(id).subscribe((studentDB: any) => {
      this.student = studentDB.data[0];
    });
  }

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

  getAllDates() {
    this.globalDateService.getAllDates().subscribe((dates: any[]) => {
      // Assign the dates to the variable
      this.globalDate = dates;

      // Sort the dates by the full 'azurirano' property in descending order (latest first)
      this.globalDate = this.globalDate.sort((a: any, b: any) => {
        const dateA = new Date(a.azurirano).getTime(); // Get full timestamp
        const dateB = new Date(b.azurirano).getTime(); // Get full timestamp

        return dateB - dateA; // Descending order (latest date first)
      });

      if (this.globalDate.length > 0) {
        this.defaultDateForQuery = this.globalDate[0]; // Get the first element after sorting
        // this.getAllStudentsWitihNameSubject(
        //   this.defaultDateForQuery.pocetakGodine,
        //   this.defaultDateForQuery.krajGodine
        // );
        // this.pageCount = Math.ceil(this.filterStudents.length / this.rows);
      }
    });
  }
}
