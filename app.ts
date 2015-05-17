import {Component, View, bootstrap, For} from 'angular2/angular2';

import {Display} from 'display'

@Component({
  selector: 'my-app'
})
@View({
  template: `
  <display #disp></display>
  <input #wordentry (keyup)="keyPress(wordentry.value, $event, disp)" />
  `,
  directives: [Display, For]
})
// Component Controller
class MyAppComponent {
  constructor() {
  }

  keyPress(keyword: string, $event: KeyboardEvent, disp: Display) {
    if($event.which == 13) {
      disp.addImage(keyword);
      (<HTMLInputElement>$event.target).value = "";
    }
  }
}

bootstrap(MyAppComponent);
