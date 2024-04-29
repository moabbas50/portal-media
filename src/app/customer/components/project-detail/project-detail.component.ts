import { Component, ElementRef } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {
  baseurl = "http://127.0.0.1:8000/api/";
  screenshoots:any={};
  projectdetail : any = {};
  ReviewComments:any={};
  commentData = {
    project_id: 3,
    account_id: 1,
    rating: 5,
    comment: ''
  };
  constructor(private shared:SharedService,private elementRef: ElementRef, private route: ActivatedRoute, private http: HttpClient) {
    route.params.subscribe(result => {
     
      this.commentData.project_id = result["id"];
     this.projectdetail={
      id:result["id"],
      video:result["video"],
      description:result["description"],
      title:result["title"]

     }
      this.shared.GetScreenShootsByProjectID(result["id"]).subscribe(result => {
        console.log(result);
        this.screenshoots = result;
      });

      this.shared.GetReviewByProjectID(result["id"]).subscribe(result => {
        console.log(result);
        this.ReviewComments = result;
      });
    })
    
  }

  ngOnInit() {
    // Scroll down to the component element
    this.scrollDown();


  }


  scrollDown() {
    // Scroll down to the native element of the component
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  MakeRate(r:number)
  {
    this.commentData.rating=r;

  }
  onSubmit(): void {
    this.shared.postComment(this.commentData)
      .subscribe(
        response => {
           
          // Clear the form or perform any other actions as needed
          this.commentData.comment = '';
          this.shared.GetReviewByProjectID(this.commentData.project_id).subscribe(result => {
            console.log(result);
            this.ReviewComments = result;
          });
        },
        error => {
          alert('Error posting comment:' + error);
          // Handle error
        }
      );
  }
}
