import { Component, OnInit } from '@angular/core';
import {Participant} from "../../../models/Participant";
import {MatDialogRef} from "@angular/material/dialog";
import {AjoutPopupComponent} from "../../list-participants/ajout-popup/ajout-popup.component";
import {Tournoi} from "../../../models/Tournoi";

@Component({
  selector: 'ajout-tournoi',
  templateUrl: './ajout-tournoi.component.html',
  styleUrls: ['./ajout-tournoi.component.scss']
})
export class AjoutTournoiComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AjoutPopupComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(result: Participant[] & {mode?: string} | null = null) {
    this.dialogRef.close(result);
  }

  onCancel() {
    this.closeDialog();
  }

  onCreate(participants: Participant[]) {
    this.closeDialog(participants);
  }

}
