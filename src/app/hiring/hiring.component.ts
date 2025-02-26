import { Component,  ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'; //FormBuilder input form

import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-hiring',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hiring.component.html',
  styleUrl: './hiring.component.scss'
})
export class HiringComponent {

  selectedFile: File | null = null;

  fileSelected = false;
  file: File | null = null;
  uploadProgress: number = 0;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required,  Validators.minLength(4) ]),
    lastname: new FormControl('', [Validators.required,  Validators.minLength(4) ] ) ,
    email:  new FormControl("",[Validators.required,Validators.minLength(6), Validators.email]),
    message: new FormControl("",[Validators.required]),
    filefield: new FormControl(null,[Validators.required]), // Add a file control
  });

  constructor(private fileUploadService: FileUploadService) {}


  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value); // Access form values
      //... process form data
      const formData = new FormData();


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
    else {
      console.log('er webo'); // Access form values
    }
  }

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files?.length) {
      console.log(input.files[0]);
      this.selectedFile = input.files[0];
    }
    
  }

}
