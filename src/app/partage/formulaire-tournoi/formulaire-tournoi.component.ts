import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserServiceService} from "../../../service/user-service.service";
import {Participant} from "../../../models/Participant";

@Component({
  selector: 'formulaire-tournoi',
  templateUrl: './formulaire-tournoi.component.html',
  styleUrls: ['./formulaire-tournoi.component.scss']
})
export class FormulaireTournoiComponent implements OnInit {

  Participants: Participant[] = [];

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  toppings= new FormControl();
  toppingList: string[] = [];

  constructor(private readonly userService: UserServiceService) {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
  }

  ngOnInit(): void {
    this.userService.fetch().subscribe(list => {
      this.Participants = list || [];
      for ( let i = 0; i < this.Participants.length; i++)
      { // @ts-ignore
        this.toppingList.push(this.Participants[i].pseudo);
      }
    });

    /*this.form.patchValue({
      nbParticipants: this.nbParticipants;
    });*/
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(listeParticipants: string[]) {
    let participants: Participant[] = [];
    listeParticipants.forEach(value => {
      // @ts-ignore
      participants.push(this.Participants.find(x => x.pseudo == value));
    });
    this.submitEvent$.emit(listeParticipants);
  }
}
