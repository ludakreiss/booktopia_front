import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BookModel } from '../models/book.model';
import { AuthService } from './auth.service';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class BookService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getBooks() {
    return this.http.get<ResponseModel<BookModel[]>>(
      `${environment.backendUrl}/books`
    );
  }

  getBook(id: number) {
    return this.http.get<ResponseModel<BookModel>>(
      `${environment.backendUrl}/books/${id}`,
      {
        headers: this.authService.createAuthHeaders(),
      }
    );
  }

  createBook(book: BookModel) {
    return this.http.post<ResponseModel<BookModel>>(
      `${environment.backendUrl}/books`,
      book,
      {
        headers: this.authService.createAuthHeaders(),
      }
    );
  }

  updateBook(id: number, book: BookModel) {
    return this.http.put<ResponseModel<BookModel>>(
      `${environment.backendUrl}/books/${id}`,
      book,
      {
        headers: this.authService.createAuthHeaders(),
      }
    );
  }

  deleteBook(id: number) {
    return this.http.delete<ResponseModel<any>>(
      `${environment.backendUrl}/books/${id}`,
      {
        headers: this.authService.createAuthHeaders(),
      }
    );
  }
}
