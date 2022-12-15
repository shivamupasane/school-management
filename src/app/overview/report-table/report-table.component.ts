import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit { 
  @Input() subjectList: string[]; 
  displayedColumns: string[];
  @Input() data : any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    let newData = this.data.map((element) => {
      let {report, ...state} = element;
      return {...state, ...(report)}
    })
    this.data = [...newData];
    this.displayedColumns = ['name', 'birthDate', ...(this.subjectList)];
    console.log("this.displayedColumns", this.displayedColumns);
    console.log("this.data", this.data);
  }
  editStudent(row){
      this.router.navigate(['add-student'], {state: {studentData: row}});
  }

}
