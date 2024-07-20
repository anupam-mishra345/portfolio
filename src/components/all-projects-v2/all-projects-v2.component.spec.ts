import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsV2Component } from './all-projects-v2.component';

describe('AllProjectsV2Component', () => {
  let component: AllProjectsV2Component;
  let fixture: ComponentFixture<AllProjectsV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProjectsV2Component]
    });
    fixture = TestBed.createComponent(AllProjectsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
