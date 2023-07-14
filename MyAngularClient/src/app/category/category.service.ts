import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any, responseType?: any) {

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getcategories() {
    return this.request('get', `${baseUrl}/categories`);
  }

  getcategory(id: string) {
    return this.request('get', `${baseUrl}/category/${id}`);
  }

  createcategory(category: Category) {
    console.log('createcategory ' + JSON.stringify(category));
    return this.request('post', `${baseUrl}/category`, category);
  }

  updatecategory(category: Category) {
    console.log('updatecategory ' + JSON.stringify(category));
    return this.request('post', `${baseUrl}/category/${category.id}`, category);
  }

  deletecategory(id: string) {
    return this.request('delete', `${baseUrl}/category/${id}`, null, 'text');
  }
}
