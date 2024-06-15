import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, JwtResponse } from '../models/auth.model';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { ResponseModel, ResponseStatus } from '../models/response.model';
import { environment } from '../environments/environment.development';
import { Users } from '../models/users.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
    // Read JWT
    const str = localStorage.getItem('jwt');
    if (str) {
      this.getUserData();
    }
  }

  public jwtToken?: JwtResponse;

  public user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  public allUsers: BehaviorSubject<Users | null> =
    new BehaviorSubject<Users | null>(null);



  login(model: LoginRequest) {
    const loginRequest = this.http.post<ResponseModel<JwtResponse>>(
      `${environment.backendUrl}/login`,
      model
    );
    loginRequest.subscribe((resp) => {
      if (resp.status === ResponseStatus.SUCCESS) {
        //Save JWT
        localStorage.setItem('jwt', JSON.stringify(resp.data));

        this.jwtToken = resp.data;
        this.getUserData();
      }
    });

    return loginRequest;
  }

  getUserData() {
    const req = this.http.get<ResponseModel<User>>(
      `${environment.backendUrl}/login`,
      {
        headers: this.createAuthHeaders(),
      }
    );
    req.subscribe((resp) => {
      this.user.next(resp.data!);
    });

    return req;
  }
  getAllUsersData() {
    const req = this.http.get<ResponseModel<Users>>(
      `${environment.backendUrl}/users`,
      {
        headers: this.createAuthHeaders(),
      }
    );
   req.subscribe((resp) => {
      if (resp.status === ResponseStatus.SUCCESS && resp.data) {
        this.allUsers.next(resp.data);
      } else {
        this.allUsers.next(null);
      }
    });

    return req;
  }
  logout() {
    const req = this.http.get<ResponseModel<void>>(
      `${environment.backendUrl}/logout`,
      {
        headers: this.createAuthHeaders(),
      }
    );
    req.subscribe((resp) => {
      if (resp.status === ResponseStatus.SUCCESS) {
        this.user.next(null);
      }
    });

    return req;
  }

  public createAuthHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.jwtToken?.access_token}`,
      'X-Requested-With': 'XMLHttpRequest',
    });
  }
}
