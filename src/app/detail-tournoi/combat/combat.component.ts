import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Match} from "../../../models/Match";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AjoutPopupComponent} from "../../list-participants/ajout-popup/ajout-popup.component";
import {DetailCombatComponent} from "./detail-combat/detail-combat.component";
import {Participant} from "../../../models/Participant";
import {mergeMap} from "rxjs";
import {TournamentServiceService} from "../../../service/tournament-service.service";

@Component({
  selector: 'combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {

  @Input() combat: Match | undefined;

  @Output('showDialog') showDialogEvent$: EventEmitter<any>;

  constructor() {
    this.showDialogEvent$ = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  showDialog(combat: Match | undefined){
    this.showDialogEvent$.emit(combat);
  }

}
