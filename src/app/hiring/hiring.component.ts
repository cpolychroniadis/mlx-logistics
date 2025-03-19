import { Component,  ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; //FormBuilder input form
import { AngularFireModule } from '@angular/fire/compat'; // Import the compat version

import { AngularFireAuthModule } from '@angular/fire/compat/auth';    // Import Auth
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Import Firestore
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask,AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Observable, from, of } from 'rxjs';
import { finalize, switchMap, catchError, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-hiring',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AngularFireStorageModule],
  templateUrl: './hiring.component.html',
  styleUrl: './hiring.component.scss'
})
export class HiringComponent {

  selectedFile: File | null = null;
  bucketURL = 'gs://mlx-logistics-efd04.appspot.com'; // DO NOT USE IN FILE PATH
  uploadPercent: Observable<number | undefined> | undefined;

  fileSelected = false
  file: File | null = null;
  uploadProgress: number = 0;
  downloadURL : string | undefined;

  private storage: AngularFireStorage = inject(AngularFireStorage); // Inject AngularFireStorage here

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required,  Validators.minLength(4) ]),
    lastname: new FormControl('', [Validators.required,  Validators.minLength(4) ] ) ,
    email:  new FormControl("",[Validators.required,Validators.minLength(6), Validators.email]),
    message: new FormControl("",[Validators.required]),
    filefield: new FormControl(null,[Validators.required]), // Add a file control
  });
  uploadComplete: boolean = false;
  successMessage: string = '';

   constructor(){
     console.info('test');
   }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('valid', this.myForm.controls["name"] ); // Access form values

    }
    else {
      console.log('er webo'); // Access form values
    }
  }

  onFileSelected(event: any){    
    this.fileSelected = true;
     const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.selectedFile = target.files[0];
      }
  }

  uploadFile() {

    if(!this.selectedFile){
      return;
    }

    const file = this.selectedFile;
    const filePath = `uploads/${uuidv4()}-${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    
   
    
    this.uploadPercent = task.percentageChanges().pipe(
      map(progress => progress ?? 0) // Map undefined to 0
    );
    
    //this.uploadPercent.subscribe(); // Subscribe to start the observable

    task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;
          this.uploadComplete = true; // Set the flag to true
          this.successMessage = 'File uploaded successfully!';
        });
      })
    ).subscribe(); // Subscribe to start the upload and finalize process

    // reset the form
    this.myForm.reset();
  }

}
