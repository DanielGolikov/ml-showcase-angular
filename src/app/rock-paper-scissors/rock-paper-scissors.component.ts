import {Component, OnInit, ViewChild} from '@angular/core';
import {WebcamImage} from "ngx-webcam";
import {CameraComponent} from "./camera/camera.component";
import RPSDataset from "./rps-dataset";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import {Tensor3D} from "@tensorflow/tfjs-node";


@Component({
  selector: 'app-rock-paper-scissors',
  templateUrl: './rock-paper-scissors.component.html',
  styleUrls: ['./rock-paper-scissors.component.css']
})

export class RockPaperScissorsComponent implements OnInit {
  //to invoke function from child component from parent component
  @ViewChild(CameraComponent) child!: CameraComponent;


  private mobilenet!: tf.LayersModel;
  private model: any;
  private dataset: RPSDataset = new RPSDataset();
  webcamImage: WebcamImage | null = null;
  rockSamples = 0;
  paperSamples = 0;
  scissorsSamples = 0;
  isCollecting = true;
  isTraining = false;
  isTrained = false;
  isPredicting = false;


  constructor() {
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  async ngOnInit() {
    this.mobilenet = await this.loadMobilenet();
    //tf.tidy(() => this.mobilenet.predict(this.getTensorImage()));
  }

  handleButton(id: number) {
    switch (id) {
      case 0:
        this.rockSamples++;
        break;
      case 1:
        this.paperSamples++;
        break;
      case 2:
        this.scissorsSamples++;
        break;
    }
    this.dataset.addExample(this.mobilenet.predict(this.getTensorImage()), id);
  }

  startPredicting() {
    this.isPredicting = true;
    this.predict();
  }

  stopPredicting() {
    this.isPredicting = false;
    this.predict();
  }


  async loadMobilenet() {

    const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    const layer = model.getLayer('conv_pw_13_relu');
    return tf.model({inputs: model.inputs, outputs: layer.output});

  }

  getTensorImage() {
    this.child.triggerSnapshot();

    return tf.tidy(() => {
      const img = document.getElementById("hidden_pic") as HTMLImageElement
      // Reads the image as a Tensor from the webcam <video> element.
      const webcamImage: Tensor3D = tf.browser.fromPixels(img);


      const reversedImage = webcamImage.reverse(1);

      // Expand the outer most dimension so we have a batch size of 1.
      const batchedImage = reversedImage.expandDims(0);
      // Normalize the image between -1 and 1. The image comes in between 0-255,
      // so we divide by 127 and subtract 1.
      return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
  }

  async train() {
    if (this.rockSamples < 30 || this.paperSamples < 30 || this.scissorsSamples < 30) {
      alert("Please collect at least 30 samples of each gesture");
      return;
    }
    this.dataset.ys = null;
    this.dataset.encodeLabels(3);
    this.model = tf.sequential({
      layers: [
        tf.layers.flatten({inputShape: this.mobilenet.outputs[0].shape.slice(1)}),
        tf.layers.dense({units: 100, activation: 'relu'}),
        tf.layers.dense({units: 3, activation: 'softmax'})
      ]
    });
    // for UI change
    this.isCollecting = false;
    this.isTraining = true;


    const optimizer = tf.train.adam(0.0001);
    this.model.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'});
    let loss = 0;
    this.model.fit(this.dataset.xs, this.dataset.ys, {
      epochs: 10,
      callbacks: {
        onBatchEnd: async (batch: any, logs: any) => {
          loss = logs.loss.toFixed(5);
          console.log('LOSS: ' + loss);
        }
      }
    }).then(() => {
      this.isTraining = false
      this.isTrained = true;
      console.log('Training done');
    });
  }

  async predict() {
    while (this.isPredicting) {
      const predictedClass = tf.tidy(() => {
        const img = this.getTensorImage();
        const activation = this.mobilenet.predict(img);
        const predictions = this.model.predict(activation);
        return predictions.as1D().argMax();
      });
      const classId = (await predictedClass.data())[0];
      let predictionText = "";
      switch (classId) {
        case 0:
          predictionText = "I see Rock";
          break;
        case 1:
          predictionText = "I see Paper";
          break;
        case 2:
          predictionText = "I see Scissors";
          break;
      }
      document.getElementById("prediction")!.innerText = predictionText;


      predictedClass.dispose();
      await tf.nextFrame();
    }
  }
}
