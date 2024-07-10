import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { CursosForm } from '../form/cursos.form';
import { Lesson, QuizLesson } from '../../../interfaces/ICurso';
import { LeccionForm } from '../form/leccion.form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { NotificationService } from '../../../notificacion/notificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [MatTabsModule, CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  curso = new CursosForm();
  leassons: Lesson[] = [];
  leccionForm = new LeccionForm();
  quizz: { [moduleIndex: number]: QuizLesson } = {};
  url: string = 'imagepreview.jpg';

  constructor(private cursoService: CursosService, 
              private notificationSv: NotificationService,
              private router: Router
  ) {}

  siguienteTab() {
    const tabIndex = this.tabGroup.selectedIndex;
    const cantidadTabs = this.tabGroup._tabs.length;
    this.tabGroup.selectedIndex = (tabIndex! + 1) % cantidadTabs;
    this.createLeasson();
  }

  addQuizz(moduleIndex: number) {
    if (!this.quizz[moduleIndex]) {
      this.quizz[moduleIndex] = { questions: [] };
    }
    this.quizz[moduleIndex].questions.push({
      question: '',
      answer: '',
      options: {
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
      }
    });
  }

  createLeasson() {
    if (this.leassons.length === this.curso.cantLeasson) return console.log('Ya se crearon todas las lecciones');

    const cantLeasson = this.curso.cantLeasson;
    for (let i = this.leassons.length; i < cantLeasson; i++) {
      this.leassons.push({
        name: '',
        description: '',
        isQuizz: false,
        video: '',
        material: '',
        isFinished: false
      });
    }
    console.log(this.leassons);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.url = reader.result as string;
    }
    console.log(this.url);
  }

  crearCurso() {
    console.log(this.quizz);
    console.log(this.curso);
    console.log(this.leassons);
    this.curso.leasson = this.leassons;
    Object.keys(this.quizz).forEach(index => {
      this.leassons[parseInt(index)].quizLesson = this.quizz[parseInt(index)];
    });
    console.log(this.leassons);
    console.log(this.curso);
    this.curso.image = this.url;
    this.cursoService.create({
      image: this.curso.image,
      name: this.curso.name,
      description: this.curso.description,
      price: this.curso.price,
      leasson: this.leassons.map((leasson) => {
        return {
          name: leasson.name,
          description: leasson.description,
          isFinished: leasson.isFinished,
          material: leasson.material,
          video: this.extractToSrcFromIframe(leasson.video),
          isQuizz: leasson.isQuizz,
          quizLesson: leasson.quizLesson
        }
      }
      )


    }).subscribe({
      next: (res) => {
        if(res.success){
          this.notificationSv.showSuccessMessage("Curso Creado Correctamente")
          this.router.navigate(["/cursos"])
        }else if(res.success === false){
          this.notificationSv.showErrorMessage(res.error)
        }
      },
      error: (err) => console.log(err)
    });
  }

  extractToSrcFromIframe(iframe: string) {
    const src = iframe?.split('src="')[1].split('"')[0];
    return src;
  }

}
