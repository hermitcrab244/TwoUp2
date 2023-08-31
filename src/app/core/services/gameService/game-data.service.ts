import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultsInterface } from '../../interfaces/results-interface';
import { EndGameInterface } from '../../interfaces/end-game-interface';

@Injectable({
  providedIn: 'root',
})
export class GameDataService implements OnDestroy {
  playerName: string = '';
  userID!: number;
  userColourPref: string = '';
  colourChoice!: string;

  constructor() {}

  ngOnDestroy() {
    this.gameDataSubject.complete();
    this.endDataSubject.complete();
  }

  private gameDataSubject = new BehaviorSubject<any>(null);
  private endDataSubject = new BehaviorSubject<any>(null);
  private colourDataSubject = new BehaviorSubject<any>(null);

  setRoundResults(data: ResultsInterface) {
    this.gameDataSubject.next(data);
  }

  getRoundResults() {
    return this.gameDataSubject.asObservable();
  }

  setEndGameResults(data: EndGameInterface) {
    this.endDataSubject.next(data);
  }

  getEndGameResults() {
    return this.endDataSubject.asObservable();
  }

  setUserColourChoice(data: string) {
    this.colourDataSubject.next(data);
    this.userColourPref = data;
    console.log('Service: ', data);
  }

  getUserColourChoice() {
    return this.colourDataSubject.asObservable();
  }
}
