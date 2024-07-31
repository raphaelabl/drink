import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LogoutComponent } from './Pages/logout/logout.component';
import { DrinksComponent } from './Pages/drinks/drinks.component';
import { LocationsComponent } from './Pages/locations/locations.component';
import { authGuard } from './shared/services/auth.service';


export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full'},
    { path:'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent, canActivate: [authGuard]},
    { path:'drink', component: DrinksComponent, canActivate: [authGuard]},
    { path:'location', component: LocationsComponent, canActivate: [authGuard]},
    { path:'settings', component: DrinksComponent, canActivate: [authGuard]},
    { path:'logout', component: LogoutComponent, canActivate: [authGuard]},
    { path: '**', redirectTo: ""},
];
