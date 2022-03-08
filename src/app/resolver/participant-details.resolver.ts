import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Participant} from "../../models/Participant";
import {UserServiceService} from "../../service/user-service.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantDetailsResolver implements Resolve<Participant> {
  constructor(private readonly userService: UserServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Participant> {
    const participantId: string | null = route.paramMap.get('id');
    if(participantId != null){
      return this.userService.fetchOne(participantId);
    }
    else
      return new Observable<Participant>();
  }
}
