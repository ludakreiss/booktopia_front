import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroments';
import { GenreModel } from '../models/genre.model';
import { AuthService } from './auth.service';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class GenreService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getGenres() {
    return this.http.get<ResponseModel<GenreModel[]>>(`${environment.backendUrl}/genres`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  getGenre(id: number) {
    return this.http.get<ResponseModel<GenreModel>>(`${environment.backendUrl}/genres/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  createGenre(genre: GenreModel) {
    return this.http.post<ResponseModel<GenreModel>>(`${environment.backendUrl}/genres`, genre, {
      headers: this.authService.createAuthHeaders()
    });
  }

  updateGenre(id: number, genre: GenreModel) {
    return this.http.put<ResponseModel<GenreModel>>(`${environment.backendUrl}/genres/${id}`, genre, {
      headers: this.authService.createAuthHeaders()
    });
  }

  deleteGenre(id: number) {
    return this.http.delete<ResponseModel<any>>(`${environment.backendUrl}/genres/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }
}
