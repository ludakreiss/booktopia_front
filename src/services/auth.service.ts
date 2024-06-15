import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, RegistrationRequest, JwtResponse } from '../models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ResponseModel, ResponseStatus } from '../models/response.model';
import { environment } from '../environments/enviroments';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {
        // Read JWT from localStorage if available
        const str = localStorage.getItem('jwt');
        if (str) {
            this.getUserData();
        }
    }

    public jwtToken?: JwtResponse;
    public user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    login(model: LoginRequest): Observable<ResponseModel<JwtResponse>> {
        const loginRequest = this.http.post<ResponseModel<JwtResponse>>(`${environment.backendUrl}/api/v1/login`, model);
        loginRequest.subscribe(resp => {
            if (resp.status === ResponseStatus.SUCCESS) {
                // Save JWT in localStorage
                localStorage.setItem('jwt', JSON.stringify(resp.data));

                this.jwtToken = resp.data;
                this.getUserData();
            }
        });

        return loginRequest;
    }

    register(model: RegistrationRequest): Observable<ResponseModel<JwtResponse>> {
        const registerRequest = this.http.post<ResponseModel<JwtResponse>>(`${environment.backendUrl}/api/v1/register`, model);
        registerRequest.subscribe(resp => {
            if (resp.status === ResponseStatus.SUCCESS) {
                // Save JWT in localStorage after registration
                localStorage.setItem('jwt', JSON.stringify(resp.data));

                this.jwtToken = resp.data;
                this.getUserData();
            }
        });

        return registerRequest;
    }

    getUserData(): Observable<ResponseModel<User>> {
        const req = this.http.get<ResponseModel<User>>(`${environment.backendUrl}/api/v1/user`, {
            headers: this.createAuthHeaders()
        });
        req.subscribe(resp => {
            this.user.next(resp.data!);
        });

        return req;
    }

    logout() {
        const req = this.http.get<ResponseModel<void>>(`${environment.backendUrl}/api/v1/logout`, {
            headers: this.createAuthHeaders()
        });
        req.subscribe(resp => {
            if (resp.status === ResponseStatus.SUCCESS) {
                this.user.next(null);
            }
        });

        return req;
    }

    public createAuthHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.jwtToken?.access_token}`,
            'X-Requested-With': 'XMLHttpRequest'
        });
    }
}
