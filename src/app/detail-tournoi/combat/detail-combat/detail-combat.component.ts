import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Match} from "../../../../models/Match";

@Component({
  selector: 'detail-combat',
  templateUrl: './detail-combat.component.html',
  styleUrls: ['./detail-combat.component.scss']
})
export class DetailCombatComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public match: Match) { }

  ngOnInit(): void {
    console.log(this.match);
  }

}
