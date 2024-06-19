import { Component,ViewEncapsulation, OnInit  } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {}

  getBookSearch(searchTerm: string) {
    this.searchService.getBookSearch(searchTerm).subscribe({
        next: (response) => {
            this.data = response;
            console.log('Search results:', this.data);
            if (this.data && this.data.length > 0) {
            // Get the ID of the first book
            const firstBookId = this.data[0].id;
            // Navigate to the review page with the book ID
            this.router.navigate(['review-book'], { queryParams: { bookId: firstBookId } });
            } else {
            this.errorMessage = 'No books found. Please try a different search term.';
            }
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