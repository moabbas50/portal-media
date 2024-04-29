import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  role: string = 'student';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    const apiUrl = 'http://127.0.0.1:8000/api/register';
    const userData = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role
    };
  
    this.http.post<any>(apiUrl, userData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'تم التسجيل بنجاح',
          text: 'تم إنشاء حسابك بنجاح',
          imageUrl: "assets/images/logo2.png"
        }).then(() => {
          this.router.navigateByUrl('/login');
        });
        // Handle response
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ في التسجيل',
          text: 'خطأ في التسجيل',
          imageUrl: "assets/images/logo2.png"
        });
        // Handle error response here
      }
    );
  }
}
