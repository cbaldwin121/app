import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [


  { path: '', loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)},
  { path: 'callback', loadChildren: () => import('./service/auth/auth-callback/auth-callback.module').then( m => m.AuthCallbackPageModule)},
  { path: 'logout', loadChildren: () => import('./service/auth/end-session/end-session.module').then( m => m.EndSessionPageModule)},
  { path: 'logout', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
