import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { ThemesComponent } from './themes/themes.component';
import { CollectionComponent } from './collection/collection.component';
import { FormsModule } from '@angular/forms';
import { ModelComponent } from './model/model.component';
import { InfoComponent } from './info.component';
import { HttpClientModule } from '@angular/common/http';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    ThemesComponent,
    CollectionComponent,
    ModelComponent,
    InfoComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
