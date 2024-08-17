import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsComponent } from './components/professors/professors.component';
import { FormProfessorsComponent } from './formComponents/form-professors/form-professors.component';
import { StudentsComponent } from './components/students/students.component';
import { FormStudentsComponent } from './formComponents/form-students/form-students.component';

const routes: Routes = [
  { path: 'professors', component: ProfessorsComponent },
  { path: 'professors/form', component: FormProfessorsComponent },
  { path: 'professors/form/:id', component: FormProfessorsComponent },

  { path: 'students', component: StudentsComponent },
  { path: 'students/form', component: FormStudentsComponent },
  { path: 'students/form/:id', component: FormStudentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
