import {Component, View, bootstrap, For} from 'angular2/angular2';

@Component({
  selector: 'my-app'
})
@View({
  template: `<p>Hello</p>
  <ul>
  <li *for="#name of names"><img src="http://{{ name }}.jpg.to/s" /></li>
  </ul>
  <input #nameentry (keyup)="addImage(nameentry.value, $event)" />
  `,
  directives: [For]
})
// Component Controller
class MyAppComponent {
  names: Array<string>;
  nameentry: any;

  constructor() {
    this.names = [];
  }

  addImage(keyword: string, $event: KeyboardEvent) {
    if($event.which == 32) {
      this.names.push(keyword);
      (<HTMLInputElement>$event.target).value = "";
    }
  }
}

bootstrap(MyAppComponent);
