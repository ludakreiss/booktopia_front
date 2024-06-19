import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel, ResponseStatus } from '../../models/response.model';
import { RegistrationRequest } from '../../models/auth.model';

@Component({
  selector: 'div.register.app-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
})
export class RegisterPage {
  // Form group for registration
  protected registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8) // Ensure minimum length validation
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordsMatchValidator() }
  );

  // Error message from the server, if any
  protected errorMessage?: string;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Custom validator to check if password and confirm password fields match.
   */
  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true }; // Return mismatch error if passwords don't match
    };
  }

  /**
   * Method to handle form submission.
   */
  protected submitForm() {
    this.errorMessage = undefined;
    if (this.registerForm.valid) {
      // Prepare registration data from the form
      const registrationData: RegistrationRequest = {
        name: this.registerForm.value.username ?? '',
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
      };
  
      // Call the register method from the authService
      this.authService.register(registrationData).subscribe({
        next: (data) => {
          // On successful registration, navigate to login page
          this.router.navigate(['login']);
        },
        error: (error: HttpErrorResponse) => {
          const backendError: ResponseModel<void> = error.error;
          if (backendError.status === ResponseStatus.ERROR) {
            this.errorMessage = backendError.message;
          }
        },
      });
    } else {
      // Mark all controls as touched to display validation messages
      this.registerForm.markAllAsTouched();
    }
  }
  
}