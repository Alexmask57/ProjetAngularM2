import { Component, OnInit } from '@angular/core';
import {SsbCharactersService} from "../../service/ssb-characters.service";
import {Participant} from "../../models/Participant";
import {UserServiceService} from "../../service/user-service.service";
import {AjoutPopupComponent} from "./ajout-popup/ajout-popup.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {mergeMap} from "rxjs";
import {Alert} from "../../models/Alert";
import {DialogComponent} from "../partage/dialog/dialog.component";

@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.scss']
})
export class ListParticipantsComponent implements OnInit {

  private addDialog: MatDialogRef<AjoutPopupComponent> | any;
  private deleteDialog: MatDialogRef<DialogComponent> | any;
  loading: boolean = true;
  Participants: Participant[] = [];
  ParticipantsFilter: Participant[] = [];
  view:string = "card";
  dialogStatus = 'inactive';
  search:string = "";

  constructor(private readonly userService: UserServiceService, private readonly SsbCharactersService: SsbCharactersService, public dialog: MatDialog) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.userService.fetch().subscribe(list => {
      this.Participants = list || [];
      this.ParticipantsFilter = this.Participants;

      this.loading = false;
    });
  }

  add(participant: Participant) {
    this.userService.create(participant).subscribe(participant => {
      this.Participants.push(participant);
      this.hideDialog();
      this.searchOnList();
    });
  }

  delete(participant: Participant) {
    this.userService.delete(participant.id!).subscribe(() => {
      this.userService.fetch().subscribe(list => {
        this.Participants = list || [];
        this.ParticipantsFilter = this.Participants;
        this.searchOnList();
      });
    });
  }

  update(participant: Participant) {
    this.userService
      .update(participant)
      .pipe(mergeMap(() => this.userService.fetch()))
      .subscribe(music => {
        //this.music = music;
        this.hideDialog();
      });
  }

  switchView() {
    if(this.view==="card"){
      this.view = "list"
    }
    else{
      this.view = "card";
    }
  }

  showDialog() {
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutPopupComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((person: any) => {
      this.dialogStatus = 'inactive';
      if (person) {
        this.add(person);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if (this.addDialog != undefined) {
      this.addDialog.close();
    }
  }

  showDeleteDialog(participant: Participant) {
    this.userService
      .checkOnTournoi(participant?.id as string)
      .subscribe(res => {
        let data: Alert = {};

        if (res == '0')
          data = { response: true, texte: "Souhaitez-vous vraiment supprimer ce participant ?"}
        else
          data = { response: false, texte: "Impossible de supprimer ce participant puisque celui-ci est dans un tournoi en cours."}

        this.dialogStatus = 'active';
        this.deleteDialog = this.dialog.open(DialogComponent, {
            width: '600px',
            data: data,
          }
        );

        this.deleteDialog.afterClosed().subscribe((res: any) => {
          this.dialogStatus = 'inactive';
          if (res) {
            this.delete(participant);
            this.hideDeleteDialog()
          }
        });
      });

  }

  hideDeleteDialog() {
    this.dialogStatus = 'inactive';
    if (this.deleteDialog != undefined) {
      this.deleteDialog.close();
    }
  }

  searchOnList(){
    this.ParticipantsFilter = this.Participants.filter(participant => participant?.pseudo?.toLowerCase().includes(this.search.toLowerCase()));
  }

}
