import {Component, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges{
  title = 'ProjetAngularM2';
  currentUrl='';

  constructor() {
  }

  ngOnChanges(): void {
    this.currentUrl = window.location.href;
    console.log(this.currentUrl);
  }
}
