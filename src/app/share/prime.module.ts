import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PanelModule } from "primeng/panel";
import { RippleModule } from "primeng/ripple";

@NgModule({
  declarations: [
  ],
  imports: [
    CarouselModule,
    ButtonModule,
    BrowserAnimationsModule,
    PanelModule,
    RippleModule
  ],
  exports: [
    CarouselModule,
    ButtonModule,
    BrowserAnimationsModule,
    PanelModule,
    RippleModule
  ]
})
export class PrimeModule { }
