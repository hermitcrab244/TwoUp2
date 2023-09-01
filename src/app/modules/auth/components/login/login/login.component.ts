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

  // Creates form
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //Method run when user attempts to login
  login() {
    //Check for valid form
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;

      //Calls backend and retrives users ID and colour preference
      this.api.login(username, password).subscribe(
        (response: any) => {
          console.log(response.message, response);
          this.gamedataSerive.playerName = username;
          this.gamedataSerive.userID = response.userID;
          this.gamedataSerive.userColourPref = response.colour_pref;
          this.gamedataSerive.setUserColourChoice(response.colour_pref);
          this.router.navigate(['/two-up']); //Routes user to main page
          this.openSnackBar('Login Successful'); //Displays success message for user
        },
        //Throws error if incorrect details
        (error) => {
          console.log('Error: ', error);
          this.openSnackBar('Invalid username or password');
        }
      );
    }
  }

  //Method opens snackbar when called
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
