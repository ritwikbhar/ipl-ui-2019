import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notifyable } from '../../util/Notifyable';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private dialogRef : MatDialogRef<UserMainComponent>,
    @Inject(MAT_DIALOG_DATA) private data: UserMainComponentInput) {
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
