import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { ActionsInfoComponent } from './pages/actions-info/actions-info.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ProductCategoryInfoComponent } from './pages/product-category-info/product-category-info.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

import { AdminComponent } from './admin/admin.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminTovaryComponent } from './admin/admin-tovary/admin-tovary.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductsService } from './shared/services/products/products.service';
import { ActionsService } from './shared/services/actions/actions.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'actions', component: ActionsComponent},
  {path: 'actions/:id', component: ActionsInfoComponent,
  resolve: {
    actionsInfo: ActionsService
  } },
  {path: 'product-category/:category', component: ProductCategoryComponent},
  {path: 'product-category/:category/:id', component: ProductCategoryInfoComponent,
  resolve: {
    productInfo: ProductsService
  } },
  {path: 'dostavka-ta-oplata', component: DostavkaTaOplataComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'actions', component: AdminActionsComponent},
    {path: 'category', component: AdminCategoryComponent},
    {path: 'tovary', component: AdminTovaryComponent},
    {path: 'orders', component: AdminOrdersComponent},
    {path: '', pathMatch: 'full', redirectTo: 'actions'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
