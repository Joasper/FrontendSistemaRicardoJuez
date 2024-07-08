import { HttpInterceptorFn, HttpEvent} from '@angular/common/http';
import {Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  //Verificar si el token expiró, si expiró lo remuevo.
  const expToken = localStorage.getItem("exp");
  const verifyExpireToken: boolean = expToken ? (parseInt(expToken) * 1000) < Date.now() : true;
  
  if(verifyExpireToken && token){
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    router.navigate(['/public/authenticacion'])
      // Devolver un observable vacío para cancelar la petición
    return new Observable<HttpEvent<any>>();
  }

  if(token){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(req)
};