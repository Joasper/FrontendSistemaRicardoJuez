import { Lesson } from "../../../interfaces/ICurso";

export class CursosForm {
    id: string  = "";


    name: string = '';

  
    description: string = '';


    price: number = 0;

    cantLeasson: number = 0;

    image: string = '';


    coursesIDs?: string[];
 

    leasson?: Lesson[] = [];
}