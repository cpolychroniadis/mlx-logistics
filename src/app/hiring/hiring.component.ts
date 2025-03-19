import { Component,  ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; //FormBuilder input form

import { getStorage, ref, uploadBytes, getDownloadURL  } from '@angular/fire/storage';
import { getApp } from '@angular/fire/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-hiring',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hiring.component.html',
  styleUrl: './hiring.component.scss'
})
export class HiringComponent {

  selectedFile: File | null = null;


  fileSelected = false
  file: File | null = null;
  uploadProgress: number = 0;
  downloadURL : string | undefined;

  
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required,  Validators.minLength(4) ]),
    lastname: new FormControl('', [Validators.required,  Validators.minLength(4) ] ) ,
    email:  new FormControl("",[Validators.required,Validators.minLength(6), Validators.email]),
    message: new FormControl("",[Validators.required]),
    filefield: new FormControl(null,[Validators.required]), // Add a file control
  });
  uploadComplete: boolean = false;
  successMessage: string = '';

   constructor( private snackBar: MatSnackBar  ) { 
     console.info('test');
   }

  onSubmit(): void {

    this.upload();

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    console.log(' ' + this.selectedFile?.name)

  }


  async upload() {
    if (!this.selectedFile) {
      this.snackBar.open('Please select a file.', 'Close', { duration: 3000 });
      return;
    }

    const file = this.selectedFile;
    const filePath = `uploads/${uuidv4()}-${file.name}`;
    const storage = getStorage(getApp());
    const storageRef = ref(storage, filePath);

    /*this.uploadPercent = task.percentageChanges().pipe(
      map(progress => progress ?? 0) // Map undefined to 0
    );*/

    try {
      await uploadBytes(storageRef, file);
      this.snackBar.open('File uploaded successfully!', 'Close', { duration: 3000 });
      this.downloadURL  = await getDownloadURL(storageRef);
      this.uploadComplete = true;
      this.successMessage = 'File uploaded successfully!';
    } catch (error: any) {
      console.error('Error uploading file:', error);
      this.snackBar.open('Error uploading file.', 'Close', { duration: 3000 });
    } finally {
      this.myForm.reset();
    }
  }

  testSnackbar() {
    this.snackBar.open('This is a test snackbar!', 'Close', { duration: 3000 });
  }
   

}
