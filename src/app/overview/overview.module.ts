import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { ReportOverviewComponent } from './report-overview/report-overview.component';
import { OverviewService } from './overview.service';
import { ReportTableComponent } from './report-table/report-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    ReportOverviewComponent,
    ReportTableComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTableModule
  ],
  providers:[OverviewService]
})
export class OverviewModule { }
