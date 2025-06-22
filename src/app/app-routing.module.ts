import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { TakeTestComponent } from './take-test/take-test.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'register', component: RegisterComponent },
  {path:'dashboard', component: DashboardComponent},
  { path: 'quiz', component: QuizComponent },
  { path: 'profile/edit', component: ProfileEditComponent },
  { path: 'take-test/:id', component: TakeTestComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
