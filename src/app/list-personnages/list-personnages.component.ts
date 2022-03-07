import { Component, OnInit } from '@angular/core';
import {Character, SsbCharactersService} from "../../service/ssb-characters.service";

@Component({
  selector: 'list-personnages',
  templateUrl: './list-personnages.component.html',
  styleUrls: ['./list-personnages.component.scss']
})
export class ListPersonnagesComponent implements OnInit {

  loading: boolean = true;
  Personnages: Character[] = [];
  PersonnagesFilter: Character[] = [];
  view:string = "card";
  search:string = "";

  constructor(private readonly SsbCharactersService: SsbCharactersService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.SsbCharactersService.fetch().subscribe(Characters => {
      this.Personnages = Characters || [];
      this.PersonnagesFilter = this.Personnages;
    });

    this.loading = false;
  }

  switchView() {
    if(this.view==="card"){
      this.view = "list"
    }
    else{
      this.view = "card";
    }
  }

  searchOnList(){
    this.PersonnagesFilter = this.Personnages.filter(perso => perso?.name?.toLowerCase().includes(this.search.toLowerCase()));
  }

}
