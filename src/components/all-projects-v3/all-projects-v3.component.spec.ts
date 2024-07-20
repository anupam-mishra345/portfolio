import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsV3Component } from './all-projects-v3.component';

describe('AllProjectsV3Component', () => {
  let component: AllProjectsV3Component;
  let fixture: ComponentFixture<AllProjectsV3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProjectsV3Component]
    });
    fixture = TestBed.createComponent(AllProjectsV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
