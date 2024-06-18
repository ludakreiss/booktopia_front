import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  LoginRequest,
  JwtResponse,
  RegistrationRequest,
} from '../models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
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
      this.jwtToken = JSON.parse(str);
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

  register(model: RegistrationRequest): Observable<ResponseModel<JwtResponse>> {
    const registerRequest = this.http.post<ResponseModel<JwtResponse>>(
      `${environment.backendUrl}/register`,
      model
    );
    registerRequest.subscribe((resp) => {
      if (resp.status === ResponseStatus.SUCCESS) {
        
      }
    });

    return registerRequest;
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
        // Clear JWT token from localStorage
        localStorage.removeItem('jwt');

        // Reset the JWT token and user state
        this.jwtToken = undefined;
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
