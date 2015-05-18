import {Injectable} from 'angular2/di'

interface Vector {
  x: number;
  y: number;
}

export class DataStore {
  keyword: string = "barackobama";
  eyes : Array<Vector> = [];

  // RegExp to validate that the supplied serial data is in the format
  // #keyword[[x,y],[x,y]]
  //                 /-keyword-\ /point_locations\
  validation = /^\#([A-Za-z_]+)(\[[\[\],\s\d]+\])$/;

  constructor() {
  }

  deserialize(data: string) {
    var results = this.validation.exec(data);
    if(results === null) return;

    this.setKeyword(results[1])
    var eyeLocations = JSON.parse(results[2]);
    for(var i = 0; i < eyeLocations.length; i++) {
      this.addEye(eyeLocations[i][0], eyeLocations[i][1]);
    }
  }

  serialize() {
    var eyeArray = this.eyes.map((pos:Vector) => {
      return "[" + pos.x + "," + pos.y + "]";
    }).join(",");

    return this.keyword + "[" + eyeArray + "]";
  }

  setKeyword(keyword: string) {
    this.eyes = [];
    this.keyword = keyword;
  }

  addEye(x: number, y: number) {
    this.eyes.push({ x: x, y: y })
  }
}
