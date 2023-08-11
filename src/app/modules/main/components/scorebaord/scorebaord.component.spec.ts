import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorebaordComponent } from './scorebaord.component';

describe('ScorebaordComponent', () => {
  let component: ScorebaordComponent;
  let fixture: ComponentFixture<ScorebaordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScorebaordComponent]
    });
    fixture = TestBed.createComponent(ScorebaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
