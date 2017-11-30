import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouteReuseStrategy} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {NewsComponent} from './news/news.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule, ComponentList} from './app-routing.module';
import {SimpleReuseStrategy} from './domain/simple-reuse-strategy';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NewsComponent,
    ContactComponent,
    ComponentList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    // 最后将策略注册到模块当中
    {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
