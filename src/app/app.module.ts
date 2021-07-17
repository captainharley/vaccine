import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VaccineComponentComponent } from './vaccine-component/vaccine-component.component'
import { VaccineServiceService } from './service/vaccine-service.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UiViewComponent } from './ui-view/ui-view.component';
import { UiViewService } from './service/ui-view.service';

@NgModule({
  declarations: [
    AppComponent,
    VaccineComponentComponent,
    UiViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyASGB5WGB9T689C1FIgaRnrfSEfxP6l5k0'
    })
  ],
  providers: [VaccineServiceService, DatePipe, UiViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
