import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OverviewService } from 'src/app/overview/overview.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  studentProfileForm: FormGroup;
  classes: Array<any> = null;
  tenthFormGroup: FormGroup;
  twelthFormGroup: FormGroup;
  studentData;
  constructor(private fb: FormBuilder, private overviewService: OverviewService, private router: Router) {
    if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state){
      this.studentData = this.router.getCurrentNavigation().extras.state['studentData'];
    }
  }

  ngOnInit(): void {
    this.overviewService.getClassesConfig().subscribe((response: any) => {
      console.log("response", response);
      this.classes = response? response.classes : null;
  });
  if(this.studentData){
    this.studentProfileForm = this.fb.group({
      name: [this.studentData.name, Validators.required],
      email: [this.studentData.email, Validators.required],
      phoneNo: [this.studentData.phoneNo, Validators.required],
      birthDay: [moment(this.studentData.birthDate, 'DD/MM/YYYY').format('MM/DD/YYYY'), Validators.required],
      sex: [this.studentData.sex, Validators.required],
      standard: [this.studentData.standard, Validators.required]
    })
    if(this.studentProfileForm.controls['standard'].value === "12th"){
      this.twelthFormGroup = this.fb.group({
        "maths": [this.studentData.maths, Validators.required],
        "chemistry": [this.studentData.chemistry, Validators.required],
        "physics": [this.studentData.physics, Validators.required]
      })
  }
  if(this.studentProfileForm.controls['standard'].value === "10th"){
    this.tenthFormGroup = this.fb.group({
      "english": [this.studentData.english, Validators.required],
      "science": [this.studentData.science, Validators.required],
      "mathematics": [this.studentData.mathematics, Validators.required]
    })
  }
  } else {
    this.studentProfileForm = this.fb.group({
      name: [],
      email: [],
      phoneNo: [],
      birthDay: [],
      sex: [],
      standard: []
    })
    this.tenthFormGroup = this.fb.group({
      "english": [],
      "science": [],
      "mathematics": []
    })
    this.twelthFormGroup = this.fb.group({
      "maths": [],
      "chemistry": [],
      "physics": []
    })
  }
    
  }
  onSubmit(){
    const payload = this.preparePayload();
    this.overviewService.addStudent(payload).subscribe((response) => {
        if(response){
          window.alert("student added successfully");
        }
    })
    
  }
  preparePayload(){
    let studentProfile = {...this.studentProfileForm.value};
    studentProfile.birthDay = moment(studentProfile.birthDay, 'MM//DD/YYYY').format('DD/MM/YYYY');
    let report = {};
    if(this.studentProfileForm.controls['standard'].value === "12th"){
        report = {...this.twelthFormGroup.value};
    }
    if(this.studentProfileForm.controls['standard'].value === "10th"){
      report = {...this.tenthFormGroup.value};
    }
    studentProfile = {...studentProfile, report: report};
    return studentProfile;
  }
}
