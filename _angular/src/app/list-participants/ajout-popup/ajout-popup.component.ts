import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Participant} from "../../../models/Participant";

@Component({
  selector: 'ajout-popup',
  templateUrl: './ajout-popup.component.html',
  styleUrls: ['./ajout-popup.component.scss']
})
export class AjoutPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AjoutPopupComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(result: Participant & {mode?: string} | null = null) {
    this.dialogRef.close(result);
  }

  onCancel() {
    this.closeDialog();
  }

  onCreate(participant: Participant) {
    this.closeDialog({...participant, mode: 'create'});
  }

  onUpdate(participant: Participant) {
    this.closeDialog({...participant, mode: 'update'});
  }

}
