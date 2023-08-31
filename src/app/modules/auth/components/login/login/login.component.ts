import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from 'src/app/core/services/backendService/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameDataService } from 'src/app/core/services/gameService/game-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private api: APIService,
    private gamedataSerive: GameDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;

      this.api.login(username, password).subscribe(
        (response: any) => {
          console.log(response.message, response);
          this.gamedataSerive.playerName = username;
          this.gamedataSerive.userID = response.userID;
          this.gamedataSerive.userColourPref = response.colour_pref;
          this.gamedataSerive.setUserColourChoice(response.colour_pref);
          this.router.navigate(['/two-up']);
          this.openSnackBar('Login Successful');
        },
        (error) => {
          console.log('Error: ', error);
          this.openSnackBar('Invalid username or password');
        }
      );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
