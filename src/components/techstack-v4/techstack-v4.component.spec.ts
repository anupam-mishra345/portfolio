import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechstackV4Component } from './techstack-v4.component';

describe('TechstackV2Component', () => {
  let component: TechstackV4Component;
  let fixture: ComponentFixture<TechstackV4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechstackV4Component],
    });
    fixture = TestBed.createComponent(TechstackV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
