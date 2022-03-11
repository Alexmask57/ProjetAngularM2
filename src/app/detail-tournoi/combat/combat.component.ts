import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Match} from "../../../models/Match";
import {SsbCharactersService} from "../../../service/ssb-characters.service";
import {Character} from "../../../models/Character";
import {Participant} from "../../../models/Participant";

@Component({
  selector: 'combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {

  //composant représentant un match
  //contient ses matchs enfants dans le champ children

  @Input() combat: Match | undefined;

  @Output('showDialog') showDialogEvent$: EventEmitter<any>;

  Personnage1: Character |undefined;
  Personnage2: Character |undefined;

  constructor(private readonly SsbCharactersService: SsbCharactersService) {
    this.showDialogEvent$ = new EventEmitter<any>();
  }


  ngOnInit(): void {
    //on recupère les personnages correspondant depuis une API externe si ils sont définis
    if (this.combat?.personnage1?.nom){
      this.SsbCharactersService.fetchOne(this.combat?.personnage1?.nom as string).subscribe(Character => {
        this.Personnage1 = Character || [];
      });
    }

    if (this.combat?.personnage2?.nom) {
      this.SsbCharactersService.fetchOne(this.combat?.personnage2?.nom as string).subscribe(Character => {
        this.Personnage2 = Character || [];
      });
    }
  }

  showDialog(combat: Match | undefined){
    this.showDialogEvent$.emit(combat);
  }

  //on affiche une croix sur le perdant
  IsLooser(participant: Participant | undefined): boolean{
    console.log(participant);
    if (this.combat?.winner != '0')
      return participant?.id != this.combat?.winner;
    else
      return false;
  }

}
