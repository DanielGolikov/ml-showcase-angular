import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RockPaperScissorsComponent} from './rock-paper-scissors/rock-paper-scissors.component';
import {WebcamModule} from 'ngx-webcam';
import {MobilenetComponent} from './mobilenet/mobilenet.component';
import {RouterModule} from '@angular/router';
import {CameraComponent} from "./rock-paper-scissors/camera/camera.component";
import {CustomAnalyzerComponent} from './fictional-character-classifier/custom-analyzer/custom-analyzer.component';
import {ToxicityAnalyzerComponent} from './toxicity-analyzer/toxicity-analyzer.component';
import { AutomataComponent } from './fictional-character-classifier/automata-classifier/automata.component';
import { DisneyClassifierComponent } from './fictional-character-classifier/disney-classifier/disney-classifier.component';
import { DropzoneDirective } from './fictional-character-classifier/custom-analyzer/dropzone.directive';
import { HelpModalComponent } from './rock-paper-scissors/help-modal/help-modal.component';

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
    HelpModalComponent
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
