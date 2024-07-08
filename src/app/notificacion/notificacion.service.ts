import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

   showSuccessMessage(message: string):Promise<SweetAlertResult<any>> {
    return  Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      confirmButtonColor: '#d33',

    });
  }

  showErrorMessage(message: string):Promise<SweetAlertResult<any>>  {
   return Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,

    });
  }

  showWarningMessage(message: string) {
   return Swal.fire({
      icon: 'warning',
      title: message,
      showCancelButton:true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si, Deseo Eliminarlo',
      showConfirmButton: true,

    });
  }

  showWarningMessageCustom(message: string, confirmButtonText: string) {
    return Swal.fire({
      icon: 'warning',
      title: message,
      showCancelButton:true,
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      confirmButtonText: confirmButtonText,
      showConfirmButton: true,

    });
  }

  showInfoMessage(message: string) {
    Swal.fire({
      icon: 'info',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showQuestionMessage(message: string) {
    Swal.fire({
      icon: 'question',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showCustomMessage(icon: any, message: string) {
    Swal.fire({
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showCustomMessageWithButton(icon: any, message: string, buttonText: string) {
    Swal.fire({
      icon: icon,
      title: message,
      confirmButtonText: buttonText
    });
  }

  showCustomMessageWithTwoButtons(icon: any, message: string, confirmButtonText: string, cancelButtonText: string) {
    Swal.fire({
      icon: icon,
      title: message,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }


}