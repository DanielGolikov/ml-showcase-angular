import {Component, OnInit} from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-cpu';

@Component({
  selector: 'app-mobilenet',
  templateUrl: './mobilenet.component.html',
  styleUrls: ['./mobilenet.component.css']
})
export class MobilenetComponent implements OnInit {
  private hidden_img!: HTMLImageElement;
  private display_img!: HTMLImageElement;
  results: { className: string; probability: number; }[] = [];
  isImageProvided: any = true;
  constructor() {
  }

  ngOnInit(): void {
    this.hidden_img = document.getElementById('hidden_img') as HTMLImageElement;
    this.display_img = document.getElementById("display_img") as HTMLImageElement;
  }

  async classify() {

    // Load the model.
    const model = await mobilenet.load()
    // Classify the image.
    const predictions = await model.classify(this.hidden_img);

    console.log(predictions)

    this.results = predictions;

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
    this.isImageProvided = null;
    this.results = [];
  }
}
