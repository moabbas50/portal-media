import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  ngOnInit(): void {

  }
  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    const apiUrl = 'http://127.0.0.1:8000/api/login';
  const credentials = { email: this.email, password: this.password };

  this.http.post<any>(apiUrl, credentials).subscribe(
    response => {
      if (response.user) {
        // Login successful, store user info in local storage
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        console.log(response);
        // Navigate to admin panel home
        this.router.navigateByUrl('/admin-panel/home');
      } else {
        // Login failed, show error message
        Swal.fire({
          icon: 'error',
          title: 'خطأ في تسجيل الدخول',
          text: 'بريد إلكتروني أو كلمة مرور غير صحيحة',
          imageUrl: "assets/images/logo2.png"
        });

      }
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في تسجيل الدخول',
        text: 'بريد إلكتروني أو كلمة مرور غير صحيحة',
        imageUrl: "assets/images/logo2.png"
      });
      // Handle error response here
    }
  );
  }

  goToSignUp(): void {
    this.router.navigate(['../../admin-panel/signup']);
  }
}
