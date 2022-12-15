import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private http: HttpClient) { }
  getClassesConfig(){
    return this.http.get("/classes");
  }
  searchStudents(payload){
    return this.http.post("/searchStudents", payload);
  }
  addStudent(payload){
    console.log(payload);
    return this.http.post("/student", payload);
  }
}
