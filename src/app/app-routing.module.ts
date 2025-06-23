import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { TakeTestComponent } from './take-test/take-test.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedLayoutComponent } from './shared-layout/shared-layout.component';

const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Protected routes with shared layout
  {
    path: '',
    component: SharedLayoutComponent,
    
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
      { path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'take-test/:id', component: TakeTestComponent },
      { path: 'result', component: ResultComponent }
    ]
  },

  // 404
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
