import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICurso, Lesson } from '../../interfaces/ICurso';
import { CursosService } from './cursos.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit {

  cursos: ICurso[] = []
  isLoading: boolean = false;

  constructor(private readonly cursosService: CursosService,
              private readonly router: Router
  ) { }

  ngOnInit(): void {

    this.cursosService.getAll().subscribe({
      next: (cursos) => {
        this.cursos = cursos.data;
      },
      error: (error) => {
        console.error('Error al obtener los cursos', error);
      }
    })

    this.extractToSrcFromIframe('<iframe width="560" height="315" src="https://www.youtube.com/embed/2cOmrptlue0?si=_foX8sTk1uKIve-V" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>') 
    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false
    }, 4000)

  }

  extractToSrcFromIframe(iframe: string) {
    const src = iframe.split('src="')[1].split('"')[0];
    console.log(src)
    return src;
  }


  verCurso(curso: ICurso) {

    this.router.navigate(['/cursos/playlist/' + curso.id])
    console.log(curso)
  }

}
