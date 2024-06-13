import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadMoreComponent } from '../../components/read-more/read-more.component';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'div.review-book.app-page',
  standalone: true,
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.css'],
  imports: [ReadMoreComponent, CommonModule],
  providers: [BookService],
})
export class ReviewPage implements OnInit {
  book: BookModel = {
    title: '',
    description: '',
    author: '',
  };
  bookDescription?: string = '';
  protected errorMessage = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.bookService.getBook(2).subscribe({
      next: (response) => {
        const book = response.data;
        if (book) {
          this.book = book;
          this.bookDescription = book.description;
        } else {
          console.error('Data is undefined');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Failed to fetch data. Please try again later.';
      },
    });
  }
}
