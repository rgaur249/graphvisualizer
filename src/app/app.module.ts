import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayHighlightDirective } from './display-highlight/display-highlight';
import { HeaderComponent } from './header/header.component';
import { DisplayvisualizerComponent } from './displayvisualizer/displayvisualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, DisplayHighlightDirective, DisplayvisualizerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
