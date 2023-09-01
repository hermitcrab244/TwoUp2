import { Component } from '@angular/core';
import { LeaderbaordComponent } from '../leaderbaord/leaderbaord.component';
import { SettingsComponent } from '../settings/settings.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EndComponent } from '../end/end.component';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  leaderboardDialogRef!: MatDialogRef<LeaderbaordComponent>;
  settingsDialogRef!: MatDialogRef<SettingsComponent>;
  endDialogRef!: MatDialogRef<EndComponent>;

  constructor(public dialog: MatDialog) {}

  //Opens leaderboard dialog box that holds the leaderboard component
  openLeaderboard() {
    this.leaderboardDialogRef = this.dialog.open(LeaderbaordComponent, {
      width: '25%',
    });
  }

  //Opens settings dialog box that holds settings component
  openSettings() {
    this.settingsDialogRef = this.dialog.open(SettingsComponent, {
      width: '20%',
    });
  }

  //Opens end game dialog box that holds end game component
  openEnd() {
    this.endDialogRef = this.dialog.open(EndComponent);
  }
}
