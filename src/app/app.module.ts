import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CarouselComponent } from './slider/carousel.component';
import { ClonePipe } from './slider/clone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    ClonePipe
  ],
  imports     : [
    BrowserModule
  ],
  providers   : [],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
