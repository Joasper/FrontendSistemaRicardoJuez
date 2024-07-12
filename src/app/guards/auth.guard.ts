import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



export const authGuard: CanActivateFn = (route, state) => {
 
  const router = inject(Router); 

  const token = localStorage.getItem("token");
  const expToken = localStorage.getItem("exp");
  const verifyExpireToken: boolean = expToken ? (parseInt(expToken) * 1000) < Date.now() : true;
  console.log(verifyExpireToken)
  console.log("first")

  if(token){
    console.log("first")
    return true;
  }else {
    router.navigate(['/inicio'])
    return false;
  }

};