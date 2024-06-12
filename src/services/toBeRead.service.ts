import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroments';
import { ToBeReadModel } from '../models/toBeRead.model';
import { AuthService } from './auth.service';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class ToBeReadService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getToBeReadList() {
    return this.http.get<ResponseModel<ToBeReadModel[]>>(`${environment.backendUrl}/toberead`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  getToBeReadItem(id: number) {
    return this.http.get<ResponseModel<ToBeReadModel>>(`${environment.backendUrl}/toberead/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }

  addToBeReadItem(item: ToBeReadModel) {
    return this.http.post<ResponseModel<ToBeReadModel>>(`${environment.backendUrl}/toberead`, item, {
      headers: this.authService.createAuthHeaders()
    });
  }

  removeToBeReadItem(id: number) {
    return this.http.delete<ResponseModel<any>>(`${environment.backendUrl}/toberead/${id}`, {
      headers: this.authService.createAuthHeaders()
    });
  }
}
