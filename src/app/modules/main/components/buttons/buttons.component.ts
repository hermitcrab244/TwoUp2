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

  openLeaderboard() {
    this.leaderboardDialogRef = this.dialog.open(LeaderbaordComponent, {
      width: '25%',
    });
  }

  openSettings() {
    this.settingsDialogRef = this.dialog.open(SettingsComponent, {
      width: '20%',
    });
  }

  openEnd() {
    this.endDialogRef = this.dialog.open(EndComponent);
  }
}
