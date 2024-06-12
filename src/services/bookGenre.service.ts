import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroments';
import { BookGenreModel } from '../models/bookGenre.model';
import { AuthService } from './auth.service';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class BookGenreService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getBookGenres() {
    return this.http.get<ResponseModel<BookGenreModel[]>>(`${environment.backendUrl}/bookgenres`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  getBookGenre(id: number) {
    return this.http.get<ResponseModel<BookGenreModel>>(`${environment.backendUrl}/bookgenres/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  addBookGenre(item: BookGenreModel) {
    return this.http.post<ResponseModel<BookGenreModel>>(`${environment.backendUrl}/bookgenres`, item, {
      headers: this.authService.createAuthHeaders()
    });
  }

  removeBookGenre(id: number) {
    return this.http.delete<ResponseModel<any>>(`${environment.backendUrl}/bookgenres/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }
}
