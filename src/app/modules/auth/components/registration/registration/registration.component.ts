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

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  registerUser() {
    if (this.regForm.valid) {
      const username = this.regForm.get('username')!.value;
      const password = this.regForm.get('password')!.value;
      const confirmPassword = this.regForm.get('confirmPassword')!.value;

      if (password !== confirmPassword) {
        this.openSnackBar('Passwords do not match');
        return;
      }

      this.api.register(username, password).subscribe(
        (response) => {
          console.log(response.message);

          this.openSnackBar('Registration Successful');
        },
        (error) => {
          console.log('Error: ', error);
          if (error.status === 409) {
            this.openSnackBar('User already exists');
          } else {
            this.openSnackBar('Error registering user');
          }
        }
      );

      this.regForm.reset();

      Object.keys(this.regForm.controls).forEach((key) => {
        this.regForm.get(key)?.setErrors(null);
        this.regForm.get(key)?.markAsPristine();
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
