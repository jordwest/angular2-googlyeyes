var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var MyAppComponent = (function () {
    function MyAppComponent() {
        this.names = [];
    }
    MyAppComponent.prototype.addImage = function (keyword, $event) {
        if ($event.which == 32) {
            this.names.push(keyword);
            $event.target.value = "";
        }
    };
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            template: "<p>Hello</p>\n  <ul>\n  <li *for=\"#name of names\"><img src=\"http://{{ name }}.jpg.to/s\" /></li>\n  </ul>\n  <input #nameentry (keyup)=\"addImage(nameentry.value, $event)\" />\n  ",
            directives: [angular2_1.For]
        })
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);
