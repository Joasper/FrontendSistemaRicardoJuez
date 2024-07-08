import { ICurso, QuizLesson } from "../../../interfaces/ICurso";

export class LeccionForm {
    id: string | null = null;
    courseID?: string | null = null;
    // Suponiendo que también tienes una interfaz para `Course`, puedes usarla aquí.
    // Si no, puedes reemplazar `Course` con `any` o definir una interfaz adecuada.
    course?: ICurso; 
    isExam?: string = "false";
    quizzId?: string; // Este campo es opcional, indicado por `?`.
    // Suponiendo que también tienes una interfaz para `QuizLesson`, puedes usarla aquí.
    // Si no, puedes reemplazar `QuizLesson` con `any` o definir una interfaz adecuada.
    quizLesson?: QuizLesson; // Este campo es opcional.
    name: string = '';
    description: string = '';
    video: string = '';
    isFinished: boolean = false;
}