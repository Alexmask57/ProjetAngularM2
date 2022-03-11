import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Participant} from "../../../models/Participant";
import {Alert} from "../../../models/Alert";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Alert) { }

  ngOnInit(): void {

  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onAccept() {
    this.dialogRef.close(true);
  }

}
