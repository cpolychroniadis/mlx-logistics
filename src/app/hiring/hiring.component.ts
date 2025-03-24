import { Component, ChangeDetectorRef,  ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; //FormBuilder input form

import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable  } from '@angular/fire/storage';
import { getApp } from '@angular/fire/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, switchMap, catchError, map } from 'rxjs/operators';

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
  
  ploadPercent$: Observable<number> | undefined; // Observable for progress
  
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required,  Validators.minLength(4) ]),
    lastname: new FormControl('', [Validators.required,  Validators.minLength(4) ] ) ,
    email:  new FormControl("",[Validators.required,Validators.minLength(6), Validators.email]),
    message: new FormControl("",[Validators.required]),
    filefield: new FormControl(null,[Validators.required]), // Add a file control
  });
  uploadComplete: boolean = false;
  successMessage: string = '';
  uploadPercent: any;

   constructor( private snackBar: MatSnackBar , private cdr: ChangeDetectorRef ) { 
     console.info('test');
   }

  onSubmit(): void {

    this.upload();

  }

  onFileSelected(event: any) {

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileSelected = true; // Enable Submit button
      console.log('Selected file:', this.selectedFile.name);
    } else {
      this.fileSelected = false; // Disable Submit button if no file
    }

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

   
    debugger;

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);
      //await uploadBytes(storageRef, file);
      this.cdr.detectChanges();
      
      this.uploadComplete = false;
      this.successMessage = 'Error uploading file!';

      uploadTask.on('state_changed',
        (snapshot) => {
          this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + this.uploadProgress + '% done');
          this.snackBar.open('Upload is ' + this.uploadProgress + '% done', 'Close', { duration: 9000 });
        },
        (error) => {
          console.error('u Error uploading file:', error);
          this.uploadComplete = false;
          this.snackBar.open('u Error uploading file.', 'Close', { duration: 3000 });
        },
        async () => {
          this.downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          this.uploadComplete = true;
          this.successMessage = 'File uploaded successfully!';
          this.snackBar.open( this.successMessage, 'Close', { duration: 5000 });
          this.myForm.reset();
        }
      );

      this.cdr.detectChanges();

      /*this.testSnackbar();*/

    } catch (error: any) {
      console.error('catch Error uploading file:', error);
      this.snackBar.open('catch Error uploading file.', 'Close', { duration: 3000 });
    } finally {
      this.myForm.reset();
    }
  }

  testSnackbar() {
    
    this.snackBar.open('File uploaded Successfully', 'Close', { duration: 3000 });
    console.log(`File uploaded `, this.uploadComplete );
    
  }
   

}
