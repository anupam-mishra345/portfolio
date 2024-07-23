import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeV3Component } from './about-me-v3.component';

describe('AboutMeV3Component', () => {
  let component: AboutMeV3Component;
  let fixture: ComponentFixture<AboutMeV3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutMeV3Component]
    });
    fixture = TestBed.createComponent(AboutMeV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
