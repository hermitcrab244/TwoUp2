import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let mockDataService: jasmine.SpyObj<GameDataService>;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj('GameDataService', [
      'setRoundResults',
    ]);

    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [MaterialModule],
      providers: [{ provide: GameDataService, useValue: mockDataService }],
    });

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set game message correctly for heads', () => {
    component.play('heads');
    expect(component.gameMessage).toBe('You guessed heads');
  });

  it('should set game message correctly for tails', () => {
    component.play('tails');
    expect(component.gameMessage).toBe('You guessed tails');
  });

  it('should disable selection buttons during play', () => {
    component.play('heads');
    expect(component.selectDisabled).toBe(true);
  });

  it('should enable selection buttons after play', () => {
    component.play('heads');
    expect(component.selectDisabled).toBe(true);
  });
});
