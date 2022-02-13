import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../../service/ssb-characters.service";
import {Participant} from "../../../models/Participant";

@Component({
  selector: 'card-participants',
  templateUrl: './card-participants.component.html',
  styleUrls: ['./card-participants.component.scss']
})
export class CardParticipantsComponent implements OnInit {

  @Input() participant: Participant | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
