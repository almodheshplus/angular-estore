import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {
  public data!: any;

  constructor(
    protected api: ApiService,
    protected http: HttpClient
  ) {}

  fetchData(): Observable<any> {
    return this.http.get(this.api.baseURL+'/siteInfo');
  }

}
