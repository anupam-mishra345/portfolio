import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsClientV2Component } from './projects-client-v2.component';

describe('ProjectsClientV2Component', () => {
  let component: ProjectsClientV2Component;
  let fixture: ComponentFixture<ProjectsClientV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsClientV2Component]
    });
    fixture = TestBed.createComponent(ProjectsClientV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
