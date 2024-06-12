import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroments';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers() {
    return this.http.get<ResponseModel<User[]>>(`${environment.backendUrl}/users`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  getUser(id: number) {
    return this.http.get<ResponseModel<User>>(`${environment.backendUrl}/users/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  createUser(user: User) {
    return this.http.post<ResponseModel<User>>(`${environment.backendUrl}/users`, user, {
      headers: this.authService.createAuthHeaders()
    });
  }

  updateUser(id: number, user: User) {
    return this.http.put<ResponseModel<User>>(`${environment.backendUrl}/users/${id}`, user, {
      headers: this.authService.createAuthHeaders()
    });
  }

  deleteUser(id: number) {
    return this.http.delete<ResponseModel<any>>(`${environment.backendUrl}/users/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }
}
