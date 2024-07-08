import { Routes } from "@angular/router";
import { CursosComponent } from "./cursos.component";
import { CrearCursoComponent } from "./crear-curso/crear-curso.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { QuizzComponent } from "./quizz/quizz.component";

export const routes: Routes = [
    {
        path: "",
        component: CursosComponent
    },
    {
        path: "nuevo",
        component: CrearCursoComponent
    },
    {
        path: "playlist/:id",
        component: PlaylistComponent
    },
    {
        path: "quizz/:id",
        component: QuizzComponent
    },
    
    
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    }
]