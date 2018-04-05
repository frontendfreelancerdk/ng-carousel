import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {SliderComponent} from './slider/slider.component';
import { ClonePipe } from './slider/clone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    ClonePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
