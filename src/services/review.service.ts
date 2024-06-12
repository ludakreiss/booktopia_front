import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroments';
import { ReviewModel } from '../models/review.model';
import { AuthService } from './auth.service';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class ReviewService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getReviews() {
    return this.http.get<ResponseModel<ReviewModel[]>>(`${environment.backendUrl}/reviews`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  getReview(id: number) {
    return this.http.get<ResponseModel<ReviewModel>>(`${environment.backendUrl}/reviews/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  createReview(review: ReviewModel) {
    return this.http.post<ResponseModel<ReviewModel>>(`${environment.backendUrl}/reviews`, review, {
      headers: this.authService.createAuthHeaders()
    });
  }

  updateReview(id: number, review: ReviewModel) {
    return this.http.put<ResponseModel<ReviewModel>>(`${environment.backendUrl}/reviews/${id}`, review, {
      headers: this.authService.createAuthHeaders()
    });
  }

  deleteReview(id: number) {
    return this.http.delete<ResponseModel<any>>(`${environment.backendUrl}/reviews/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }
}
