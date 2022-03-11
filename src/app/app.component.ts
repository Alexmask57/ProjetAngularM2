import {Component, OnChanges, OnInit} from '@angular/core';
import {AudioPlayerComponent} from "./audio-player/audio-player.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit{
  title = 'ProjetAngularM2';
  currentUrl='';

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.currentUrl = window.location.href;
    console.log(this.currentUrl);
  }
}
