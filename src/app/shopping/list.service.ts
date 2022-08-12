import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiResponse } from '../api-response';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private API_URL = 'http://localhost:5000/api/v1/list/';

    private _handleHttpError(err: any): Observable<ApiResponse> {
        console.log(err);
        return of(err);
    }

    constructor(private http: HttpClient) { }

    getAllItems(): Observable<ApiResponse<Item[]>> {
        return this.http.get<ApiResponse<Item[]>>(this.API_URL).pipe(catchError(this._handleHttpError));
    }

    getItemById(id: string): Observable<ApiResponse<Item>> {
        return this.http.get<ApiResponse<Item>>(this.API_URL + id).pipe(catchError(this._handleHttpError));
    }

    createNewItem(item: Item): Observable<ApiResponse<Item>> {
        return this.http.post<ApiResponse<Item>>(this.API_URL, item).pipe(catchError(this._handleHttpError));
    }

    updateItem(id: string, item: Item): Observable<ApiResponse<Item>> {
        return this.http.put<ApiResponse<Item>>(this.API_URL + id, item).pipe(catchError(this._handleHttpError));
    }

    deleteItem(id: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(this.API_URL + id).pipe(catchError(this._handleHttpError));
    }
}
