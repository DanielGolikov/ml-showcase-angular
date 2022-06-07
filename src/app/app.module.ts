import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RockPaperScissorsComponent} from './rock-paper-scissors/rock-paper-scissors.component';
import {WebcamModule} from 'ngx-webcam';
import {MobilenetComponent} from './mobilenet/mobilenet.component';
import {RouterModule} from '@angular/router';
import {CameraComponent} from "./camera/camera.component";

@NgModule({
  declarations: [
    AppComponent,
    RockPaperScissorsComponent,
    MobilenetComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    RouterModule.forRoot([
      {path: 'rps', component: RockPaperScissorsComponent},
      {path: 'mobilenet', component: MobilenetComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
