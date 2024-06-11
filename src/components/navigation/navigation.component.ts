// src/app/navigation/navigation.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'nav',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  dropdownOpen = false;

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }
}
