import { Component, OnInit } from '@angular/core';
import {Character, SsbCharactersService} from "../../service/ssb-characters.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list: Character[] = [];

  constructor(private readonly service:SsbCharactersService) { }

  ngOnInit(): void {
    this.service.fetch().subscribe(l => {
      this.list = l || [];
      console.log(this.list);
    });
  }

}
