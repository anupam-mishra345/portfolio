import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsV2Component } from './project-details-v2.component';

describe('ProjectDetailsV2Component', () => {
  let component: ProjectDetailsV2Component;
  let fixture: ComponentFixture<ProjectDetailsV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsV2Component]
    });
    fixture = TestBed.createComponent(ProjectDetailsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
