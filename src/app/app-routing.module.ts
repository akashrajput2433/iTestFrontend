import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { TakeTestComponent } from './take-test/take-test.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent}, //canActivate: [AuthGuard]
  { path: 'quiz', component: QuizComponent}, //canActivate: [AuthGuard] 
  { path: 'profile/edit', component: ProfileEditComponent }, //canActivate: [AuthGuard] 
  { path: 'take-test/:id', component: TakeTestComponent }, 
  { path: 'result', component: ResultComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
