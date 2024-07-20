import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechstackV2Component } from './techstack-v2.component';

describe('TechstackV2Component', () => {
  let component: TechstackV2Component;
  let fixture: ComponentFixture<TechstackV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechstackV2Component],
    });
    fixture = TestBed.createComponent(TechstackV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
