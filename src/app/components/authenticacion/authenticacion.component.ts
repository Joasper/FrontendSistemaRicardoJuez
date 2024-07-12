import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../notificacion/notificacion.service';

@Component({
  selector: 'app-authenticacion',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './authenticacion.component.html',
  styleUrl: './authenticacion.component.css'
})
export class AuthenticacionComponent {

  document: string = ""
  password: string = ""

  constructor(private authService: AuthService,
              private router: Router,
              private notificacionSv: NotificationService
  ) { }

  login(){
    this.authService.login({document: this.document, password: this.password}).subscribe({
      next: (response: any) => {
        console.log(response)
        if(response.success){
          this.notificacionSv.showSuccessMessage("Bienvenido")
          this.router.navigate(["/cursos"])

        }else if(response.success === false){
          this.notificacionSv.showErrorMessage("Usuario o contraseña incorrectos")
        }

        if(response.token){
          this.notificacionSv.showSuccessMessage("Bienvenido")
          this.router.navigate(["/home/cursos"])
        }
      
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

}
