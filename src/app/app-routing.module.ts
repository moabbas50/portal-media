import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin-panel', loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule) },
  { path: '', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  // { path: '', redirectTo: '/customer/main-page', pathMatch: 'full' } // Redirect to customer module's home by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
