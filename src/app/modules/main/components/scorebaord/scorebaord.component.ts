import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';

@Component({
  selector: 'app-scorebaord',
  templateUrl: './scorebaord.component.html',
  styleUrls: ['./scorebaord.component.scss'],
})
export class ScorebaordComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription;

  //Initally sets all values for the scoreboard variables
  playerName = '';
  userID!: number;
  userColour = '';
  attemptsCount = 0;
  totalScore = 0;
  headsCount = 0;
  tailsCount = 0;
  oddsCount = 0;

  outcome = '';
  flipResult = '';

  constructor(private gameService: GameDataService) {
    //Retrieves data from game component everytime it is updated within the service
    this.dataSubscription = this.gameService
      .getRoundResults()
      .subscribe((data) => {
        if (!data) {
          return;
        }

        this.outcome = data.outcome;
        this.flipResult = data.flipResult;

        //determines score update
        if (this.outcome === 'win') {
          this.totalScore++;
        }

        //Updates tally of toss outcomes
        switch (this.flipResult) {
          case 'heads':
            this.headsCount++;
            break;
          case 'tails':
            this.tailsCount++;
            break;
          case 'headsOdds':
            this.oddsCount++;
            break;
          case 'tailsOdds':
            this.oddsCount++;
            break;
          default:
            break;
        }

        this.attemptsCount++; //Increments attempt counter

        this.sendResults();
      });
  }

  ngOnInit() {
    this.playerName = this.gameService.playerName; //Sets username
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  //Sends the results to the service everytime they update
  sendResults() {
    const userID = this.gameService.userID;
    const playerName = this.gameService.playerName;
    const score = this.totalScore;
    this.gameService.setEndGameResults({ userID, playerName, score });
  }
}
