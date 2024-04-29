import { Component } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.css']
})
export class ProjectSelectComponent {

  constructor(private shared: SharedService,private router: Router) {
  
  }
 
}
