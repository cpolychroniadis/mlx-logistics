import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//ReactiveFormsModule then after that then the form controls validators and formgroup

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required,  Validators.minLength(4) ]),
    lastname: new FormControl('', [Validators.required,  Validators.minLength(4) ] ) ,
    email:  new FormControl("",[Validators.required,Validators.minLength(6), Validators.email])
  });


  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value); // Access form values
      //... process form data
    }
    else {
      console.log('er webo'); // Access form values
    }
  }
}
