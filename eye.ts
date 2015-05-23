import {Component, View, For} from 'angular2/angular2';
import {Vector} from 'data'

@Component({
  selector: 'eye',
  properties: {
    'position': 'position',
    'focalPoint': 'focus',
    'eyelidPos': 'eyelid-pos'
  }
})
@View({
  template: `
  <div class="eye white"
    [style.left]="position.x - (eyeDiameter/2)"
    [style.top]="position.y - (eyeDiameter/2)"
    [style.width]="eyeDiameter"
    [style.height]="eyeDiameter">

    <div class="eye ball"
      [style.left]="getBallX() + (eyeBallDiameter/2)"
      [style.top]="getBallY() + (eyeBallDiameter/2)"
      [style.width]="eyeBallDiameter"
      [style.height]="eyeBallDiameter"></div>

    <div class="eyelid"
      [style.top]="0"
      [style.width]="eyeDiameter"
      [style.height]="eyelidHeight()"
    ></div>

  </div>

  `,
  directives: [For]
})
// This class handles the maths and display of a googly eye.
// Provide the location of the eye and the location they should focus on
// using the x, y, focusy, focusy properties.
export class Eye {

  position: Vector;
  focalPoint: Vector;

  eyeDiameter: number = 30;
  eyeBallDiameter: number = 16;

  // -1 = 1 = eyes fully closed
  // 0 = eyes fully open
  eyelidPos: number = 0;

  // Calculate the angle from the eye to the focal point
  angleToFocalPoint() {
    return Math.atan2(this.yDiff(), this.xDiff());
  }

  // Horizontal distance from eye to focal point
  xDiff() {
    return this.focalPoint.x - this.position.x;
  }
  // Vertical distance from eye to focal point
  yDiff() {
    return this.focalPoint.y - this.position.y;
  }

  getBallX() {
    return Math.cos(this.angleToFocalPoint())*5;
  }

  getBallY() {
    return Math.sin(this.angleToFocalPoint())*5;
  }

  eyelidHeight() {
    return Math.abs(this.eyelidPos)*this.eyeDiameter;
  }
}
