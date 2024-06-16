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
export class NavigationComponent {
  dropdownOpen = false;

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }
}
