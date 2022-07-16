import {Component, OnInit} from '@angular/core';
import {Tensor} from "@tensorflow/tfjs";
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-disney-classifier',
  templateUrl: './disney-classifier.component.html',
  styleUrls: ['./disney-classifier.component.css']
})
export class DisneyClassifierComponent implements OnInit {
  modelUrl = "/disney/model.json";
  name: string = 'disney';
  results!: string;

  constructor() {
  }

  ngOnInit(): void {
    if (!environment.production) {
      //console.log("disney initialized")
    }
  }

  printResults(results: Tensor) {
    const result = results.as1D().argMax().dataSync()[0];
    switch (result) {
      case 0:
        this.results = "It is a Donald Duck";
        break;
      case 1:
        this.results = "It is a Mickey Mouse";
        break;
      case 2:
        this.results = "It is a Minion";
        break;
      case 3:
        this.results = 'It is a Olaf from "Frozen"';
        break;
      case 4:
        this.results = "It is a Winnie the Pooh";
        break;
      case 5:
        this.results = "It is a Pumba";
        break;
    }
  }

  clearResults() {
    this.results = ''
  }
}

