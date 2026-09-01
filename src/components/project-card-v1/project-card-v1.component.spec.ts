import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardV1Component } from './project-card-v1.component';

describe('ProjectCardV1Component', () => {
  let component: ProjectCardV1Component;
  let fixture: ComponentFixture<ProjectCardV1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCardV1Component]
    });
    fixture = TestBed.createComponent(ProjectCardV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
