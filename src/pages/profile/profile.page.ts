import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { ResponseModel, ResponseStatus } from '../../models/response.model';

@Component({
    selector: 'div.profile.app-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {
    protected userForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        profile_picture: new FormControl('')
    });

    protected errorMessage?: string;
    protected isLoading = true;
    protected isEditing = false;
    private userId!: number;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id !== null) {
            this.userId = +id;
        }
        this.getUser();
    }

    protected getUser() {
        this.userService.getUser(this.userId).subscribe({
            next: response => {
                    this.authService.user.subscribe((user) => {
                      if (user) {
                        this.currentUser = user;
                        this.userId = this.currentUser.id;
                      }
                    });
                  
            },
            error: (error: HttpErrorResponse) => {
                const backendError: ResponseModel<void> = error.error;
                if (backendError.status === ResponseStatus.ERROR) {
                    this.errorMessage = backendError.message;
                }
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
                next: response => {
                    this.isEditing = false;
                    alert('Profile updated successfully');
                },
                error: (error: HttpErrorResponse) => {
                    const backendError: ResponseModel<void> = error.error;
                    if (backendError.status === ResponseStatus.ERROR) {
                        this.errorMessage = backendError.message;
                    }
                }
            });
        } else {
            this.userForm.markAllAsTouched();
        }
    }
}
