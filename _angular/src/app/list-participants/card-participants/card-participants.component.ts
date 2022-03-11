import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Participant} from "../../../models/Participant";

@Component({
  selector: 'card-participants',
  templateUrl: './card-participants.component.html',
  styleUrls: ['./card-participants.component.scss']
})
export class CardParticipantsComponent implements OnInit {

  @Input() participant: Participant | undefined;

  @Output('participantDelete') delete$: EventEmitter<any> = new EventEmitter();

  @Output('participantUpdate') update$: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.delete$.emit(this.participant);
  }

  update() {
    this.update$.emit(this.participant);
  }

}
