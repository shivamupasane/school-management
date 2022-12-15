import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OverviewService } from '../overview.service';

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.scss']
})
export class ReportOverviewComponent implements OnInit {
  classOverviewForm: FormGroup = new FormGroup({});
  classes: Array<any> = null;
  subjects: Array<string> = null;
  resultTypes = ['quarterly', 'halfYearly', 'annually'];
  showLoader: boolean = false;
  searchResults: any[];
  constructor(private fb: FormBuilder, private overviewService: OverviewService) { }

  ngOnInit(): void {
    this.classOverviewForm = this.fb.group({
        standard: ['', Validators.required],
        subject: ['all', Validators.required],
        resultType: ['quarterly', Validators.required]
    });
    this.overviewService.getClassesConfig().subscribe((response: any) => {
        console.log("response", response);
        this.classes = response? response.classes : null;
    });
    this.classOverviewForm.controls['standard'].valueChanges.subscribe((standard) => {
          this.classes.forEach((val) => {
            if(val.name === standard){
              this.subjects = val.subjects;
            }
          })
    })
  }
  onSubmit(){
    console.log(this.classOverviewForm?.value);
    if(this.classOverviewForm.valid){
      this.searchResults = [];
      this.showLoader = true;
      this.overviewService.searchStudents(this.classOverviewForm.value).subscribe((response: any) => {
         this.searchResults = response? response.students : [];
         this.showLoader = false;
      })
    }
    
  }
}
