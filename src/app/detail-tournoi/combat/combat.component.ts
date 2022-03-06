import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../../models/Match";

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {

  @Input() combat: Match | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
