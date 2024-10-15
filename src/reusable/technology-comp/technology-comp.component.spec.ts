import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyCompComponent } from './technology-comp.component';

describe('TechnologyCompComponent', () => {
  let component: TechnologyCompComponent;
  let fixture: ComponentFixture<TechnologyCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnologyCompComponent]
    });
    fixture = TestBed.createComponent(TechnologyCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
