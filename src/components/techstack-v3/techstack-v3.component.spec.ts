import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechstackV3Component } from './techstack-v3.component';

describe('TechstackV3Component', () => {
  let component: TechstackV3Component;
  let fixture: ComponentFixture<TechstackV3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechstackV3Component]
    });
    fixture = TestBed.createComponent(TechstackV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
