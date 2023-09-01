import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIService } from 'src/app/core/services/backendService/api.service';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';

@Component({
  selector: 'app-leaderbaord',
  templateUrl: './leaderbaord.component.html',
  styleUrls: ['./leaderbaord.component.scss'],
})
export class LeaderbaordComponent implements OnInit {
  leaderboardScores: any[] = [];
  username!: string;
  userHigh!: number;

  constructor(
    public LeaderboardDialogRef: MatDialogRef<LeaderbaordComponent>,
    private api: APIService,
    private dataService: GameDataService
  ) {}

  //Retrieves both the leaderboard data and current users high score
  ngOnInit() {
    this.username = this.dataService.playerName;
    this.getLeaderboardData();
    this.getUserHighScore(this.username);
  }

  getLeaderboardData() {
    //Backend call that retreieves the leaderboard data
    this.api.leaderboard().subscribe(
      (response: any) => {
        console.log('Response: ', response.message);
        console.log('Data: ', response.data);
        this.leaderboardScores = response.data;
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  getUserHighScore(username: string) {
    //Backend call that retireves the current users highest score
    this.api.userHighScore(username).subscribe(
      (response: any) => {
        console.log('Response: ', response.message);
        console.log('Data: ', response.data);
        this.userHigh = response.data;
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }
}
