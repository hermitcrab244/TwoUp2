import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScorebaordComponent } from './scorebaord.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { ButtonsComponent } from '../buttons/buttons.component';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';

describe('ScorebaordComponent', () => {
  let component: ScorebaordComponent;
  let fixture: ComponentFixture<ScorebaordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScorebaordComponent, ButtonsComponent],
      imports: [MaterialModule],
      providers: [GameDataService],
    });
    fixture = TestBed.createComponent(ScorebaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize scoreboard variables', () => {
    expect(component.playerName).toBe('');
    expect(component.attemptsCount).toBe(0);
    expect(component.totalScore).toBe(0);
    expect(component.headsCount).toBe(0);
    expect(component.tailsCount).toBe(0);
    expect(component.oddsCount).toBe(0);
    expect(component.outcome).toBe('');
    expect(component.flipResult).toBe('');
  });

  it('should update totalScore and headsCount when outcome is "win" and flipResult is "heads"', () => {
    const initialTotalScore = component.totalScore;
    const initialHeadsCount = component.headsCount;
    const mockService = TestBed.inject(GameDataService);

    mockService.setRoundResults({ outcome: 'win', flipResult: 'heads' });

    expect(component.totalScore).toEqual(initialTotalScore + 1);
    expect(component.headsCount).toEqual(initialHeadsCount + 1);
  });
});
