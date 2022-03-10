import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../../../service/user-service.service";
import {Participant} from "../../../models/Participant";

@Component({
  selector: 'edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  participant: Participant;

  /**
   * Component constructor
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserServiceService
  ) {
    this.participant = {};
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.route.data.subscribe(( participant: any) => (this.participant = participant.participant[0]));
  }

  submit(participant: any) {
    if(this.participant.photo == undefined)
      participant.photo = "";
    console.log(participant);
    this.userService.update(participant).subscribe(() => {
      this.router.navigate(['/ListParticipants']).then(r => null);
    });
  }

  cancel() {
    this.router.navigate(['/ListParticipants']).then(r => null);
  }

}
