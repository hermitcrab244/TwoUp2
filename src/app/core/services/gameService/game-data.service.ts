import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultsInterface } from '../../interfaces/results-interface';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  constructor() {}

  private gameDataSubject = new BehaviorSubject<any>(null);

  setRoundResults(data: ResultsInterface) {
    this.gameDataSubject.next(data);
    console.log(data);
  }
}
