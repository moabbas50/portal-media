import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ActivitesComponent } from './components/activites/activites.component';


const routes: Routes = [


  {
    path: '',component: HomeComponent,
    children: [
      { path: 'Projects/:id', component: ProjectsComponent },
      { path: 'Projects', component: ProjectsComponent },
      { path: 'activites', component: ActivitesComponent},
      { path: "projectDetail/:id/:video/:title/:description", component: ProjectDetailComponent },
      { path: 'chatbot', component: ChatbotComponent },
      { path: '', component: MainPageComponent },
      { path: 'main-page', component: MainPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
