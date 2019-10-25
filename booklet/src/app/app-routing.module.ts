import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { MyPlansComponent } from './my-plans/my-plans.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { EventPageComponent } from './event-page/event-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'my-plans', component: MyPlansComponent, canActivate: [AuthGuard]},
  { path: 'create-plan', component: CreatePlanComponent, canActivate: [AuthGuard]},
  { path: 'all-plans', component: AllPlansComponent, canActivate: [AuthGuard]},
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  { path: 'plan/:id', component: PlanPageComponent, canActivate: [AuthGuard]},
  { path: 'event/:id', component: EventPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
