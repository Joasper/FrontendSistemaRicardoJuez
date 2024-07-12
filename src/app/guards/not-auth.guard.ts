import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

export const notAuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const token = localStorage.getItem("token")
   
     if(token){
       router.navigate(['/home/cursos'])
       return false;
     }
     return true;
   };
   