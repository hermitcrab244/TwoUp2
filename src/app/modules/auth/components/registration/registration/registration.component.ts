import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from 'src/app/core/services/backendService/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  regForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: APIService,
    private snackBar: MatSnackBar
  ) {}

  //Creates form
  ngOnInit() {
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  //Method runs when user attempts to regiser a user
  registerUser() {
    //Checks for valid form
    if (this.regForm.valid) {
      const username = this.regForm.get('username')!.value;
      const password = this.regForm.get('password')!.value;
      const confirmPassword = this.regForm.get('confirmPassword')!.value;

      //Check is passwords match
      if (password !== confirmPassword) {
        this.openSnackBar('Passwords do not match');
        return;
      }

      //Backend call that registers the user
      this.api.register(username, password).subscribe(
        (response) => {
          console.log(response.message);

          this.openSnackBar('Registration Successful'); //Displays success message to user
        },
        //Throws error and displays appropriate message
        (error) => {
          console.log('Error: ', error);
          if (error.status === 409) {
            this.openSnackBar('User already exists'); //Displays error to user
          } else {
            this.openSnackBar('Error registering user'); //Displays error to user
          }
        }
      );

      this.regForm.reset(); //Clears fields

      //Removes validation error from fields once cleared
      Object.keys(this.regForm.controls).forEach((key) => {
        this.regForm.get(key)?.setErrors(null);
        this.regForm.get(key)?.markAsPristine();
      });
    }
  }

  //Method opens snackbar when called
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
