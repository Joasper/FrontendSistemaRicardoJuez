import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { HttpClient } from "@angular/common/http";
import { ICurso } from "../../interfaces/ICurso";
import { Observable } from "rxjs";
import { NormalizeResponse } from "../../interfaces/normalize-response";
import { ICode } from "../../interfaces/Icode";
import { enviroment } from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class CursosService extends BaseService<ICurso>{

  constructor(private httpClient: HttpClient) { 
    super(httpClient)
  }

  getResourceUrl(): string {
    return '/courses';
  }


  generarCodigo(): Observable<NormalizeResponse<ICode>> {

      
    return this.httpClient.get<NormalizeResponse<ICode>>(`${enviroment.API_URL}/code-generator` , {});
  }



}