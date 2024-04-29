// sidebar.component.ts
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen: boolean = true;

  constructor(private sidebarService: SidebarService) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.setSidebarState(this.isSidebarOpen);
  }

  showSidebar() {
    this.isSidebarOpen = true;
    this.sidebarService.setSidebarState(this.isSidebarOpen);
  }

  hideSidebar() {
    this.isSidebarOpen = false;
    this.sidebarService.setSidebarState(this.isSidebarOpen);
  }
}
