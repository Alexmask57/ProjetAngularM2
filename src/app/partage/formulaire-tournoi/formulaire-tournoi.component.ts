import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-formulaire-tournoi',
  templateUrl: './formulaire-tournoi.component.html',
  styleUrls: ['./formulaire-tournoi.component.scss']
})
export class FormulaireTournoiComponent implements OnInit {

  //form: FormGroup;
  nbParticipants = 2;
  participantModel = {"pseudo": new FormControl(''),
                      "personnage": new FormControl('')};

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  constructor() {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    //this.form = FormulaireTournoiComponent.buildForm()
  }

  ngOnInit(): void {
    /*this.form.patchValue({
      nbParticipants: this.nbParticipants;
    });*/
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(listeParticipants: any) {
    this.submitEvent$.emit(listeParticipants);
  }

  /*private static buildForm(): FormGroup {
    let dynamicForm = {nbParticipants: 2};
    //génération dynamique du formulaire
    for(let i = 0; i < 2; i++) {
      dynamicForm.push()
    }

    return new FormGroup({

    })
  }*/

}
