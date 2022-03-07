import { Component, OnInit } from '@angular/core';
import {Character, SsbCharactersService} from "../../service/ssb-characters.service";
import {Participant} from "../../models/Participant";
import {UserServiceService} from "../../service/user-service.service";
import {AjoutPopupComponent} from "./ajout-popup/ajout-popup.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {mergeMap} from "rxjs";

@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.scss']
})
export class ListParticipantsComponent implements OnInit {

  private addDialog: MatDialogRef<AjoutPopupComponent> | any;
  loading: boolean = false;
  Participants: Participant[] = [];
  ParticipantsFilter: Participant[] = [];
  view:string = "card";
  dialogStatus = 'inactive';
  search:string = "";

  constructor(private readonly userService: UserServiceService, private readonly SsbCharactersService: SsbCharactersService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.fetch().subscribe(list => {
      this.Participants = list || [];
      this.ParticipantsFilter = this.Participants;
    });

    //INIT PURPOSE ONLY
    /*this.SsbCharactersService.fetch().subscribe(Characters => {
      console.log(Characters);
      Characters.map(chr => {
        this.userService.addCharacter(chr.name).subscribe();
        console.log(chr.name);
      });
    });*/
  }

  add(participant: Participant) {
    this.userService.create(participant).subscribe(participant => {
      this.Participants.push(participant);
      this.hideDialog();
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

  searchOnList(){
    this.ParticipantsFilter = this.Participants.filter(participant => participant?.pseudo?.toLowerCase().includes(this.search.toLowerCase()));
  }

}
