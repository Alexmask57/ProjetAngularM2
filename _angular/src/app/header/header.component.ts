import {Component, Input, OnInit} from '@angular/core';
import {DrawerComponent} from "../drawer/drawer.component";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() drawer!: DrawerComponent;

  ngOnInit(): void {
  }

}
