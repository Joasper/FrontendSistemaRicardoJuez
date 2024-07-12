import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LayoutLoggedComponent } from './shared/layout-logged/layout-logged.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "",
                redirectTo: "inicio",
                pathMatch: "full"
            },
            {
                path: "inicio",
                component: InicioComponent,
                canActivate: [notAuthGuard]
            },
            {
                path: "blogs",
                loadChildren: () => import('./components/blogs-inicio/blogInicio.routes').then(m => m.routes),
                canActivate: [notAuthGuard]
            },
            {
                path: "authenticacion",
                loadChildren: () => import('./components/authenticacion/authenticacion.routes').then(m => m.routes),
                canActivate: [notAuthGuard]
            }
        ]
    },
    {
        path: "home",
        component: LayoutLoggedComponent,
        children: [
            {
                path: "",
                redirectTo: "cursos",
                pathMatch: "full"
            },
            {
                path: "cursos",
                loadChildren: () => import('./components/cursos/cursos.routes').then(m => m.routes),
                canActivate: [authGuard]
            },
            {
                path: "blog",
                loadChildren: () => import('./components/blog/blog.routes').then(m => m.routes),
                canActivate: [authGuard]
            }
        ]
    },
    {
        path: "**",
        redirectTo: "home",
        pathMatch: "full"
    }
];
