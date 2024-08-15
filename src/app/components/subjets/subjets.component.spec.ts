import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjetsComponent } from './subjets.component';

describe('SubjetsComponent', () => {
  let component: SubjetsComponent;
  let fixture: ComponentFixture<SubjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
