import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { ReviewModel } from '../../models/review.model';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css',
  providers: [ReviewService],
})
export class ReviewFormComponent {
  @Input() bookId!: number;
  @Input() userId!: number;

  rating: number = 1;

  protected reviewForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    rating: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    review_text: new FormControl('', [Validators.maxLength(1024)]),
  });

  constructor(private reviewService: ReviewService) {}
  
  setRating(star: number): void {
    this.rating = star;
    this.reviewForm.patchValue({ rating: this.rating });
  }
  onSubmit(): void {
    if (this.reviewForm.valid) {
      const review: ReviewModel = {
        user_id: this.userId,
        book_id: this.bookId,
        title: this.reviewForm.value.title!,
        rating: this.reviewForm.value.rating!,
        review_text: this.reviewForm.value.review_text || '',
      };
  
      this.reviewService.createReview(review).subscribe({
        next: (response) => {
          console.log('Review submitted successfully:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error submitting review:', error);
        },
      });
    }
  }
}
