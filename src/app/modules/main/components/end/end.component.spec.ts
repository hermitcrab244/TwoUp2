import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndComponent } from './end.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';
import { APIService } from 'src/app/core/services/backendService/api.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('EndComponent', () => {
  let component: EndComponent;
  let fixture: ComponentFixture<EndComponent>;
  let mockDialogRef: MatDialogRef<EndComponent>;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;
  let mockAPIService: jasmine.SpyObj<APIService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockGameDataService = jasmine.createSpyObj('GameDataService', [
      'getEndGameResults',
    ]);
    mockAPIService = jasmine.createSpyObj('APIService', ['endGame']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [EndComponent],
      imports: [MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: GameDataService, useValue: mockGameDataService },
        { provide: APIService, useValue: mockAPIService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    fixture = TestBed.createComponent(EndComponent);
    component = fixture.componentInstance;

    const mockGameData = { userID: 1, playerName: 'Test User', score: 100 };
    mockGameDataService.getEndGameResults.and.returnValue(of(mockGameData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user data from GameDataService', () => {
    const mockGameData = { userID: 1, playerName: 'Test User', score: 100 };
    mockGameDataService.getEndGameResults.and.returnValue(of(mockGameData));

    fixture.detectChanges();

    expect(component.user_ID).toEqual(mockGameData.userID);
    expect(component.username).toEqual(mockGameData.playerName);
    expect(component.score).toEqual(mockGameData.score);
  });

  it('should end the game and navigate on endGame() call', () => {
    const mockGameData = { userID: 1, playerName: 'Test User', score: 100 };
    mockGameDataService.getEndGameResults.and.returnValue(of(mockGameData));
    mockAPIService.endGame.and.returnValue(of({ message: 'Success' }));

    fixture.detectChanges();

    component.endGame();

    expect(mockAPIService.endGame).toHaveBeenCalledWith(
      mockGameData.userID,
      mockGameData.playerName,
      mockGameData.score
    );
    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/end']);
  });
});
