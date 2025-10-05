import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ProductType } from '../types/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private api: ApiService,
    private http: HttpClient
  ) { }


  products(): Observable<Object> {
    return this.http.get(this.api.baseURL+'/products');
  }

  add(body: ProductType): Observable<Object> {
    return this.http.post(this.api.baseURL+'/products', body);
  }

  delete(id: Number | String): Observable<Object> {
    return this.http.delete(this.api.baseURL+'/products/'+id);
  }

  get(id: Number | String): Observable<Object> {
    return this.http.get(this.api.baseURL+'/products/'+id);
  }

  edit(id: Number | String, body: any): Observable<Object> {
    return this.http.put(this.api.baseURL+'/products/'+id, body);
  }

}
