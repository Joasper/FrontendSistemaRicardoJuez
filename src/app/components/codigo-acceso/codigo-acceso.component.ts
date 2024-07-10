import { Component } from '@angular/core';
import { NotificationService } from '../../notificacion/notificacion.service';
import { CursosService } from '../cursos/cursos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-codigo-acceso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './codigo-acceso.component.html',
  styleUrl: './codigo-acceso.component.css'
})
export class CodigoAccesoComponent {

  codigo: string = ""

  constructor(private notificationSv: NotificationService,
              private cursosSv: CursosService
  ) { }


  generarCodigo(){
    this.cursosSv.generarCodigo().subscribe({
      next: (response) => {
        if(response.success){
          this.codigo = response.data.code
          this.notificationSv.showSuccessMessage("Código generado correctamente")
        }else if(response.success === false){
          this.notificationSv.showErrorMessage(response.message)
        }
      },
      error: (error) => {
        console.error(error)
        this.notificationSv.showErrorMessage("Error al generar el código")
      }
    })
  }

}
