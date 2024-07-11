import { Routes } from "@angular/router";
import { BlogsInicioComponent } from "./blogs-inicio.component";
import { LeerBlogComponent } from "./leer-blog/leer-blog.component";

export const routes: Routes = [
    {
        path: "",
        component: BlogsInicioComponent
    },
    {
        path: ":id",
        component: LeerBlogComponent
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    }
]