import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'div.home.app-page',
  standalone: true,
  imports:[SearchComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage { }