import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  res: number = LoadingComponent.getRandomInt();
  ngOnInit(): void {
  }

  public static getRandomInt(): number {
    let res = Math.floor(Math.random() * 2);
    console.log(res);
    return res;
  }

}
