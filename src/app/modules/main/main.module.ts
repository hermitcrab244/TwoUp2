import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GameComponent } from './components/game/game.component';
import { ScorebaordComponent } from './components/scorebaord/scorebaord.component';
import { LeaderbaordComponent } from './components/leaderbaord/leaderbaord.component';
import { MaterialModule } from '../shared/material.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EndComponent } from './components/end/end.component';

@NgModule({
  declarations: [
    MainPageComponent,
    GameComponent,
    ScorebaordComponent,
    LeaderbaordComponent,
    ButtonsComponent,
    SettingsComponent,
    EndComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    MainPageComponent,
    GameComponent,
    ScorebaordComponent,
    LeaderbaordComponent,
  ],
})
export class MainModule {}
