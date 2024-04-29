import { Component } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  departments:any [] = [];
  constructor(private shared: SharedService) {
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
}
