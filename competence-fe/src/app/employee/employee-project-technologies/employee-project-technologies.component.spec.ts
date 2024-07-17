import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProjectTechnologiesComponent } from './employee-project-technologies.component';

describe('EmployeeProjectTechnologiesComponent', () => {
  let component: EmployeeProjectTechnologiesComponent;
  let fixture: ComponentFixture<EmployeeProjectTechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeProjectTechnologiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeProjectTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
