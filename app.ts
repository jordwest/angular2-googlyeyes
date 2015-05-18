import {Component, View, bootstrap, For} from 'angular2/angular2';

import {DataStore} from 'data'
import {Eye} from 'eye'

@Component({
  selector: 'eye-app',
})
@View({
  template: `
    <div class="workspace">
      <img class="base" #image src="http://{{ dataStore.keyword }}.jpg.to" (mousemove)="updateFocalPoint($event)" (click)="addEyes($event)"/>
      <eye *for="#eye of dataStore.eyes" [x]="eye.x" [y]="eye.y" [focusx]="focusX" [focusy]="focusY"></eye>
    </div>

    <label for="wordentry">A picture of</label>
    <input id="wordentry" #wordentry value="{{ dataStore.keyword }}" (keyup)="setKeyword(wordentry.value)" />
  `,
  directives: [Eye, For]
})
class EyeAppComponent {
  dataStore: DataStore;
  focusX: number = 0;
  focusY: number = 0;

  constructor() {
    this.dataStore = new DataStore();
    this.dataStore.deserialize(window.location.hash);
  }

  updateFocalPoint($event: MouseEvent) {
    this.focusX = $event.offsetX;
    this.focusY = $event.offsetY;
  }

  setKeyword(keyword:string) {
    this.dataStore.setKeyword(keyword);
    window.location.hash = this.dataStore.serialize();
  }

  addEyes($event: MouseEvent) {
    this.dataStore.addEye($event.offsetX, $event.offsetY);
    window.location.hash = this.dataStore.serialize();
  }
}


bootstrap(EyeAppComponent);
