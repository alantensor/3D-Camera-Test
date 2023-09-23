 // set up the canvas and context
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

// dimensions
var h = 450;
var w = 750;
canvas.height = h;
canvas.width = w;

// colours and lines
ctx.fillStyle = "grey";
ctx.strokeRect = "black";
ctx.lineWidth = 3;
ctx.lineCap = "round";

//scene
let shapes = [];
for (let i = 0; i < 4; i++) {
  let cube1 = new cube(25, w / 3, 0, h + i * 100);
  let cube2 = new cube(25, 2 * w / 3, 0, h + i * 100);
  shapes.push(cube1.vertices);
  shapes.push(cube2.vertices);
}
let player = new POINT3D(375, 0, 225);

//movement parameters
let FORWARD = false, BACKWARD = false, LEFT = false, RIGHT = false, UP = false, DOWN = false;
let yaw = 0, pitch = 0;

function updatePlayer() {
  var speed = 3;
  var turnspeed = 0.03;

  if (FORWARD) {
    player.x += Math.sin(yaw) * speed;
    player.z += Math.cos(yaw) * speed;
  }
  if (BACKWARD) {
    player.x -= Math.sin(yaw) * speed;
    player.z -= Math.cos(yaw) * speed;
  }
  if (LEFT) {
    yaw -= turnspeed;
  }
  else if (RIGHT) {
    yaw += turnspeed;
  }
  if (UP) {
    player.y -= speed;
  } else if (DOWN) {
    player.y += speed;
  }
}
function drawLine(x1, y1, z1, x2, y2, z2) { //applies rotation and draws 3D line
  var centerX = w / 2;
  var centerY = h / 2;

  //set player location as origin of rotation, i.e. normalizing 
  var x1Diff = x1 - player.x;
  var y1Diff = y1 - player.y;
  var z1Diff = z1 - player.z;
  var x2Diff = x2 - player.x;
  var y2Diff = y2 - player.y;
  var z2Diff = z2 - player.z;

  //rotation along 3D y axis (-yaw = counterclockwise)
  var translatedX1 = x1Diff * Math.cos(-yaw) + z1Diff * Math.sin(-yaw);
  var translatedZ1 = z1Diff * Math.cos(-yaw) - x1Diff * Math.sin(-yaw);
  var translatedX2 = x2Diff * Math.cos(-yaw) + z2Diff * Math.sin(-yaw);
  var translatedZ2 = z2Diff * Math.cos(-yaw) - x2Diff * Math.sin(-yaw);

  if (translatedZ1 < 0 || translatedZ2 < 0) return;
  //rotation along 3D x-axis 
  // var translatedY1 = y1Diff * Math.cos(-pitch) - z1Diff * Math.sin(-pitch);
  // var translatedY2 = y2Diff * Math.cos(-pitch) - z2Diff * Math.sin(-pitch);

  //projection onto screen

  var screenDistance = 400; //distance from screen to eyeball
  var newX1 = (translatedX1 / translatedZ1) * screenDistance + centerX;
  var newY1 = (y1Diff / translatedZ1) * screenDistance + centerY;
  var newX2 = (translatedX2 / translatedZ2) * screenDistance + centerX;
  var newY2 = (y2Diff / translatedZ2) * screenDistance + centerY;

  ctx.beginPath();
  ctx.moveTo(newX1, newY1);
  ctx.lineTo(newX2, newY2);
  ctx.stroke();
}

function render() {
  for (let vertices of shapes) {
    for (let edge of cube.edges) {
      let point1 = vertices[edge[0]];
      let point2 = vertices[edge[1]];
      drawLine(
        point1.x, point1.y, point1.z,
        point2.x, point2.y, point2.z
      );
    }
  }
}

//document controls
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 16: //shift
      DOWN = true;
      break;
    case 32: //space
      UP = true;
      break;
    case 37:
      LEFT = true;
      break;
    case 38:
      FORWARD = true;
      break;
    case 39:
      RIGHT = true;
      break;
    case 40:
      BACKWARD = true;
      break;
  }
}
document.onkeyup = function(e) {
  switch (e.keyCode) {
    case 16: //shift
      DOWN = false;
      break;
    case 32: //space
      UP = false;
      break;
    case 37:
      LEFT = false;
      break;
    case 38:
      FORWARD = false;
      break;
    case 39:
      RIGHT = false;
      break;
    case 40:
      BACKWARD = false;
      break;
  }
}

var timeDelta, timeLast = 0;
requestAnimationFrame(loop);

function loop(timeNow) {
  ctx.clearRect(0, 0, w, h); //clear screen
  ctx.fillRect(0, 0, w, h); //draw background
  updatePlayer(); //apply changes
  render();

  requestAnimationFrame(loop);
}