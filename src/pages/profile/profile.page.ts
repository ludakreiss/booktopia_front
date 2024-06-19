import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { ResponseModel, ResponseStatus } from '../../models/response.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'div.profile.app-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
  providers: [UserService],
})
export class ProfilePage implements OnInit {
  protected userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    profile_picture: new FormControl(''),
  });

  protected errorMessage?: string;
  protected isLoading = true;
  protected isEditing = false;
  protected userId!: number;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUser();
  }

  protected getUser() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.userForm.patchValue(user);
        this.userId = user.id;
        this.isLoading = false;
      }
    });
  }

  protected enableEditing() {
    this.isEditing = true;
  }

  protected saveChanges() {
    this.errorMessage = undefined;
    if (this.userForm.valid) {
      const { name, email } = this.userForm.value;

      const profileData = {
        name: name || '',
        email: email || '',
      };
      console.log(profileData);

      this.authService.updateProfile(profileData).subscribe({
        next: (response) => {
          this.isEditing = false;
          alert('Profile updated successfully');

          this.authService.getUserData().subscribe();
        },
        error: (error: HttpErrorResponse) => {
          const backendError: ResponseModel<void> = error.error;
          if (backendError.status === ResponseStatus.ERROR) {
            this.errorMessage = backendError.message;
          }
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  protected deleteUser() {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.authService.deleteUser(this.userId).subscribe({
        next: () => {
          localStorage.removeItem('jwt');
          window.location.reload();
          if (!localStorage.getItem('jwt')) {
            this.router.navigate(['/']);
          }
        },
        error: (error: HttpErrorResponse) => {
          const backendError: ResponseModel<void> = error.error;
          if (backendError.status === ResponseStatus.ERROR) {
            this.errorMessage = backendError.message;
          }
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
