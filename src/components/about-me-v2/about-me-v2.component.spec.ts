import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeV2Component } from './about-me-v2.component';

describe('AboutMeV2Component', () => {
  let component: AboutMeV2Component;
  let fixture: ComponentFixture<AboutMeV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutMeV2Component]
    });
    fixture = TestBed.createComponent(AboutMeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
