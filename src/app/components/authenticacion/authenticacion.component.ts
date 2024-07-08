import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
              private router: Router
  ) { }

  login(){
    this.authService.login({document: this.document, password: this.password}).subscribe({
      next: (response) => {
        console.log(response)
        this.router.navigate(["/cursos"])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

}
