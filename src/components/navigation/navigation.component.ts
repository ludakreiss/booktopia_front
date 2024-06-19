import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { SearchComponent } from '../search/search.component';

@Component({
    selector: 'nav',
    standalone: true,
    imports: [CommonModule,SearchComponent],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
    private subscription: Subscription | null = null;
    user: User | null = null;
    dropdownOpen: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.subscription = this.authService.user.subscribe(user => {
            this.user = user;
        });
    }

    logout() {
        this.authService.logout().subscribe(() => {
            this.user = null;
        });
    }

    toggleDropdown(event: Event) {
        event.preventDefault();  
        this.dropdownOpen = !this.dropdownOpen;  
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
