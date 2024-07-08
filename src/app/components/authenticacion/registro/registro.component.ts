import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  document: string = ""
  name: string = ""
  password: string = ""

  constructor(private authService: AuthService,
              private router: Router
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

}
