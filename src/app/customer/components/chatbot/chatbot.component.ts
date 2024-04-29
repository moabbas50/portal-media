import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  message: string = '';
  chats: Chat[] = [];

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient
  ) {}

  sendChatMessage(): void {
    if (this.message.trim() !== '') {
      this.chats.push({ sender: 'user', message: this.message });

      this.http.post<any>('http://127.0.0.1:5000/chat', { message: this.message }).subscribe(
        (response) => {
          const chatbotResponse: Chat = { sender: 'chatbot', message: response.response };
          this.chats.push(chatbotResponse);
          this.scrollDown(); // Scroll down after adding a new message
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );

      this.message = '';
    }
  }

  ngOnInit() {
    // Scroll down to the component element
    this.scrollDown();
  }

  scrollDown() {
    // Scroll down to the native element of the component
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

interface Chat {
  sender: string;
  message: string;
}