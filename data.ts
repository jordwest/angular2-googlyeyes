interface Vector {
  x: number;
  y: number;
}

// This class represents an image with googly eyes
export class DataStore {
  keyword: string = "dog";
  eyes : Array<Vector> = [{x: 123, y: 63}, {x: 156, y: 58}];

  // RegExp to validate that the supplied serial data is in the format
  // #keyword[[x,y],[x,y]]
  //                 /-keyword-\ /point_locations\
  validation = /^\#([A-Za-z_\s]+)(\[[\[\],\s\d]+\])$/;

  constructor() { }

  // Convert the encoded URL hash string into data
  deserialize(data: string) {
    var results = this.validation.exec(decodeURIComponent(data));
    if(results === null) return;

    this.setKeyword(results[1])
    var eyeLocations = JSON.parse(results[2]);
    for(var i = 0; i < eyeLocations.length; i++) {
      this.addEye(eyeLocations[i][0], eyeLocations[i][1]);
    }
  }

  // Convert the data into a URL hash string
  serialize() {
    var eyeArray = this.eyes.map((pos:Vector) => {
      return "[" + pos.x + "," + pos.y + "]";
    }).join(",");

    return encodeURIComponent(this.keyword + "[" + eyeArray + "]");
  }

  // Set the keyword used (clears the eyes)
  setKeyword(keyword: string) {
    this.eyes = [];
    this.keyword = keyword;
  }

  // Add an eye
  addEye(x: number, y: number) {
    this.eyes.push({ x: x, y: y })
  }
}
