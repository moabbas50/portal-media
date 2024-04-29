import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitesService {
url:string="http://127.0.0.1:8000/api/activities";
  constructor(private http:HttpClient) { }
  get(): Observable<any>{
    return this.http.get<any>(this.url)
  }
  create(obj: any): Observable<any> {
    return this.http.post<any>(this.url, obj)
  }
  delet(id: any) {
    return this.http.delete(this.url + `/${id}`)
  }
}
