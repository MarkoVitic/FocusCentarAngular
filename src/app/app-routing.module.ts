import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsComponent } from './components/professors/professors.component';
import { FormProfessorsComponent } from './formComponents/form-professors/form-professors.component';

const routes: Routes = [
  { path: 'professors', component: ProfessorsComponent },
  { path: 'professors/form', component: FormProfessorsComponent },
  { path: 'professors/form/:id', component: FormProfessorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
