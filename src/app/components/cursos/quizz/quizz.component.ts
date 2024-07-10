import { Component, OnInit } from '@angular/core';
import { QuizLesson } from '../../../interfaces/ICurso';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuizService } from './quizz.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../notificacion/notificacion.service';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent  implements OnInit {

  quizz: QuizLesson = {} as QuizLesson;
  userAnswers: { [key: string]: string } = {};

  constructor(private param: ActivatedRoute, private quizService: QuizService, private router: Router, private notificationSv: NotificationService) { }

  ngOnInit(): void {
    this.param.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.quizService.getById(params.get('id')!).subscribe({
          next: (response) => {
            if (response.success) {
              this.quizz = response.data;
            }
          },
          error: (error) => {
            console.log(error)
          }
        });
      }
    });
  }

  onAnswerChange(questionId: string, answer: string): void {
    this.userAnswers[questionId] = answer;
  }

  calcularPuntuacion(): number {
    let correctAnswers = 0;
    this.quizz.questions.forEach((question) => {
      if (this.userAnswers[question.id!] === question.answer) {
        correctAnswers += 1;
      }
    });

    const totalQuestions = this.quizz.questions.length;
    const score = (correctAnswers / totalQuestions) * 100;
    console.log(score)
    if(score < 50) {
      this.notificationSv.showErrorMessage(`Tu puntuación es ${score}`);
      
    }

    this.notificationSv.showSuccessMessage(`Tu puntuación es ${score}`);
    this.redirectToCourses();
     return score;
  }

  redirectToCourses(): void {
    this.router.navigate(['/cursos/playlist/' + this.quizz.lesson?.courseID]);
  }
}
