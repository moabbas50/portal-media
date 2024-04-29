import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  newDepartmentName: string = '';
  departments: any[] = [];

  constructor(private http: HttpClient,private router:Router) { }
  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      this.router.navigate(['../../admin-panel/login']); // Replace '/login' with the path to your login page
    }
    this.getDepartments();
  }
  getDepartments(){
    const apiUrl = 'http://127.0.0.1:8000/api/departments';

    this.http.get<any[]>(apiUrl).subscribe(
      response => {
        this.departments = response;
      },
      error => {
        console.error('Error fetching departments:', error);
        // Optionally, you can display an error message or handle any other action
      }
    );
  }
  addDepartment(): void {
    const apiUrl = 'http://127.0.0.1:8000/api/departments';
    const newDepartment = { name: this.newDepartmentName };

    this.http.post<any>(apiUrl, newDepartment).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'تم اضافة القسم بنجاح',
          
          imageUrl: "assets/images/logo2.png"
        }).then((result) => {
          // This code will execute when the user clicks the "OK" button
          if (result.isConfirmed) {
            this.getDepartments();
           
          }
        });
        // Optionally, you can display a success message or handle any other action
      },
      error => {
        console.error('Error adding department:', error);
        // Optionally, you can display an error message or handle any other action
      }
    );
  }
}
