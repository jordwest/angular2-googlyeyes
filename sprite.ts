import {Component, View, For} from 'angular2/angular2';

@Component({
  selector: 'sprite',
  properties: {
    'target_x': 'target-x',
    'target_y': 'target-y',
    'keyword': 'keyword'
  }
})
@View({
  template: `
  <img class="sprite" (click)="throw()" (load)="start()" [style.left]="x" [style.top]="y" src="http://{{ keyword }}.jpg.to/s+g" />
  `
})
export class Sprite {
  x: number = 0;
  y: number = 0;
  target_x: number;
  target_y: number;

  enabled: boolean = false;

  sx: number = 0;
  sy: number = 0;

  keyword: string;

  start() {
    this.enabled = true;
  }

  throw() {
    this.sy = this.sy - 20;
    this.sx = this.sx + (10 - (Math.random()*15));
  }

  constructor() {
    //this.x = this.target_x;
    this.x = 0;
    this.y = -150;

    setInterval(() => {
      if (!this.enabled) return;

      if (this.y < this.target_y) {
        this.sy += 0.5;
      }else{
        // Come to rest if there isn't enough momentum when bouncing
        if(-1.5 < this.sy && this.sy < 1.5) this.sy = 0;

        // Bounce (losing 30% energy)
        if(this.sy > 0) this.sy = this.sy*-0.7;

        // Lose horizontal energy too
        this.sx = this.sx * 0.7;
      }

      this.sx = this.sx*0.98;
      this.x += this.sx;
      this.sy = this.sy*0.95;
      this.y += this.sy;
    }, 20)
  }

}
