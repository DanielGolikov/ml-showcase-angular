import {Component, OnInit} from '@angular/core';
import '@tensorflow/tfjs-backend-cpu';


@Component({
  selector: 'app-toxicity-analyzer',
  templateUrl: './toxicity-analyzer.component.html',
  styleUrls: ['./toxicity-analyzer.component.css']
})
export class ToxicityAnalyzerComponent implements OnInit {

  constructor() {
  }

  async ngOnInit() {
  }

}
