import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leaderbaord',
  templateUrl: './leaderbaord.component.html',
  styleUrls: ['./leaderbaord.component.scss'],
})
export class LeaderbaordComponent implements OnInit {
  constructor(
    public LeaderboardDialogRef: MatDialogRef<LeaderbaordComponent>
  ) {}

  ngOnInit() {}
}
