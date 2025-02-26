import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({  providedIn: 'root'})
export class FileUploadService {
  
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File, path: string): Observable<any> {  //path is where you want to store it
    const storageRef: AngularFireStorageReference = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    return task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(url => {
          console.log('File available at', url); // You can save this URL to the database.
        });
      })
    );
  }

}

