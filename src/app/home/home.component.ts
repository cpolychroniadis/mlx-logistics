import { Component, OnInit,OnDestroy  } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy  {
   currentImageIndex;
   images: string[] = ['mcentire.webp', 'truck_dock.webp', 'dock_port600.webp'];
   content = [
    {
      title: 'Our Story',
      description: ' In business since 1938, McEntire Produce has grown to become the largest, family-owned, fresh produce processor in the Southeast. Located in a state-of-the art facility in Columbia, South Carolina, we are committed to providing the freshest, safest and most sustainably processed produce available to the market today. '
    },
    {
      title: 'McEntire Trucking',
      description: 'We operate state-of-the-art facilities equipped with the latest technology to ensure the highest quality and safety standards...'
    },
    {
      title: 'MLX Freight',
      description: 'We are committed to sustainable practices that minimize our environmental impact and promote responsible sourcing...'
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
