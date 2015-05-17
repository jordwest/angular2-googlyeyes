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
  <img class="sprite" (load)="start()" [style.left]="x" [style.top]="y" src="http://{{ keyword }}.jpg.to/s+g" />
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

  constructor() {
    this.x = this.target_x;
    this.y = -150;

    setInterval(() => {
      this.x = this.target_x;
      if (!this.enabled) return;

      if (this.y < this.target_y) {
        this.sy += 0.5;
      }else{
        // Come to rest if there isn't enough momentum when bouncing
        if(-1.5 < this.sy && this.sy < 1.5) this.sy = 0;

        // Bounce (losing 10% energy)
        if(this.sy > 0) this.sy = this.sy*-0.7;
      }

      this.sy = this.sy*0.95;
      this.y += this.sy;
    }, 20)
  }

}

@Component({
  selector: 'display'
})
@View({
  template: `
  <div *for="#sprite of sprites">
    <sprite [target-x]="sprite.x" [target-y]="sprite.y" [keyword]="sprite.keyword" />
  </div>
  `,
  directives: [Sprite, For]
})
export class Display {
  sprites: Array<any> = [];

  constructor() {
  }

  addImage(keyword: string) {
    this.sprites.push({
      x: Math.random()*400,
      y: Math.random()*400,
      keyword: keyword});
    console.log(this.sprites);
  }
}
