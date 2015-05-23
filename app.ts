import {Component, View, bootstrap, For} from 'angular2/angular2';

import {DataStore} from 'data'
import {Eye} from 'eye'

@Component({
  selector: 'eye-app',
})
@View({
  template: `
    <p>
      <input id="wordentry" #wordentry (keyup)="setImage(wordentry.value)" placeholder="Paste imgur URL or ID here" />
    </p>
    <div class="workspace">
      <img class="base" #image src="http://i.imgur.com/{{ dataStore.imgur_id }}.jpg" (mousemove)="setFocalPoint($event)" (click)="click($event)"/>
      <eye *for="#eye of dataStore.eyes" [x]="eye.x" [y]="eye.y" [focusx]="focusX" [focusy]="focusY" [eyelid-pos]="blinking"></eye>
    </div>

    <p><a href="https://imgur.com/{{ dataStore.imgur_id }}">View original on imgur</a></p>
  `,
  directives: [Eye, For]
})
class EyeAppComponent {
  dataStore: DataStore;
  focusX: number = 0;
  focusY: number = 0;
  blinking: number = 0;
  imgurRE = /^(?:(?:https?\:\/\/)?(?:i\.|www)?imgur.com(?:\/gallery)?\/)?([A-Za-z\d]{7})/

  // Should be using dependency injection here, but couldn't get it to work
  // ie, constructor(dataStore: DataStore) should have Angular instantiate
  // a new DataStore instance
  constructor() {
    this.dataStore = new DataStore();
    this.dataStore.deserialize(window.location.hash);

    setTimeout(() => {
      this.blink();
    }, 4000)
  }

  // Update the point at which the eyes are looking
  setFocalPoint($event: MouseEvent) {
    this.focusX = $event.layerX;
    this.focusY = $event.layerY;
  }

  // Set the imgur id used for the image search
  setImage(url:string) {
    if (this.imgurRE.test(url)) {
      this.dataStore.setImgurID(this.imgurRE.exec(url)[1]);
      window.location.hash = this.dataStore.serialize();
    }
  }

  // Add an eye to the image
  click($event: MouseEvent) {
    this.dataStore.addEye($event.layerX, $event.layerY);
    window.location.hash = this.dataStore.serialize();
  }

  // Make all the eyes blink
  blink() {
    // CSS handles the transition animation
    this.blinking = 1;
    setTimeout(() => {
      this.blinking = 0;
    }, 100)

    // Blink again somewhere between 0.5 - 3.5 seconds later
    setTimeout(() => {
      this.blink();
    }, 500 + Math.floor(Math.random()*3000))
  }
}


bootstrap(EyeAppComponent);
