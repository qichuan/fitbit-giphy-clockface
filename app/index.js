import clock from "clock";
import document from "document";
import { display } from "display";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const image = document.getElementById("image");

let counter = 0;
let masterArrayIndex = 0;
const frameArray1 = [];
const frameArray2 = [];
const frameArray3 = [];
const masterArray = [frameArray1, frameArray2, frameArray3]

// Initialize frame arrays
for (var i = 0; i < 29; i++) {
  frameArray1[i] = "images/dwight_schrute_1/dwight_schrute-" + i + '.png';
}

for (var i = 29; i < 61; i++) {
  frameArray2[i-29] = "images/dwight_schrute_2/dwight_schrute-" + i + '.png';
}

for (var i = 61; i < 95; i++) {
  frameArray3[i-61] = "images/dwight_schrute_3/dwight_schrute-" + i + '.png';
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}

display.addEventListener('change', function(){
  if (!display.on) {
    counter = 0;
    masterArrayIndex++;
    
    // load the first image of the next frame array
    image.image = masterArray[masterArrayIndex % masterArray.length][0];
  }
});

setInterval(function(){
  if (display.on) {
    const array = masterArray[masterArrayIndex % masterArray.length];
    const url = array[counter++ % array.length];  
    image.image = url;
  }
}, 50);
