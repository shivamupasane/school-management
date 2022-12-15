import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "overview",
  loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule)
},
{
  path: "add-student",
  loadChildren: () => import('./student-profile/student-profile.module').then(m => m.StudentProfileModule)
},
{
  path: '',
  redirectTo: 'overview',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
