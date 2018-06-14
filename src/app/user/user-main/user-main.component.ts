import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private dialogRef : MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Notifyable<String>) {
    this.loginForm = fb.group({
      defaultFormEmail: ['', Validators.required],
      defaultFormPass: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  sendDataBack(){
    this.data.toNotify.notify('somedata');
  }

}

export interface UserMainComponentInput {
  toNotify: Notifyable<String>
}
