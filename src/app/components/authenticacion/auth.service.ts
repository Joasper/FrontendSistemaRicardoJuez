import { Injectable } from "@angular/core";

import { JwtHelperService } from "@auth0/angular-jwt";
import { ITokenDecode } from "../../interfaces/ITokenDecode";
import { Observable, tap } from "rxjs";
import { NormalizeResponse } from "../../interfaces/normalize-response";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { enviroment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })

export class AuthService {

    protected API_URL = enviroment.API_URL + "/auth/login";

    private jwtHelper = new JwtHelperService();
    constructor(private http: HttpClient,
        private router: Router
    ) { }

    login(credentials: { document: string, password: string }): Observable<{ token: string; }> {
        return this.http.post<{ token: string; }>(this.API_URL, credentials).pipe(
            tap((response: any) => {
                console.log({ response })
               if(response.success){
                this.setSession(response.token);
               }else if(response.token){
                this.setSession(response.token);
               }

            })
        );
    }
    logout() {
      
        localStorage.removeItem("token");
        localStorage.removeItem("exp");
        this.router.navigate(["/public/authenticacion/login"])
    }

    register(credentials: { document: string, password: string, name: string }): Observable<{ token: string; }> {
        this.API_URL = enviroment.API_URL + "/auth/register";
        return this.http.post<{ token: string; }>(this.API_URL, credentials).pipe(
            tap(response => {
                console.log(response)
                this.setSession(response.token);

            })
        );

    }
    decodeToken(token: string): ITokenDecode {
        const tokenDecode = this.jwtHelper.decodeToken(token);
        console.log(tokenDecode)
        return tokenDecode;

    }
    setSession(setInformationToken: string) {
        const token: ITokenDecode = this.decodeToken(setInformationToken)
        localStorage.setItem("token", setInformationToken);
        localStorage.setItem("exp", token.exp.toString());

    }

    getUser(): ITokenDecode {
        const token = localStorage.getItem("token");
        return this.decodeToken(token!);
    }   
}