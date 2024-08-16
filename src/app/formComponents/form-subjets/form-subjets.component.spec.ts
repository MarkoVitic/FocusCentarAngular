import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubjetsComponent } from './form-subjets.component';

describe('FormSubjetsComponent', () => {
  let component: FormSubjetsComponent;
  let fixture: ComponentFixture<FormSubjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSubjetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
