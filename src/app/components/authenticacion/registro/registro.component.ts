import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { NotificationService } from '../../../notificacion/notificacion.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, LoadingComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  document: string = ""
  name: string = ""
  password: string = ""
  codigo: string = ""
  isLoading: boolean = false
  isAvailableRegister: boolean = false

  constructor(private authService: AuthService,
              private router: Router,
              private notificationSv: NotificationService
  ) { }

  register() {
    this.authService.register({ document: this.document, password: this.password, name: this.name }).subscribe({
      next: (response) => {
        this.router.navigate(["/cursos"])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  validateCode() {
  

    this.isLoading = true
    this.authService.validateCode(this.codigo).subscribe({
      next: (response) => {
        if(response.success){
          this.isLoading = false
          this.notificationSv.showSuccessMessage("Código validado correctamente")
           this.isAvailableRegister = true
           return
     
        }else if(response.success === false){
          this.isAvailableRegister = false
          this.isLoading = false
         return this.notificationSv.showErrorMessage(response.message)
        }

        return this.notificationSv.showErrorMessage("Error al validar el código")
      },
      error: (error) => {
        console.error(error)
        this.isAvailableRegister = false
        this.isLoading = false
      }
    })
  }

}
