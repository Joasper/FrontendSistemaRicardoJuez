import { Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { CreateBlogComponent } from "./create-blog/create-blog.component";
import { LeerBlogComponent } from "./leer-blog/leer-blog.component";

export const routes: Routes = [
    {
        path: "",
        component: BlogComponent
    },
    {
        path: "crear",
        component: CreateBlogComponent
    },
    {
        path: "leer/:id",
        component: LeerBlogComponent
    },

    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    }
]