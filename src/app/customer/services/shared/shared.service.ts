import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl:string="http://127.0.0.1:8000/api";
  constructor(private http: HttpClient) { }


  getDepartments(): Observable<any> {
    return this.http.get<any>(this.baseUrl+"/departments").pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }
  getactivites(): Observable<any> {
    return this.http.get<any>(this.baseUrl+"/activities").pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  getProjectByDepartmentID(depID:any): Observable<any> {
    return this.http.get<any>(this.baseUrl+"/departments/"+depID+"/getProjectsByDepartmentIdWithVideo").pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  GetScreenShootsByProjectID(projectid:any)
  {
    return this.http.get<any>(this.baseUrl+"/screenshots/project/"+projectid).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }


  GetReviewByProjectID(projectid:any)
  {
    return this.http.get<any>(this.baseUrl+"/projects/"+projectid+"/project-reviews").pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  postComment(commentData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl +"/project-reviews", commentData);
  }
}
