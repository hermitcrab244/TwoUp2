import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';
import { ResultsInterface } from 'src/app/core/interfaces/results-interface';

@Component({
  selector: 'app-scorebaord',
  templateUrl: './scorebaord.component.html',
  styleUrls: ['./scorebaord.component.scss'],
})
export class ScorebaordComponent implements OnInit {
  private dataSubscription: Subscription;

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
    this.dataSubscription = this.gameService
      .getRoundResults()
      .subscribe((data) => {
        if (!data) {
          console.log('Fuck Elliott');
          return;
        }

        this.outcome = data.outcome;
        this.flipResult = data.flipResult;

        if (this.outcome === 'win') {
          this.totalScore++;
        }

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

        this.attemptsCount++;
      });
  }

  ngOnInit() {
    this.playerName = this.gameService.playerName;
  }
}
