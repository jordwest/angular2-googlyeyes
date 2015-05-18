import {Component, View, bootstrap, For} from 'angular2/angular2';

import {DataStore} from 'data'
import {Eye} from 'eye'

@Component({
  selector: 'eye-app',
})
@View({
  template: `
    <div class="workspace">
      <img class="base" #image src="http://{{ dataStore.keyword }}.jpg.to" (mousemove)="setFocalPoint($event)" (click)="addEye($event)"/>
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

  // Should be using dependency injection here, but couldn't get it to work
  // ie, constructor(dataStore: DataStore) should have Angular instantiate
  // a new DataStore instance
  constructor() {
    this.dataStore = new DataStore();
    this.dataStore.deserialize(window.location.hash);
  }

  // Update the point at which the eyes are looking
  setFocalPoint($event: MouseEvent) {
    this.focusX = $event.layerX;
    this.focusY = $event.layerY;
  }

  // Set the keyword used for the image search
  setKeyword(keyword:string) {
    this.dataStore.setKeyword(keyword);
    window.location.hash = this.dataStore.serialize();
  }

  // Add an eye to the image
  addEye($event: MouseEvent) {
    this.dataStore.addEye($event.layerX, $event.layerY);
    window.location.hash = this.dataStore.serialize();
  }
}


bootstrap(EyeAppComponent);
