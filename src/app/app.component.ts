import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameDataService } from './core/services/gameService/game-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private dataSubscription: Subscription;

  title = 'Two-Up Game 2';
  colourSelect!: string;

  constructor(private dataService: GameDataService) {
    this.dataSubscription = this.dataService
      .getUserColourChoice()
      .subscribe((data) => {
        if (!data) {
          return;
        }

        console.log('App: ', data);

        this.colourSelect = data;
      });
  }

  ngOnInit() {
    this.colourSelect = 'default';
  }
}
