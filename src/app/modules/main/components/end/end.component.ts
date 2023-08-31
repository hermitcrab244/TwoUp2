import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';
import { APIService } from 'src/app/core/services/backendService/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
})
export class EndComponent implements OnInit {
  user_ID!: number;
  username!: string;
  score!: number;

  constructor(
    private router: Router,
    public endDialogRef: MatDialogRef<EndComponent>,
    private gameService: GameDataService,
    private api: APIService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.gameService.getEndGameResults().subscribe((data) => {
      if (!data) {
        return;
      }

      this.user_ID = data.userID;
      this.username = data.playerName;
      this.score = data.score;
    });
  }

  endGame() {
    // this.api.colourUpdate(this.colour_pref, this.user_ID).subscribe(
    //   (response: any) => {
    //     console.log(response.message);
    //   },
    //   (error) => {
    //     console.log('Error: ', error);
    //   }
    // );

    this.api.endGame(this.user_ID, this.username, this.score).subscribe(
      (response: any) => {
        this.openSnackBar(response.message);
      },
      (error) => {
        if (error) {
          this.openSnackBar('Results failed to save');
        }
      }
    );
    this.endDialogRef.close();
    this.router.navigate(['/end']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
