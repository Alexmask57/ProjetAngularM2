import { Component, OnInit } from '@angular/core';
import {Character} from "../../service/ssb-characters.service";
import {Participant} from "../../models/Participant";

@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.scss']
})
export class ListParticipantsComponent implements OnInit {

  loading: boolean = false;
  Participants: Participant[] = [];
  view:string = "card";

  constructor() {
  }

  ngOnInit(): void {
  }

  switchView() {
    if(this.view==="card"){
      this.view = "list"
    }
    else{
      this.view = "card";
    }
  }

}
