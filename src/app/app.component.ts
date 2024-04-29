import { Component } from '@angular/core';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portal-Media-FrontEnd';
  userInput: string = '';
  chatbotClosed: boolean = true;
  messages: { content: string; isUser: boolean }[] = []; // Array to store user and AI messages
  load: boolean = false;
  constructor(private chatbotService: ChatbotService) {
    this.aiMessage('Hi there 🖐... مرحبا بك في جامعة 6 اكتوبر كلية اعلام')
  }
  sendMessage() {
    const text = this.userInput.trim();
    if (text.length > 0) {
      this.userMessage(text); // Display user message immediately
      this.userInput = ''; // Clear input after sending
      this.load = true;
      this.aiMessage('', true) // Display "Loading..." message

        .then(() => {
          // After 2 seconds, call the AI service
          return this.chatbotService.sendMessage(text);
        })
        .then(response => {
          // Display AI response
          this.aiMessage(response);
          this.messages = this.messages.filter(message => message.content !== 'Loading...');
          this.load = false;
        })
        .catch(error => {
          // Handle errors
          this.aiMessage(' Feel free to call our support team directly at 01xxxxxxxxx.');
        });
    }
  }


  userMessage(content: string) {
    // Logic to display user message
    this.messages.push({ content: content, isUser: true });
  }

  aiMessage(content: string, isLoading: boolean = false) {
    if (isLoading) {
      // Display "Loading..." message
      // this.messages.push({ content: content, isUser: false });

      // Wait for 2 seconds before resolving the promise
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    } else {
      // Display other AI messages immediately
      this.messages.push({ content: content, isUser: false });
      return Promise.resolve();
    }
  }

  toggleChatbot() {
    this.chatbotClosed = !this.chatbotClosed;
    if (!this.chatbotClosed) {
      setTimeout(() => {
        const inputElement = document.querySelector('.chatbot__input') as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
      }, 100); // Adjust delay as needed
    }
  }
}
