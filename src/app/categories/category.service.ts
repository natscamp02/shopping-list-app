import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../api-response';
import { Category } from './category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private API_URL = 'http://localhost:5000/api/v1/categories/';

    private _handleHttpError(err: any): Observable<ApiResponse> {
        console.log(err);
        return of(err);
    }

    constructor(private http: HttpClient) { }

    getAllCategories(): Observable<ApiResponse<Category[]>> {
        return this.http.get<ApiResponse<Category[]>>(this.API_URL).pipe(catchError(this._handleHttpError));
    }

    getCategoryById(id: string): Observable<ApiResponse<Category>> {
        return this.http.get<ApiResponse<Category>>(this.API_URL + id).pipe(catchError(this._handleHttpError));
    }

    createNewCategory(item: Category): Observable<ApiResponse<Category>> {
        return this.http.post<ApiResponse<Category>>(this.API_URL, item).pipe(catchError(this._handleHttpError));
    }

    updateCategory(id: string, item: Category): Observable<ApiResponse<Category>> {
        return this.http.put<ApiResponse<Category>>(this.API_URL + id, item).pipe(catchError(this._handleHttpError));
    }

    deleteCategory(id: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(this.API_URL + id).pipe(catchError(this._handleHttpError));
    }
}
