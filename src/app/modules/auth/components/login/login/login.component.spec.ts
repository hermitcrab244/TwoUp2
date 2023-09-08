import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { APIService } from 'src/app/core/services/backendService/api.service';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: APIService;
  let gameDataService: GameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [FormBuilder, APIService, GameDataService],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(APIService);
    gameDataService = TestBed.inject(GameDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the login form with the expected form controls', () => {
    const expectedFormControls = ['username', 'password'];
    const formControls = Object.keys(component.loginForm.controls);
    expect(formControls).toEqual(expectedFormControls);
  });

  it('should mark the form as invalid when no input is provided', () => {
    component.loginForm.setValue({ username: '', password: '' });
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should mark the form as valid when valid inputs are provided', () => {
    component.loginForm.setValue({
      username: 'testuser',
      password: 'testpass',
    });
    expect(component.loginForm.valid).toBeTruthy();
  });
});
