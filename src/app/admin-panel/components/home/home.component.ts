import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sidebarWidth: number = 250; // Initial width of the sidebar

  constructor(private sidebarService: SidebarService , private router:Router) { }

  ngOnInit() {
    this.sidebarService.isSidebarOpen$.subscribe(isOpen => {
      if (isOpen) {
        this.sidebarWidth = 300; // Set the width when sidebar is open
      } else {
        this.sidebarWidth = 100; // Set the width when sidebar is closed
      }
    });


    
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        this.router.navigate(['../../admin-panel/login']); // Replace '/login' with the path to your login page
      }
    
  }
  logout(): void {
    localStorage.clear(); // Clear local storage
    this.router.navigateByUrl('admin-panel/login'); // Navigate to login page
  }
}
