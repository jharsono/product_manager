import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ProductsComponent } from './products/products.component';
import { EditComponent } from './products/edit/edit.component';
import { DeleteComponent } from './products/delete/delete.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'add',component: AddComponent },
  { path: 'products',component: ProductsComponent },
  { path: 'products/edit',component: EditComponent },
  { path: 'products/delete',component: DeleteComponent },

  { path: '', pathMatch: 'full', redirectTo: '/home' }, //set default to home
  // { path: '**', component: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
