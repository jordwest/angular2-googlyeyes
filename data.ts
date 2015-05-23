export interface Vector {
  x: number;
  y: number;
}

// This class represents an image with googly eyes
export class DataStore {
  imgur_id: string = "sjpa0Gg";
  eyes : Array<Vector> = [{x: 119, y: 156}, {x: 202, y: 156}];

  // RegExp to validate that the supplied serial data is in the format
  // #imgur_id[[x,y],[x,y]]
  //                 /-imgur_id-\ /point_locations\
  validation = /^\#([A-Za-z\d]{7})(\[[\[\],\s\d]*\])$/;

  constructor() { }

  // Convert the encoded URL hash string into data
  deserialize(data: string) {
    var results = this.validation.exec(decodeURIComponent(data));
    if(results === null) return;

    this.setImgurID(results[1])
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

    return encodeURIComponent(this.imgur_id + "[" + eyeArray + "]");
  }

  // Set the imgur_id used (clears the eyes)
  setImgurID(imgur_id: string) {
    this.eyes = [];
    this.imgur_id = imgur_id;
  }

  // Add an eye
  addEye(x: number, y: number) {
    this.eyes.push({ x: x, y: y })
  }
}
