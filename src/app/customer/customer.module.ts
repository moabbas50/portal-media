import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProjectSelectComponent } from './project-select/project-select.component';
import { AppRoutingModule } from '../app-routing.module';
import { ActivitesComponent } from './components/activites/activites.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ChatbotComponent,
    ContactComponent,
    MainPageComponent,
    ProjectSelectComponent,
    ActivitesComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule 
    
  ]
})
export class CustomerModule { }
