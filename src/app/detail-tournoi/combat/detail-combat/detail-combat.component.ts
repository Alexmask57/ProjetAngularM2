import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Match} from "../../../../models/Match";
import {SsbCharactersService} from "../../../../service/ssb-characters.service";
import {Character} from "../../../../models/Character";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Participant} from "../../../../models/Participant";
import {AjoutPopupComponent} from "../../../list-participants/ajout-popup/ajout-popup.component";

@Component({
  selector: 'detail-combat',
  templateUrl: './detail-combat.component.html',
  styleUrls: ['./detail-combat.component.scss']
})
export class DetailCombatComponent implements OnInit {

  public Personnages: Character[] | undefined;
  form: FormGroup;

  constructor(private readonly SsbCharactersService: SsbCharactersService, @Inject(MAT_DIALOG_DATA) public match: Match, public dialogRef: MatDialogRef<DetailCombatComponent>) {
    this.form = DetailCombatComponent.buildForm();
  }

  ngOnInit(): void {
    this.SsbCharactersService.fetch().subscribe(Characters => {
      this.Personnages = Characters || [];
    });
    console.log(this.match);
  }

  closeDialog(result: Match & {mode?: string} | null = null) {
    this.dialogRef.close(result);
  }

  cancel() {
    this.closeDialog();
  }

  submit(match: any) {
    if (match){
      this.match.winner = match.idWinner;
      this.match.personnage1 = {id: "", nom: match.personnage1};
      this.match.personnage2 = {id: "", nom: match.personnage2};
      this.closeDialog(this.match);
    }
  }

  private static buildForm(): FormGroup {
    return new FormGroup({
      idWinner: new FormControl(''),
      namePersonnage1: new FormControl(''),
      namePersonnage2: new FormControl(''),
    });
  }

}
