import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { APIService } from 'src/app/core/services/backendService/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let apiService: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [FormBuilder, APIService],
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(APIService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user when form is valid', () => {
    component.regForm.setValue({
      username: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    });

    spyOn(apiService, 'register').and.returnValue(of({ message: 'Success' }));
    component.registerUser();
    expect(apiService.register).toHaveBeenCalledWith('testuser', 'password');
  });

  it('should show error message when passwords do not match', () => {
    component.regForm.setValue({
      username: 'testuser',
      password: 'password',
      confirmPassword: 'mismatched',
    });

    component.registerUser();
  });

  it('should make the form valid when all fields are filled correctly', () => {
    component.regForm.setValue({
      username: 'validuser',
      password: 'validpassword',
      confirmPassword: 'validpassword',
    });
    expect(component.regForm.valid).toBeTruthy();
  });

  it('should clear form and validation errors after successful registration', () => {
    component.regForm.setValue({
      username: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    });

    spyOn(apiService, 'register').and.returnValue(of({ message: 'Success' }));
    component.registerUser();
    expect(component.regForm.value).toEqual({
      username: null,
      password: null,
      confirmPassword: null,
    });
    expect(component.regForm.errors).toBeNull();
  });

  it('should display an error message when registration fails', () => {
    component.regForm.setValue({
      username: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    });

    spyOn(apiService, 'register').and.returnValue(
      throwError({ status: 500, message: 'Internal Server Error' })
    );
    component.registerUser();
  });
});
