export interface ICurso {
  
    id?: string;


    name: string;

  
    description: string;


    price: number;


    image: string;


    coursesIDs?: string[];
 

    leasson: Lesson[];
    lessons?: Lesson[];
}


export interface Lesson {
    id?: string | null;

    isQuizz?: boolean;

    courseID?: string;
  // Suponiendo que también tienes una interfaz para `Course`, puedes usarla aquí.
  // Si no, puedes reemplazar `Course` con `any` o definir una interfaz adecuada.
  course?: ICurso; 
  quizzId?: string; // Este campo es opcional, indicado por `?`.
  // Suponiendo que también tienes una interfaz para `QuizLesson`, puedes usarla aquí.
  // Si no, puedes reemplazar `QuizLesson` con `any` o definir una interfaz adecuada.
  quizLesson?: QuizLesson; // Este campo es opcional.
  name: string;
  description: string;
  video: string;
  isFinished: boolean;
}

export interface QuizLesson {
    id?: string;
    lessonID?: string; // Este campo es opcional, indicado por `?`.
    // Suponiendo que también tienes una interfaz para `LessonsCourse`, puedes usarla aquí.
    // Si no, puedes reemplazar `LessonsCourse` con `any` o definir una interfaz adecuada.
    lesson?: Lesson; // Este campo es opcional.
    questions: Question[];
}

export interface Question {
    
    id?: string;
    quizID?: string;
    // Suponiendo que también tienes una interfaz para `QuizLesson`, puedes usarla aquí.
    // Si no, puedes reemplazar `QuizLesson` con `any` o definir una interfaz adecuada.
    quiz?: QuizLesson;
    question: string;
    options: IOptions;
    answer: string;
    }

    export interface IOptions{
        respuesta1: string;
        respuesta2: string;
        respuesta3: string;
    }