// src/app/navigation/navigation.component.ts
import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";

@Component({
    selector: 'nav',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    imports: [SearchComponent]
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
