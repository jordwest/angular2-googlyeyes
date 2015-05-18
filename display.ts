import {Component, View, For} from 'angular2/angular2';

@Component({
  selector: 'eye',
  properties: {
    'x': 'x',
    'y': 'y',
    'focusX': 'focusx',
    'focusY': 'focusy'
  }
})
@View({
  template: `
  <div class="eye white" [style.left]="x-15" [style.top]="y-15"></div>
  <div class="eye ball" [style.left]="getBallX()-8" [style.top]="getBallY()-8"></div>
  `,
  directives: [For]
})
export class Eye {
  x: number;
  y: number;

  focusX: number;
  focusY: number;

  constructor() {
  }

  angleToCursor() {
    return Math.atan2(this.yDiff(), this.xDiff());
  }
  xDiff() {
    return this.focusX - this.x;
  }
  yDiff() {
    return this.focusY - this.y;
  }

  getBallX() {
    return this.x + Math.cos(this.angleToCursor())*5;
  }

  getBallY() {
    return this.y + Math.sin(this.angleToCursor())*5;
  }
}
