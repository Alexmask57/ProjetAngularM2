import { Component, OnInit } from '@angular/core';
import {Character, SsbCharactersService} from "../../service/ssb-characters.service";
import {Participant} from "../../models/Participant";
import {UserServiceService} from "../../service/user-service.service";

@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.scss']
})
export class ListParticipantsComponent implements OnInit {

  loading: boolean = false;
  Participants: Participant[] = [];
  view:string = "card";

  constructor(private readonly userService: UserServiceService, private readonly SsbCharactersService: SsbCharactersService) {
  }

  ngOnInit(): void {
    this.userService.fetch().subscribe(list => {
      this.Participants = list || [];
      console.log(list);
    });
    //INIT PURPOSE ONLY
    /*this.SsbCharactersService.fetch().subscribe(Characters => {
      console.log(Characters);
      Characters.map(chr => {
        this.userService.addCharacter(chr.name).subscribe();
        console.log(chr.name);
      });
    });*/
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
