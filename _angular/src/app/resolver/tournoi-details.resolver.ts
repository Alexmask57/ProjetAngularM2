import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {TournamentServiceService} from "../../service/tournament-service.service";
import {TournoiDetail} from "../../models/Tournoi";

@Injectable({
  providedIn: 'root'
})
export class TournoiDetailsResolver implements Resolve<TournoiDetail> {

  constructor(private readonly tournoiService: TournamentServiceService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TournoiDetail> {
    const tournoiId: string | null = route.paramMap.get('id');
    if(tournoiId != null){
      return this.tournoiService.fetchOne(tournoiId);
    }
    else
      return new Observable<TournoiDetail>();
  }

}
