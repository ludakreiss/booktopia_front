import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // async getBookSearch(word: string): Promise<any> {
  // const response = await new Promise((resolve, reject) => {
  //   this.http.get(environment.backendUrl + `/v1/search/default?search=${word}`, {
  //     headers: this.authService.createAuthHeaders()
  //   }).subscribe(data => {
  //     resolve(data);
  //   }, err => {
  //     reject(err);
  //   });
  // });

  getBookSearch(word: string) {
    return this.http.get(
      `${environment.backendUrl}/search/default?search=${word}`,
      {
        headers: this.authService.createAuthHeaders(),
      }
    );
  }
}
