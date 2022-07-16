import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RockPaperScissorsComponent} from './sections/rock-paper-scissors/rock-paper-scissors.component';
import {WebcamModule} from 'ngx-webcam';
import {MobilenetComponent} from './sections/mobilenet/mobilenet.component';
import {RouterModule} from '@angular/router';
import {CameraComponent} from "./sections/rock-paper-scissors/camera/camera.component";
import {CustomAnalyzerComponent} from './sections/fictional-character-classifier/custom-analyzer/custom-analyzer.component';
import {ToxicityAnalyzerComponent} from './sections/toxicity-analyzer/toxicity-analyzer.component';
import { AutomataComponent } from './sections/fictional-character-classifier/automata-classifier/automata.component';
import { DisneyClassifierComponent } from './sections/fictional-character-classifier/disney-classifier/disney-classifier.component';
import { DropzoneDirective } from './sections/fictional-character-classifier/custom-analyzer/dropzone.directive';
import { HelpModalComponent } from './sections/rock-paper-scissors/help-modal/help-modal.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    RockPaperScissorsComponent,
    MobilenetComponent,
    CameraComponent,
    CustomAnalyzerComponent,
    ToxicityAnalyzerComponent,
    AutomataComponent,
    DisneyClassifierComponent,
    DropzoneDirective,
    HelpModalComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    RouterModule.forRoot([
      {path: 'rps', component: RockPaperScissorsComponent},
      {path: 'mobilenet', component: MobilenetComponent},
      {path: 'custom', component: CustomAnalyzerComponent},
      {path: 'toxicity-analyzer', component: ToxicityAnalyzerComponent},
      {path: 'automata-classifier', component: AutomataComponent},
      {path: 'disney-classifier', component: DisneyClassifierComponent},
      {path: '', redirectTo: '/rps', pathMatch: 'full'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
