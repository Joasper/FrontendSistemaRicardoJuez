
import { IBlogs } from '../../interfaces/IBlog';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../services/base.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BlogServide extends BaseService<IBlogs> {

    constructor(private httpClient: HttpClient) {
        super(httpClient)
    }

    getResourceUrl(): string {
        return '/blog';
    }
}