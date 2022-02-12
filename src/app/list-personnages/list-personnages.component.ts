import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-personnages',
  templateUrl: './list-personnages.component.html',
  styleUrls: ['./list-personnages.component.scss']
})
export class ListPersonnagesComponent implements OnInit {

  view:string = "card";

  constructor() { }

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
