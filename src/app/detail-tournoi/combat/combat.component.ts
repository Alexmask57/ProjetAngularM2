import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Match} from "../../../models/Match";
import {SsbCharactersService} from "../../../service/ssb-characters.service";
import {Character} from "../../../models/Character";

@Component({
  selector: 'combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {

  @Input() combat: Match | undefined;

  @Output('showDialog') showDialogEvent$: EventEmitter<any>;

  Personnage1: Character |undefined;
  Personnage2: Character |undefined;

  constructor(private readonly SsbCharactersService: SsbCharactersService) {
    this.showDialogEvent$ = new EventEmitter<any>();
  }


  ngOnInit(): void {
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

}
