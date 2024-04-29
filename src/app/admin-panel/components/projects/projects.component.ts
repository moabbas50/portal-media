import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/customer/services/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectForm!: FormGroup;
  StarRating: number = 0;
  formData: FormData = new FormData();
  departments: any[] = [

  ];

  constructor(private router:Router,private fb: FormBuilder, private http: HttpClient,private shared :SharedService) { }

  ngOnInit(): void {

      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        this.router.navigate(['../../admin-panel/login']); // Replace '/login' with the path to your login page
      }

    this.initForm();
    this.getDepartments();
    this.fetchProjects();
    this.shared.getDepartments().subscribe(
      (res: any) => {
        this.departments = res;
        console.log(this.departments);
        this.departments=res;
      }
      ,
      (err) => {
        alert("Server Down");
      }
    )

  }

  initForm(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      video_demo: ['', Validators.required],
      status: ['approved'],
      department: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  getDepartments(): void {
    // Fetch departments from API and assign to this.departments
  }
  MakeRate(r: number) {
    this.StarRating = r;

  }
  handleFileInput(event: any) {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.projectForm.patchValue({
          video_demo: file
        });
        this.projectForm.get('video_demo')?.updateValueAndValidity();
    }
}


  addProject() {
    if (this.projectForm.valid) {
      this.formData = new FormData();
      const title = this.projectForm.get('title');
      const description = this.projectForm.get('description');
      const status = this.projectForm.get('status');
      const year = this.projectForm.get('year');
      const video_demo = this.projectForm.get('video_demo');
      const department = this.projectForm.get('department');
      const starRating = this.StarRating;
      // Retrieve the value associated with the 'curentUser' key from local storage
      const currentUserString = localStorage.getItem('currentUser');
      var userId;
      // Check if currentUserString is not null before parsing
      if (currentUserString !== null) {
        // Parse the string value as JSON
        const currentUser = JSON.parse(currentUserString);

        // Access the 'id' property
        userId = currentUser.id;

        console.log(userId); // Output: 1
      } else {
        console.log("No 'curentUser' found in local storage");
      }
      const coordinator_id = userId;

      // Check if form controls exist and have values before appending to formData
      if (title && title.value) {
        this.formData.append('title', title.value);
      }
      if (description && description.value) {
        this.formData.append('description', description.value);
      }
      if (status && status.value) {
        this.formData.append('status', status.value);
      }
      if (year && year.value) {
        this.formData.append('Year', year.value);
      }
      // if (videoDemo && videoDemo.value && videoDemo.value.files && videoDemo.value.files.length > 0) {
      //   const file = videoDemo.value.files[0]; // Get the file from the file input
      //   formData.append('video_demo', file, file.name); // Append the file to formData
      // }
      const file: File = this.projectForm.get('video_demo')?.value;
      this.formData.append('video_demo', file, file.name);

      console.log(video_demo);
      if (department && department.value) {
        this.formData.append('department_id', department.value);
      }

      this.formData.append('StarRating', this.StarRating.toString());

      this.formData.append('coordinator_id', coordinator_id);

      const formDataObject: any = {};
      this.formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log('formData:', formDataObject);

      this.http.post('http://127.0.0.1:8000/api/projects/store2',this. formData)
        .subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'تم اضافة المشروع بنجاح',

              imageUrl: "assets/images/logo2.png"
            }).then((result) => {
              // This code will execute when the user clicks the "OK" button
              if (result.isConfirmed) {
                this.getDepartments();
              this.  fetchProjects();
              }
            });
            // Reset form after successful submission
            this.projectForm.reset();
          },
          (error) => {
            console.error('Error adding project:', error);
          }
        );
    }
  }
  projects: any[] = [];
  fetchProjects() {
    this.http.get<any>('http://127.0.0.1:8000/api/departments/1/getProjectsByDepartmentIdWithVideo')
      .subscribe((response) => {
        this.projects = response; // Assuming the response is an array of projects
      });
  }

  deleteproject(id: any) {

    this.http.delete('http://127.0.0.1:8000/api/projects/' + id).subscribe((res => {
      this.fetchProjects();
    }));

  }
}
