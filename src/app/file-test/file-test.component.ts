import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-test',
  imports: [],
  templateUrl: './file-test.component.html',
  styleUrl: './file-test.component.scss'
})
export class FileTestComponent {
  fileSelected = false;
  file: File | null = null;
  uploadProgress: number = 0;

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.fileSelected = true;
  }

  uploadFile() {
    if (this.file) {
      //Example path:  /images/myimage.jpg  Adjust to your needs.  Dynamically generate based on the file name or something else
      const filePath = `images/${this.file.name}`;
      const uploadTask = this.fileUploadService.uploadFile(this.file, filePath);
      uploadTask.subscribe(
        (snapshot)=>{
          // optional: You could track progress here
          this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error)=>{
          console.error("Error uploading the file: ", error);
        }
      )
    }
  }
}
