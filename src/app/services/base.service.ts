import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {Params} from "@angular/router";
import { enviroment } from '../environments/environment';
import { NormalizeResponse } from '../interfaces/normalize-response';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

  private readonly API_URL: string = enviroment.API_URL + this.getResourceUrl();
  private readonly API_URL_CONDITION: string =   enviroment.API_URL + this.getResourceUrl() + enviroment.API_URL_CONDITION;
  protected constructor(protected http: HttpClient) { }

  abstract getResourceUrl(): string;
  

  getAll():Observable<NormalizeResponse<T[] >>{
    return this.http.get<NormalizeResponse<T[]>>(this.API_URL).pipe(

    );
  }

  getByCondition( params?: Params):Observable<NormalizeResponse<T>>{
    return this.http.get<NormalizeResponse<T>>(`${this.API_URL_CONDITION}`, {
      params: params

    } );
  }

  getById(id:string, params?: Params):Observable<NormalizeResponse<T>>{
    return this.http.get<NormalizeResponse<T>>(`${this.API_URL}/`+ id , params);
  }

  create(entity:T, params?:Params):Observable<NormalizeResponse<T>>{
    return this.http.post<NormalizeResponse<T>>(`${this.API_URL}`, entity, {
      params: params

    });
  }

  update(entity:T, params?: Params):Observable<NormalizeResponse<T>>{
    return this.http.put<NormalizeResponse<T>>(`${this.API_URL}`, entity, {
      params: params
    } );
  }

  delete(id?:number, params?: Params):Observable<NormalizeResponse<T>>{
    return this.http.delete<NormalizeResponse<T>>(`${this.API_URL}`, {
      params: params
    });
  }

}