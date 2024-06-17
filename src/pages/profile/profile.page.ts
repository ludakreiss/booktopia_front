import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { ResponseModel, ResponseStatus } from '../../models/response.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'div.profile.app-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
  providers:[UserService]
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
  private userId!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  // protected getUser() {
  //   this.userService.getUser(this.userId).subscribe({
  //     next: (response) => {
  //       console.log(response.data)
  //       this.isLoading = false;
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       const backendError: ResponseModel<void> = error.error;
  //       if (backendError.status === ResponseStatus.ERROR) {
  //         this.errorMessage = backendError.message;
  //       }
  //       this.isLoading = false;
  //     },
  //   });
  // }

  protected getUser() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.userForm.patchValue(user);
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
      const updatedUser: User = this.userForm.value as User;

      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: (response) => {
          this.isEditing = false;
          alert('Profile updated successfully');
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