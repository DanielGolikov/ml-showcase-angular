import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import {Tensor} from "@tensorflow/tfjs";
import {Tensor3D} from "@tensorflow/tfjs-node";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-custom-analyzer',
  templateUrl: './custom-analyzer.component.html',
  styleUrls: ['./custom-analyzer.component.css']
})
export class CustomAnalyzerComponent implements OnInit {
  private hidden_img!: HTMLImageElement;
  private display_img!: HTMLImageElement;
  model!: tf.LayersModel;
  isImageProvided = false;

  @Input()
  modelUrl!: string;

  @Output()
  result = new EventEmitter<Tensor>();

  @Output()
  imageChange = new EventEmitter();

  constructor() {
  }

  async ngOnInit() {
    if (!environment.production) {
      console.log(environment.apiUrl + this.modelUrl)
      console.log("custom initialized")
    }
    this.hidden_img = document.getElementById('hidden_img') as HTMLImageElement;
    this.display_img = document.getElementById("display_img") as HTMLImageElement;

    this.model = await tf.loadLayersModel(environment.apiUrl + this.modelUrl);

    //this.model.summary();

  }

  async classify() {

    const tensor = await tf.tidy(() => {
      const img = this.hidden_img
      // Reads the image as a Tensor from the webcam <video> element.
      const webcamImage: Tensor3D = tf.browser.fromPixels(img);


      const reversedImage = webcamImage.reverse(1);

      // Expand the outer most dimension so we have a batch size of 1.
      const batchedImage = reversedImage.expandDims(0);
      // Normalize the image between -1 and 1. The image comes in between 0-255,
      // so we divide by 127 and subtract 1.
      return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });

    const results = this.model.predict(tensor) as Tensor;
    this.result.emit(results);

    if (!environment.production) {
      console.log(results.dataSync());
    }

  }

  onImageChange(event: any) {

    const selectedFile = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      this.hidden_img.src = event.target?.result as string;
      this.display_img.src = event.target?.result as string;
    };

    reader.readAsDataURL(selectedFile);

    //clear page after image change
    this.isImageProvided = true;
    this.imageChange.emit();
  }

}
