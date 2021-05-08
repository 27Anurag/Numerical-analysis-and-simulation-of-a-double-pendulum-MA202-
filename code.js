// Coded in P5.js 

let r1 = 125;
let r2 = 125;
let m1 = 10;
let m2 = 20;
let a1;
let a2;
let a1_v = 0;
let a2_v = 0;
let g = 1;
let h = 0.1; 
let px2 = -1;
let py2 = -1;
let cx, cy;

let buffer;

function setup() {
  createCanvas(500, 300);
  background(110);


  // Initial angle 
  a1 = PI / 3;
  a2 = PI / 3;
  
  cx = width / 2;
  cy = 50;
  buffer = createGraphics(width, height);
  buffer.background(175);
  buffer.translate(cx, cy);
}

function draw() {
  frameRate(100); 
  background(150);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);
  
  // Euler method solution 

  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, m2, m2);

  
  //angle1,angle2 velocity incremented by angle1,angle2 acceleration
  a1_v += a1_a*h;
  a2_v += a2_a*h;
  
  //angle1,angle2 change by angle1,angle2 velocity
  a1 += a1_v*h;
  a2 += a2_v*h;

  //Dampening of angle1, angle2 velocities
  a1_v *= 0.99;
  a2_v *= 0.99;

  //For tracing the path of the lower bob
  
   buffer.stroke(0);
   if (frameCount > 1) {
     buffer.line(px2, py2, x2, y2);
   }

  px2 = x2;
  py2 = y2;
}