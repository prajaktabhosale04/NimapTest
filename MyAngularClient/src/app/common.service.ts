import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class CommonService {

    baseURL: string = "https://localhost:3333/";

    constructor(private http: HttpClient) {
    }

    getCommonListing(): Observable<any> {
        return this.http.get(this.baseURL + 'commonListing');
    }

}