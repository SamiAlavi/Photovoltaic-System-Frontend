import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import AppSettings from './AppSettings';

const routes: Routes = [
    { path: AppSettings.RouteDefault, redirectTo: AppSettings.RouteSignup, pathMatch: 'full' },
    { path: AppSettings.RouteSignup, component: AuthComponent },
    { path: AppSettings.RouteSignin, component: AuthComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
