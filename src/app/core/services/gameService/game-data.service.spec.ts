import { TestBed } from '@angular/core/testing';
import { GameDataService } from './game-data.service';
import { ResultsInterface } from '../../interfaces/results-interface';
import { EndGameInterface } from '../../interfaces/end-game-interface';

describe('GameDataService', () => {
  let service: GameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameDataService],
    });
    service = TestBed.inject(GameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get round results', () => {
    const mockResults: ResultsInterface = {
      flipResult: 'heads',
      outcome: 'Win',
    };

    service.setRoundResults(mockResults);

    service.getRoundResults().subscribe((results) => {
      expect(results).toEqual(mockResults);
    });
  });

  it('should set and get endgame results', () => {
    const mockResults: EndGameInterface = {
      userID: 1,
      playerName: 'test',
      score: 5,
    };

    service.setEndGameResults(mockResults);

    service.getEndGameResults().subscribe((endResults) => {
      expect(endResults).toEqual(mockResults);
    });
  });

  it('should set and get user colour preference', () => {
    const mockColourPref = 'default';

    service.setUserColourChoice(mockColourPref);

    service.getUserColourChoice().subscribe((colourChoice) => {
      expect(colourChoice).toBe(mockColourPref);
      expect(service.userColourPref).toBe(mockColourPref);
    });
  });

  it('should complete subjects on ngOnDestroy', () => {
    spyOn(service['gameDataSubject'], 'complete');
    spyOn(service['endDataSubject'], 'complete');

    service.ngOnDestroy();

    expect(service['gameDataSubject'].complete).toHaveBeenCalled();
    expect(service['endDataSubject'].complete).toHaveBeenCalled();
  });
});
