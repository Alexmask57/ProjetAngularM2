import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Participant} from "../../../models/Participant";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  form: FormGroup;
  @Input() participantModel: Participant;
  @ViewChild("fileInput") fileInput!: ElementRef;

  @Output('cancel') cancelEvent$: EventEmitter<any>;
  @Output('submit') submitEvent$: EventEmitter<any>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() {
    this.submitEvent$ = new EventEmitter();
    this.cancelEvent$ = new EventEmitter();
    this.form = FormulaireComponent.buildForm();
    this.participantModel = {};
  }


  ngOnInit(): void {
    this.form.patchValue({
      id: this.participantModel.id,
      pseudo: this.participantModel.pseudo,
      photo: this.participantModel.photo
    });
  }

  cancel() {
    this.cancelEvent$.emit();
  }

  submit(participant: Participant) {
    participant.photo = this.participantModel.photo;
    this.submitEvent$.emit(participant);
  }


  addChipset(event: MatChipInputEvent): void {
    event.chipInput!.clear();
  }

  removeChipset(titre: any): void {
  }

  onFileSelected(event:Event | null) {
    const files = (<HTMLInputElement>event?.currentTarget).files;
    const file:File | null = files!.item(0);

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.participantModel.photo = reader.result;
      }
    }
  }

  private static buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      pseudo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    });
  }

}
