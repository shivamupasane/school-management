import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportOverviewComponent } from './report-overview/report-overview.component';

const routes: Routes = [{
  path: '',
  component: ReportOverviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
