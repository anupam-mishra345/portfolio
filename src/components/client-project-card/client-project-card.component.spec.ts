import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProjectCardComponent } from './client-project-card.component';

describe('ClientProjectCardComponent', () => {
  let component: ClientProjectCardComponent;
  let fixture: ComponentFixture<ClientProjectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientProjectCardComponent]
    });
    fixture = TestBed.createComponent(ClientProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
