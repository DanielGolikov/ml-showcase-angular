import {Component, OnInit} from '@angular/core';
import {Tensor} from "@tensorflow/tfjs";

@Component({
  selector: 'app-automata-classifier',
  templateUrl: './automata.component.html',
  styleUrls: ['./automata.component.css']
})
export class AutomataComponent implements OnInit {

  modelUrl = "/nier/model.json";

  results!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  printResults(results: Tensor) {
    const probability = results.dataSync()[0];

    if (probability > 0.5) {
      this.results = `It is a A2\n${probability * 100}%`
    } else {
      this.results = `It is a 9S\n${(1 - probability) * 100}%`
    }
  }

  clearResults() {
    this.results = ''
  }
}
