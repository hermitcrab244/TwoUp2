import { Component } from '@angular/core';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  heads = 'heads';
  tails = 'tails';
  headsOdds = 'headsOdds';
  tailsOdds = 'tailsOdds';
  imgPath = '../../../../../assets/images/';
  gameMessage = 'Welcome to the Two Up Game';
  isAnimating = false;
  selectDisabled: boolean = false;
  playerChoice = '';

  coinHeads = this.imgPath + '20c-heads.png';
  coinTails = this.imgPath + '20c-tails.png';

  coin1 = this.coinHeads;
  coin2 = this.coinTails;

  constructor(private dataService: GameDataService) {}

  play(choice: string) {
    let flipResult = '';
    let outcome = '';
    this.playerChoice = choice;
    this.gameMessage = 'You guessed ' + this.playerChoice;
    this.selectDisabled = true;

    const flip1 = Math.random() < 0.5 ? this.heads : this.tails;
    const flip2 = Math.random() < 0.5 ? this.heads : this.tails;

    if (flip1 === flip2) {
      flipResult = flip1;
    } else if (flip1 === this.heads && flip1 !== flip2) {
      flipResult = this.headsOdds;
    } else if (flip1 === this.tails && flip1 !== flip2) {
      flipResult = this.tailsOdds;
    }

    this.flipAnimation();

    setTimeout(() => {
      this.setCoinFaces(flipResult);

      switch (flipResult) {
        case this.playerChoice:
          this.gameMessage = `Flip was ${flipResult}, you guessed correct!`;
          outcome = 'win';
          break;
        case 'headsOdds':
        case 'tailsOdds':
          this.gameMessage = 'Flip was Odd, try again!';
          outcome = 'odds';
          break;
        default:
          this.gameMessage = `Flip was ${flipResult}, you guessed wrong! Try again!`;
          outcome = 'lose';
          break;
      }

      this.dataService.setRoundResults({ outcome, flipResult });
    }, 2000);

    setTimeout(() => {
      this.gameMessage = 'Select to flip again!';
      this.selectDisabled = false;
    }, 4000);
  }

  setCoinFaces(results: string) {
    switch (results) {
      case 'heads':
        this.coin1 = this.imgPath + this.coinHeads;
        this.coin2 = this.imgPath + this.coinHeads;
        break;
      case 'tails':
        this.coin1 = this.imgPath + this.coinTails;
        this.coin2 = this.imgPath + this.coinTails;
        break;
      case 'headsOdds':
        this.coin1 = this.imgPath + this.coinHeads;
        this.coin2 = this.imgPath + this.coinTails;
        break;
      case 'tailsOdds':
        this.coin1 = this.imgPath + this.coinTails;
        this.coin2 = this.imgPath + this.coinHeads;
        break;
      default:
        break;
    }
  }

  flipAnimation() {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 2000);
  }
}
