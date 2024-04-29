import { Component, ElementRef } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  baseurl = "http://127.0.0.1:8000/api/";
  departments:any [] = [];
  selectedDepartment: any;
  projectname: any;
  projects: any = {};
  constructor(private shared: SharedService, private elementRef: ElementRef, private route: ActivatedRoute, private http: HttpClient,private router:Router) {
    this.scrollDown();
   


    this.shared.getDepartments().subscribe(
      (res: any) => {
        this.departments = res;
        console.log(this.departments);
      }
      ,
      (err) => {
        alert("Server Down");
      }
    )

  }


  ngOnInit() {
    // Scroll down to the component element
    this.scrollDown();
  }


  scrollDown() {
    // Scroll down to the native element of the component
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onDepartmentChange() {
    if (this.selectedDepartment) {
      const department = this.departments.find(d => d.id === this.selectedDepartment);
      console.log(['/Projects', department.id, department.name]);

      if (department) {
        this.projectname =  department.name;
      this.shared.getProjectByDepartmentID( department.id).subscribe(result => {
        console.log(result);
     
        this.projects = result;
      });
      }
    }
  }
}
