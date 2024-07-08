import { Injectable } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { QuizLesson } from '../../../interfaces/ICurso';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuizService extends BaseService<QuizLesson> {

    constructor(private httpClient: HttpClient) {
        super(httpClient)
    }

    override getResourceUrl(): string {
        return '/quizz-lesson';
    }

  
}