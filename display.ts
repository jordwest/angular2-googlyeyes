import {Component, View, For} from 'angular2/angular2';
import {Sprite} from 'sprite';

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
