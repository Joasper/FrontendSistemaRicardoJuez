import { Routes } from "@angular/router";
import { AuthenticacionComponent } from "./authenticacion.component";
import { RegistroComponent } from "./registro/registro.component";

export const routes: Routes = [
    {
        path: "login",
        component: AuthenticacionComponent
    },
    {
        path: "register",
        component: RegistroComponent
    },
    {
        path: "**",
        redirectTo: "login",
        pathMatch: "full"
    }
]