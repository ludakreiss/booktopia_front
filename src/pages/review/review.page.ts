import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadMoreComponent } from '../../app/read-more/read-more.component';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReviewService } from '../../services/review.service';
import { ReviewModel } from '../../models/review.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { ReviewFormComponent } from '../../app/review-form/review-form.component';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'div.review-book.app-page',
  standalone: true,
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.css'],
  imports: [ReadMoreComponent, CommonModule, ReviewFormComponent],
  providers: [BookService, ReviewService, DatePipe],
})
export class ReviewPage implements OnInit {
  book: BookModel = {
    title: '',
    description: '',
    author: '',
    book_cover: '',
  };

  bookDescription?: string = '';
  reviewDescription?: string = '';
  errorMessage = '';
  reviews: ReviewModel[] = [];
  users: User[] = [];
  averageRatingValue: number = 0;
  amountOfReviews: number = 0;
  bookId: number = 1;
  currentUser: User | null = null;
  userId: number = 0;

  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.bookService.getBook(this.bookId).subscribe({
      next: (response) => {
        const book = response.data;
        if (book) {
          this.book = book;
          this.book.book_cover = `${environment.imageUrl}${book.book_cover}`;
          console.log(book.book_cover)
          this.bookDescription = book.description;
          this.fetchUser();
          this.fetchUsers();
          this.fetchReviews(book.id);
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

  fetchReviews(bookId?: number) {
    this.reviewService.getReviews().subscribe({
      next: (response) => {
        const allReviews = response.data;

        if (allReviews) {
          this.reviews = allReviews
            .filter((review) => review.book_id === bookId)
            .map((review) => ({
              ...review,
              user: this.users.find((user) => user.id === review.user_id),
            }));
          // Calculate the average rating
          this.averageRatingValue = this.averageRating();
          this.amountOfReviews = this.reviews.length;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching reviews:', error);
        this.errorMessage = 'Failed to fetch reviews. Please try again later.';
      },
    });
  }
  fetchUser() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.userId = this.currentUser.id;
        console.log(user)
      }
    });
  }
  fetchUsers() {
    this.authService.getAllUsersData().subscribe({
      next: (response: any) => {
        if (response.status === 'success' && response.data) {
          this.users = response.data.map((userData: any) => ({
            id: userData.id,
            name: userData.name,
            profile_picture: userData.profile_picture,
          }));

          this.updateReviewsWithUsers();
        } else {
          console.error('Failed to fetch users. Response:', response);
          this.errorMessage = 'Failed to fetch users. Please try again later.';
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Failed to fetch users. Please try again later.';
      },
    });
  }
  updateReviewsWithUsers() {
    this.reviews.forEach((review) => {
      const user = this.users.find((u) => u.id === review.user_id);
      if (user) {
        review.user = user;
      }
    });
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') ?? '';
  }

  getStars(rating: number): Array<{ filled: boolean; half: boolean }> {
    return Array(5)
      .fill({})
      .map((_, index) => ({
        filled: index < Math.floor(rating),
        half: index < rating && index >= Math.floor(rating),
      }));
  }

  averageRating(): number {
    if (this.reviews.length === 0) {
      return 0;
    }
    let sumRatings = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      sumRatings += this.reviews[i].rating;
    }
    return sumRatings / this.reviews.length;
  }
}
