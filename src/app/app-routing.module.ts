import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    { path: '', redirectTo: '/auth/signup', pathMatch: 'full' },
    {
        path: 'auth', children: [
            { path: 'signin', component: AuthComponent },
            { path: 'signup', component: AuthComponent },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
