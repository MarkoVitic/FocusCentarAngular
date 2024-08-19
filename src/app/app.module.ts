import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfessorsComponent } from './components/professors/professors.component';
import { SubjetsComponent } from './components/subjets/subjets.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { StudentsComponent } from './components/students/students.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { FormProfessorsComponent } from './formComponents/form-professors/form-professors.component';
import { FormStudentsComponent } from './formComponents/form-students/form-students.component';
import { FormSubjetsComponent } from './formComponents/form-subjets/form-subjets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormPaymentsComponent } from './formComponents/form-payments/form-payments.component';
import { FormStudentPaymentComponent } from './formComponents/form-student-payment/form-student-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfessorsComponent,
    SubjetsComponent,
    PaymentsComponent,
    StudentsComponent,
    FormProfessorsComponent,
    FormStudentsComponent,
    FormSubjetsComponent,
    FormPaymentsComponent,
    FormStudentPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
