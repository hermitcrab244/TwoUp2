import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { ScorebaordComponent } from '../../components/scorebaord/scorebaord.component';
import { GameComponent } from '../../components/game/game.component';
import { ButtonsComponent } from '../../components/buttons/buttons.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainPageComponent,
        ScorebaordComponent,
        GameComponent,
        ButtonsComponent,
      ],
      imports: [MaterialModule],
    });
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
