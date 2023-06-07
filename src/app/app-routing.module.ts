import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import AppSettings from './AppSettings';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ProjectComponent } from './project/project.component';
import { BaseComponent } from './base/base.component';

const routes: Routes = [
    {
        path: AppSettings.RouteDefault,
        redirectTo: AppSettings.RouteSignup,
        pathMatch: 'full'
    },
    {
        path: AppSettings.RouteSignup,
        component: AuthComponent
    },
    {
        path: AppSettings.RouteSignin,
        component: AuthComponent
    },
    {
        path: AppSettings.RouteProject,
        component: BaseComponent,
        canActivate: [AuthGuard],
    },
    {
        path: AppSettings.RouteDashboard,
        component: BaseComponent,
        canActivate: [AuthGuard],
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
