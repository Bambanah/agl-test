import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { CatListComponent } from './cats/cat-list/cat-list.component';

@NgModule({
  declarations: [AppComponent, LoadingComponent, CatListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
