import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit, OnDestroy {
  currentImageIndex;
  images: string[] = ['mcentire.webp', 'truck_dock.webp', 'dock_port600.webp'];
  content = [
   {
     title: 'Our Story',
     description: ' In business since 1938, McEntire Produce has grown to become the largest, family-owned, fresh produce processor in the Southeast. Located in a state-of-the art facility in Columbia, South Carolina, we are committed to providing the freshest, safest and most sustainably processed produce available to the market today. '
   },
   {
     title: 'McEntire Trucking',
     description: 'McEntire Trucking started by delivering fresh produce from the local market.  Today, our 35 power unit asset division travels more than 3.5 million miles per year delivering fresh produce all across the southeast.'
   },
   {
     title: 'MLX Freight',
     description: 'In January of 2023, McEntire launched MLX freight by hiring some of the most respected leaders in the brokerage industry.   From refrigerated produce, to drayage, we have your freight covered.'
   }
 ];
  intervalId: any; 

  constructor() {  this.currentImageIndex = 0;    }

  ngOnInit() {
   // Initialization logic here
   this.currentImageIndex = 1;
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed to avoid memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

 changeContent() {
   this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
 }
 
}
