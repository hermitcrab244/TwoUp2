import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';
import { APIService } from 'src/app/core/services/backendService/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  colour_pref = '';
  user_ID!: number;

  constructor(
    public settingsDialogRef: MatDialogRef<SettingsComponent>,
    private dataService: GameDataService,
    private api: APIService
  ) {}

  ngOnInit() {}

  //Sets the colour preference the user has selected
  colourSelect(colour: string) {
    this.colour_pref = colour;
    this.user_ID = this.dataService.userID;
    console.log('Component: ', this.colour_pref);
    this.dataService.setUserColourChoice(this.colour_pref); //Updates the service so that it can be set from a seperate component

    //Backend call that updates the users colour preference
    this.api.colourUpdate(this.colour_pref, this.user_ID).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }
}
