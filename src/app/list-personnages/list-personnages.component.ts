import { Component, OnInit } from '@angular/core';
import {Character, SsbCharactersService} from "../../service/ssb-characters.service";

@Component({
  selector: 'list-personnages',
  templateUrl: './list-personnages.component.html',
  styleUrls: ['./list-personnages.component.scss']
})
export class ListPersonnagesComponent implements OnInit {

  loading: boolean = false;
  Personnages: Character[] = [];
  view:string = "card";

  constructor(private readonly SsbCharactersService: SsbCharactersService) {
    this.SsbCharactersService.fetch().subscribe(Characters => {
      this.Personnages = Characters || [];
    });
  }

  ngOnInit(): void {
  }

  switchView() {
    if(this.view==="card"){
      this.view = "list"
    }
    else{
      this.view = "card";
    }
  }

}
