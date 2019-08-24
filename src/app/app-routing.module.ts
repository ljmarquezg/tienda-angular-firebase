import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './componentes/login/login.component';
import { CheckoutComponent } from './componentes/checkout/checkout.component';
import { TiendaComponent } from './componentes/tienda/tienda.component';


const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent, },

  { path: 'shop', component: TiendaComponent, canActivate: [AuthGuard]  },

  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
