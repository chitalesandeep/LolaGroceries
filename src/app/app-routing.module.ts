import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProductsComponent } from './products/products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthGaurd } from './auth-gaurd.service';
import { AdminGaurd } from "../app/admin-gaurd.service";
import { RegisterationComponent } from './registeration/registeration.component';
import { ProductFormComponent } from "../app/admin/product-form/product-form.component";

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterationComponent},
  { path:'',component:ProductsComponent},
  { path:'shopping-cart',component:ShoppingCartComponent},
  { path:'check-out',component:CheckOutComponent, canActivate:[AuthGaurd]},
  { path:'admin/products/new',component:ProductFormComponent},
  { path:'admin/products/:id',component:ProductFormComponent},
  { path:'products',component:ProductsComponent},
  { path:'myorders',component:MyOrdersComponent, canActivate:[AuthGaurd]},
  { path:'orders-success/:orderid',component:OrderSuccessComponent , canActivate:[AuthGaurd]},
  { path:'admin/products',component:AdminProductsComponent, canActivate:[AuthGaurd,AdminGaurd]},
  { path:'admin/orders',component:AdminOrdersComponent, canActivate:[AuthGaurd,AdminGaurd]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
