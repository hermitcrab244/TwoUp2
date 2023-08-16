import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';
import { ResultsInterface } from 'src/app/core/interfaces/results-interface';

@Component({
  selector: 'app-scorebaord',
  templateUrl: './scorebaord.component.html',
  styleUrls: ['./scorebaord.component.scss'],
})
export class ScorebaordComponent implements OnDestroy {
  private dataSubscription: Subscription;

  playerName = '';
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
        if (data) {
          console.log('Scoreboard');
          console.log(data);
          this.outcome = data.outcome;
          this.flipResult = data.flipResult;

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

          if (this.outcome === 'win') {
            this.totalScore++;
          }

          this.attemptsCount++;
        }
      });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestory() {
    this.dataSubscription.unsubscribe();
  }
}
