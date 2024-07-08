import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LayoutLoggedComponent } from './shared/layout-logged/layout-logged.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';

export const routes: Routes = [
    {
        path: "public",
        component: LayoutComponent,
        children: [
            {
                path: "inicio",
                component: InicioComponent
            },
            {
                path: "authenticacion",
                loadChildren: () => import('./components/authenticacion/authenticacion.routes').then(m => m.routes),
                canActivate: [notAuthGuard]
            },
            {
                path: "**",
                redirectTo: "inicio",
                pathMatch: "full"

            }
        ]
    },
    {
        path: "",
        component: LayoutLoggedComponent,
        children: [
            {
                path: "cursos",
                loadChildren: () => import('./components/cursos/cursos.routes').then(m => m.routes),
                canActivate: [authGuard]
            
            },
            {
                path: "**",
                redirectTo: "cursos",
                pathMatch: "full"

            }
        ]
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    }
];
