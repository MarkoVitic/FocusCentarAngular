import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProfessorsComponent } from './form-professors.component';

describe('FormProfessorsComponent', () => {
  let component: FormProfessorsComponent;
  let fixture: ComponentFixture<FormProfessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormProfessorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
