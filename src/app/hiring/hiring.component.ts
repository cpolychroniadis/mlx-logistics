import { Component, ChangeDetectorRef,  ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; //FormBuilder input form

import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable  } from '@angular/fire/storage';
import { getApp } from '@angular/fire/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, switchMap, catchError, map } from 'rxjs/operators';
import { NgZone } from '@angular/core';


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
    filefield: new FormControl<File | null>(null, [Validators.required]), // Add a file control
  });
  uploadComplete: boolean = false;
  successMessage: string = '';
  uploadPercent: any;

   constructor( private snackBar: MatSnackBar , private cdr: ChangeDetectorRef,  private ngZone: NgZone) { 
     console.info('test');
   }

  onSubmit(): void {

    console.log('Form Valid:', this.myForm.valid);
    /*console.log('Form Value:', this.myForm.value);
    console.log('Form Errors:', this.myForm.errors);
    console.log('Name Errors:', this.myForm.controls['name'].errors);
    console.log('Lastname Errors:', this.myForm.controls['lastname'].errors);
    console.log('Email Errors:', this.myForm.controls['email'].errors);
    console.log('Message Errors:', this.myForm.controls['message'].errors);*/
    console.log('Filefield Errors:', this.myForm.controls['filefield'].errors);

    this.upload();

  
    

  }

  onFileSelected(event: any) {

      const input = event.target as HTMLInputElement;

      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        this.fileSelected = true;
        console.log('Selected file:', this.selectedFile.name);
        this.myForm.controls['filefield'].setValue(this.selectedFile); // Set the value of the filefield control
      } else {
        this.selectedFile = null;
        this.fileSelected = false;
        this.myForm.controls['filefield'].setValue(null); // Reset the value if no file
      }

  }


  upload() {
    if (!this.selectedFile) {
      this.snackBar.open('Please select a file.', 'Close', { duration: 3000 });
      return;
    }

    const file = this.selectedFile;
    const filePath = `uploads/${uuidv4()}-${file.name}`;
    //const storage = getStorage(getApp());
    const storage = getStorage();
    
    const storageRef = ref(storage, filePath);

   
    //debugger;

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);
      //await uploadBytes(storageRef, file);
      this.cdr.detectChanges();
      
      this.uploadComplete = false;
      this.successMessage = 'Error uploading file!';

      
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');

            this.snackBar.open('Upload is ' + progress + '% done' );

            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log('st un File available at' , error.code, error.message);
                break;
              case 'storage/canceled':
                // User canceled the upload
                console.log('st can File available at' , error.code, error.message);
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                console.log('Unknown error occurred', error.code, error.message);
                break;
            }
          }, 
          async() => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              
              //this.snackBar.open(lsuccessMessage , 'Close', { duration: 3000 });
              //this.cdr.detectChanges(); // Force change detection

              let lsuccessMessage = `File uploaded successfully! `;

              this.ngZone.run(() => {
                if(downloadURL !== undefined && downloadURL !== null){
                  lsuccessMessage = `File uploaded successfully! `+ downloadURL ;   
                }
               
                this.cdr.detectChanges();
                this.snackBar.open(lsuccessMessage, 'Close', { duration: 3000 });
                
              });
            });
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
