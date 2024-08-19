import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStudentPaymentComponent } from './form-student-payment.component';

describe('FormStudentPaymentComponent', () => {
  let component: FormStudentPaymentComponent;
  let fixture: ComponentFixture<FormStudentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormStudentPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStudentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
