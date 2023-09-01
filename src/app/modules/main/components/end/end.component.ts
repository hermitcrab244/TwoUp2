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

  //Gets data from the service that is required
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

  //Method runs when user wants to end the game
  endGame() {
    //Backend call that saves the game results data
    this.api.endGame(this.user_ID, this.username, this.score).subscribe(
      (response: any) => {
        this.openSnackBar(response.message); //Displays success message for user
      },
      //Throws error if results fail to save
      (error) => {
        if (error) {
          this.openSnackBar('Results failed to save'); //Displays error message for user
        }
      }
    );
    this.endDialogRef.close(); //Closes question dialog box
    this.router.navigate(['/end']); //Routes the user to the end game page
  }

  //Method opens snackbar when called
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
