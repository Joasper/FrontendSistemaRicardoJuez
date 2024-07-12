import { Component } from '@angular/core';
import { ICurso } from '../../interfaces/ICurso';
import { CursosService } from '../cursos/cursos.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, LoadingComponent, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  searchTermCurso: string = '';
  filteredCursos: ICurso[] = [];

  placeholderText = '';
  private phrases = ["Derecho Penal", "Derecho Civil", "Derecho Administrativo"];
  private currentPhrase = 0;
  private currentLetter = 0;
  private forward = true;
  private typingSpeed = 200;
  isLoading: boolean = false;
  cursos: ICurso[] = []

 



  constructor(private readonly cursosService: CursosService) { }

  ngOnInit(): void {
    this.type();
    this.isLoading = true;
    this.cursosService.getAll().subscribe({
      next: (cursos) => {
        this.cursos = cursos.data;
        this.isLoading = false;
        this.filteredCursos =cursos.data
      },
      error: (error) => {
        console.error('Error al obtener los cursos', error);
        this.isLoading = false;
      }
    })


    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false
    }, 4000)

  }

  private type() {
    if (this.forward) {
      if (this.currentLetter < this.phrases[this.currentPhrase].length) {
        this.placeholderText += this.phrases[this.currentPhrase].charAt(this.currentLetter);
        this.currentLetter++;
        setTimeout(() => this.type(), this.typingSpeed);
      } else {
        setTimeout(() => this.type(), this.typingSpeed * 3);
        this.forward = false;
      }
    } else {
      if (this.currentLetter > 0) {
        this.placeholderText = this.placeholderText.substring(0, this.placeholderText.length - 1);
        this.currentLetter--;
        setTimeout(() => this.type(), this.typingSpeed);
      } else {
        this.forward = true;
        this.currentPhrase++;
        if (this.currentPhrase >= this.phrases.length) {
          this.currentPhrase = 0;
        }
        setTimeout(() => this.type(), this.typingSpeed * 3);
      }
    }

  }

  onSearchChange() {

    if(this.searchTermCurso === '') {
      this.cursos = this.filteredCursos
      return
    }else {
    this.cursos = this.cursos.filter((curso) => curso.name.toLowerCase().includes(this.searchTermCurso.toLowerCase()))
    }
    
  }

  

}
