import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { HttpClient } from "@angular/common/http";
import { ICurso } from "../../interfaces/ICurso";

@Injectable({providedIn: 'root'})

export class CursosService extends BaseService<ICurso>{

  constructor(private httpClient: HttpClient) { 
    super(httpClient)
  }

  getResourceUrl(): string {
    return '/courses';
  }




}