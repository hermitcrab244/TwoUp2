import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderbaordComponent } from './leaderbaord.component';

describe('LeaderbaordComponent', () => {
  let component: LeaderbaordComponent;
  let fixture: ComponentFixture<LeaderbaordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderbaordComponent]
    });
    fixture = TestBed.createComponent(LeaderbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
