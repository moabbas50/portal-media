import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private accessToken = '3796899bd37c423bad3a21a25277bce0';
  private baseUrl = 'https://api.api.ai/api/query?v=2015091001';
  private sessionId = '20150910';

  constructor(private http:HttpClient   ) { }

  sendMessage(text: string) {
    const payload = { message: text };
    return this.http.post<any>('http://127.0.0.1:5000/chat', payload)
      .toPromise()
      .then(response => {
        console.log(response.response)
        return response.response;
        
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
  
}