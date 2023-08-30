import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIService } from 'src/app/core/services/backendService/api.service';

@Component({
  selector: 'app-leaderbaord',
  templateUrl: './leaderbaord.component.html',
  styleUrls: ['./leaderbaord.component.scss'],
})
export class LeaderbaordComponent implements OnInit {
  leaderboardScores: any[] = [];

  constructor(
    public LeaderboardDialogRef: MatDialogRef<LeaderbaordComponent>,
    private api: APIService
  ) {}

  ngOnInit() {
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
}
