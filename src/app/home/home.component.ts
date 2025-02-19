import { Component, OnInit } from '@angular/core';
import { AboutUsComponent } from "../about-us/about-us.component";

@Component({
  selector: 'app-home',
  imports: [AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {

   myImages: string[] = [ "mcentire.webp", "truck_dock.webp", "port_containers.webp"];
   currentImageIndex = 0;

   ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.myImages.length;
    }, 3000); // 3000 milliseconds = 3 seconds
  }

}
