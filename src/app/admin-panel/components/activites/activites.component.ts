import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivitesService } from 'src/app/shared/activites.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.css']
})
export class ActivitesComponent implements OnInit {
  activeform!: FormGroup;
  StarRating: number = 0;
  formData: FormData = new FormData();
  activity: any[] = [

  ];

  constructor(private router:Router,private fb: FormBuilder,private shared :ActivitesService) {

  }

  ngOnInit(): void {

      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        this.router.navigate(['../../admin-panel/login']); // Replace '/login' with the path to your login page
      }

    this.initForm();
    this.shared.get().subscribe(
      (res: any) => {
        this.activity = res;
        console.log(this.activity);
        this.activity=res;
      }
      ,
      (err) => {
        alert("Server Down");
      }
    )

  }

  initForm(): void {
    this.activeform = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      filee: ['', Validators.required],

    });
  }


  MakeRate(r: number) {
    this.StarRating = r;

  }
  handleFileInput(event: any) {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.activeform.patchValue({
          filee: file
        });
        this.activeform.get('filee')?.updateValueAndValidity();
    }
}


  addProject() {
    if (this.activeform.valid) {
      this.formData = new FormData();
      const title = this.activeform.get('title');
      const description = this.activeform.get('description');
      const status = this.activeform.get('status');
      const year = this.activeform.get('year');
      const filee = this.activeform.get('filee');

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


      // if (videoDemo && videoDemo.value && videoDemo.value.files && videoDemo.value.files.length > 0) {
      //   const file = videoDemo.value.files[0]; // Get the file from the file input
      //   formData.append('filee', file, file.name); // Append the file to formData
      // }
      const file: File = this.activeform.get('filee')?.value;
      this.formData.append('filee', file, file.name);

      console.log(filee);

      this.formData.append('StarRating', this.StarRating.toString());

      this.formData.append('coordinator_id', coordinator_id);

      const formDataObject: any = {};
      this.formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log('formData:', formDataObject);

      this.shared.create(this.formData)
        .subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'تم اضافة الفاعلية بنجاح',

              imageUrl: "assets/images/logo2.png"
            }).then((result) => {

            });
            // Reset form after successful submission
            this.activeform.reset();
          },
          (error) => {
            console.error('Error adding project:', error);
          }
        );
    }
  }
  projects: any[] = [];


  deletactivites(id: any) {

    this.shared.delet(id).subscribe((res => {
    }));

  }
}
