import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../../models/Character";


@Component({
  selector: 'card-personnage',
  templateUrl: './card-personnage.component.html',
  styleUrls: ['./card-personnage.component.scss']
})
export class CardPersonnageComponent implements OnInit {

  @Input() personnage: Character | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
