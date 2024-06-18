import { Component,ViewEncapsulation, OnInit  } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchComponent implements OnInit {
  data: any;
  errorMessage = '';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  getBookSearch(searchTerm: string) {
    this.searchService.getBookSearch(searchTerm).subscribe({
        next: (response) => {
            this.data = response;
            console.log('Search results:', this.data);
        },
        error: (error: HttpErrorResponse) => {
            console.error('Error fetching data:', error);
            if (error.status === 404) {
                this.errorMessage = 'Resource not found. Please check your search parameters.';
            } else {
                this.errorMessage = 'Failed to fetch data. Please try again later.';
            }
        }
    });
}
}