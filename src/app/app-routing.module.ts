import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RockPaperScissorsComponent} from "./sections/rock-paper-scissors/rock-paper-scissors.component";
import {MobilenetComponent} from "./sections/mobilenet/mobilenet.component";
import {
  CustomAnalyzerComponent
} from "./sections/fictional-character-classifier/custom-analyzer/custom-analyzer.component";
import {ToxicityAnalyzerComponent} from "./sections/toxicity-analyzer/toxicity-analyzer.component";
import {AutomataComponent} from "./sections/fictional-character-classifier/automata-classifier/automata.component";
import {
  DisneyClassifierComponent
} from "./sections/fictional-character-classifier/disney-classifier/disney-classifier.component";


const routes: Routes = [
  {path: 'rps', component: RockPaperScissorsComponent},
  {path: 'mobilenet', component: MobilenetComponent},
  {path: 'custom', component: CustomAnalyzerComponent},
  {path: 'toxicity-analyzer', component: ToxicityAnalyzerComponent},
  {path: 'automata-classifier', component: AutomataComponent},
  {path: 'disney-classifier', component: DisneyClassifierComponent},
  {path: '', redirectTo: '/rps', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
