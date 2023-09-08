import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderbaordComponent } from './leaderbaord.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/core/services/backendService/api.service';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('LeaderbaordComponent', () => {
  let component: LeaderbaordComponent;
  let fixture: ComponentFixture<LeaderbaordComponent>;
  let mockDialogRef: MatDialogRef<LeaderbaordComponent>;
  let mockApiService: jasmine.SpyObj<APIService>;
  let mockGameDataService: jasmine.SpyObj<GameDataService>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockApiService = jasmine.createSpyObj('APIService', [
      'leaderboard',
      'userHighScore',
    ]);
    mockGameDataService = jasmine.createSpyObj('GameDataService', [
      'getRoundResults',
    ]);

    TestBed.configureTestingModule({
      declarations: [LeaderbaordComponent],
      imports: [MaterialModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: APIService, useValue: mockApiService },
        { provide: GameDataService, useValue: mockGameDataService },
      ],
    });
    fixture = TestBed.createComponent(LeaderbaordComponent);
    component = fixture.componentInstance;

    mockApiService.leaderboard.and.returnValue(of({ data: [] }));
    mockApiService.userHighScore.and.returnValue(of({ data: 0 }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize leaderboard data and user high score', () => {
    const mockLeaderboardData = [
      { username: 'user1', score: 100 },
      { username: 'user2', score: 200 },
    ];

    const mockUserHighScore = 300;

    // Mock the leaderboard and userHighScore methods to return specific data
    mockApiService.leaderboard.and.returnValue(
      of({ data: mockLeaderboardData })
    );
    mockApiService.userHighScore.and.returnValue(
      of({ data: mockUserHighScore })
    );

    component.ngOnInit();

    expect(component.leaderboardScores).toEqual(mockLeaderboardData);
    expect(component.userHigh).toEqual(mockUserHighScore);
  });
});
