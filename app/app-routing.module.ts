import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { DisplayComponent } from './display/display.component';
import { InfoComponent } from './info.component';
import { ThemesComponent } from './themes/themes.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path: '', component: InfoComponent},
  {path: 'display', component: DisplayComponent},
  {path: 'themes', component: ThemesComponent},
  {path: 'collection', component: CollectionComponent},
  {path: 'wishlist', component: WishlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
