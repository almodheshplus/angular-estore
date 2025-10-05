import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) { }

  get pages() {
    return this.http.get(this.api.baseURL+'/pages')
  }
}
