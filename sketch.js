let stars = [];

let titleAlpha = 0;
let quoteAlpha = 0;

let rocketX = -100;
let rocketY;

let state = "intro";

let transitionProgress = 0;
//////////////////////////////////////////////////
// FALSE MOON SYSTEM
//////////////////////////////////////////////////

let stage = 1;

let currentLog = "";

let logAlpha = 0;

let logTimer = 0;

let astronautSeen = false;

let shipSeen = false;

let antennaX = 0;
let antennaY = 0;

//////////////////////////////////////////////////
// FALSE MOON ADVANCED
//////////////////////////////////////////////////

let astronautTimer = 0;

let moonEnding = false;

let collapseEnding = false;

let breathing = 0;

let glitchAmount = 0;
let astronautImg;
let moonImg;
//////////////////////////////////////////////////
// SOM
//////////////////////////////////////////////////
let drone;
let introDrone;
let logBeep;
let audioStarted = false;

let signalOsc;
let ghostOsc;
let falseMoonOsc;
let monnTone;
//////////////////////////////////////////////////
// PRELOAD
//////////////////////////////////////////////////


function preload(){

astronautImg =
loadImage("astronaut.png");
  moonImg =
loadImage("moon.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  rocketY = height * 0.3;

  // estrelas
  for (let i = 0; i < 180; i++) {

    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      speed: random(0.1, 0.4),
      glow: random(120, 255)
    });

  }

  //////////////////////////////////////////////////
// CRIAR LUZES
//////////////////////////////////////////////////

antennaX = width/2;
antennaY = height/2;
  
  textFont('Georgia');
  
  //////////////////////////////////////////////////
// DRONE
//////////////////////////////////////////////////


  
drone =
new p5.Oscillator("sine");

drone.freq(120);

drone.amp(0);
  
    introDrone =
new p5.Oscillator("triangle");

introDrone.freq(28);

introDrone.amp(0);
  
  /////////////// logbeep//////////
  logBeep =
new p5.Oscillator("triangle");
  
signalOsc =
new p5.Oscillator("sine");

signalOsc.freq(400);

signalOsc.amp(0);
logBeep.amp(0);
  
  ghostOsc =
new p5.Oscillator("triangle");

ghostOsc.freq(120);

ghostOsc.amp(0);
  
  falseMoonOsc =
new p5.Oscillator("sawtooth");

falseMoonOsc.freq(90);

falseMoonOsc.amp(0);
  
  moonTone =
new p5.Oscillator("sine");

moonTone.freq(880);

moonTone.amp(0);
  
}

function draw() {

  background(0);

  if (state === "intro") {
    drawIntro();
  }

  else if (state === "transition") {
    drawTransition();
  }

  else if (state === "mothVision") {
    drawMothVision();
  }
//////////////////////////////////////////////////
// RESPIRAÇÃO DA NAVE
//////////////////////////////////////////////////

if(state==="mothVision"){

let breatheFreq =

120 +

sin(frameCount*0.01)*20;

drone.freq(
breatheFreq
);

}
}

//////////////////////////////////////////////////
// INTRO
//////////////////////////////////////////////////

function drawIntro() {

  drawStars(1);

  drawRocket();

  // fade título
  if (titleAlpha < 255) {
    titleAlpha += 0.5;
  }

  fill(255, titleAlpha);

  textAlign(CENTER);

  textSize(52);
  text("FALSE MOON", width / 2, height / 2 - 40);

  // frase
  if (titleAlpha > 180 && quoteAlpha < 180) {
    quoteAlpha += 0.4;
  }

  fill(180, quoteAlpha);

  textSize(18);
  text("Ela seguia a Lua.", width / 2, height / 2 + 5);

  // botão
  let bx = width / 2 - 60;
  let by = height / 2 + 70;
  let bw = 120;
  let bh = 40;

  let hovering =
    mouseX > bx &&
    mouseX < bx + bw &&
    mouseY > by &&
    mouseY < by + bh;

  if (hovering) {

    fill(255, 60);
    ellipse(width / 2, by + 20, 180, 60);

    fill(255, 120);

  } else {

    fill(40);

  }

  rect(bx, by, bw, bh, 12);

  fill(255);
  textSize(16);
  text("ENTER", width / 2, height / 2 + 96);

  let hoveringArchive =

mouseX > width/2 - 100 &&
mouseX < width/2 + 100 &&
mouseY > height/2 + 130 &&
mouseY < height/2 + 170;

if(hoveringArchive){

fill(255);

}else{

fill(180);

}

textSize(13);

text(
"ACCESS ARCHIVE ↓",
width/2,
height/2 + 150
);

}


//////////////////////////////////////////////////
// TRANSIÇÃO
//////////////////////////////////////////////////

function drawTransition() {

  transitionProgress += 0.015;

  // partículas aceleram
  drawStars(8);

  // flash branco
  fill(255, 120 * sin(frameCount * 0.2));
  rect(0, 0, width, height);

  // círculos fragmentados
  noFill();

  for (let i = 0; i < 40; i++) {

    stroke(255, random(20, 100));

    let size = random(20, 150);

    ellipse(
      random(width),
      random(height),
      size
    );
  }

  // zoom sensação
  push();

  translate(width / 2, height / 2);

  scale(1 + transitionProgress * 0.3);

  fill(255, 80);

  ellipse(0, 0, 300);

  pop();

if (transitionProgress >= 1) {

   state = "mothVision";

   introDrone.amp(0.18);

   drone.start();

   drone.amp(0.08,5);

}

}

//////////////////////////////////////////////////
// VISÃO MARIPOSA
//////////////////////////////////////////////////

function drawMothVision() {

  //////////////////////////////////////////////////
  // FUNDO AZUL ESCURO
  //////////////////////////////////////////////////

  background(5, 10, 25);

  drawStars(0.5);

  //////////////////////////////////////////////////
  // DISTORÇÃO OLHO DE PEIXE + HEXÁGONOS
  //////////////////////////////////////////////////

  push();

  translate(width / 2, height / 2);

 breathing =
sin(frameCount*0.02);

let curveAmount =
0.00042 +
breathing*0.00008;

  for (let x = -width / 2; x < width / 2; x += 65) {

    for (let y = -height / 2; y < height / 2; y += 65) {

      // distância ao centro
      let distance = dist(x, y, 10, 0);

      // distorção curvada
      let distortion = 1 + distance * curveAmount;

      let warpedX = x * distortion;
      let warpedY = y * distortion;

      //////////////////////////////////////////////////
      // GLOW DOS HEXÁGONOS
      //////////////////////////////////////////////////

      // brilho externo
      stroke(100, 160, 255, 15);
      strokeWeight(4);

      noFill();

      polygon(warpedX, warpedY, 36, 6);

      // linha principal
      stroke(180, 220, 255, 70);
      strokeWeight(1.2);

      polygon(warpedX, warpedY, 34, 6);

    }
  }

  pop();

 //////////////////////////////////////////////////
// ANTENA SENSORIAL
//////////////////////////////////////////////////

antennaX = lerp(antennaX, mouseX, 0.12);
antennaY = lerp(antennaY, mouseY, 0.12);

drawAntenna();
  ellipse(mouseX, mouseY, 14);

  //////////////////////////////////////////////////
  // NÉVOA ATMOSFÉRICA
  //////////////////////////////////////////////////

  noStroke();

  fill(30, 60, 120, 10);

  for (let i = 0; i < 10; i++) {

    ellipse(
      random(width),
      random(height),
      random(250, 600)
    );

  }
//////////////////////////////////////////////////
// LUZES INTERATIVAS
//////////////////////////////////////////////////
drawStageSystem();

if (astronautSeen) {
  astronautTimer++;
  drawAstronaut();
}

drawLog();
  
  if(collapseEnding){

drawCollapse();

}

if(moonEnding){

drawMoonEnding();

}

}

//////////////////////////////////////////////////
// ESTRELAS
//////////////////////////////////////////////////

function drawStars(multiplier) {

  noStroke();

  for (let star of stars) {

    fill(255, star.glow * 0.15);

    ellipse(star.x, star.y, star.size * 4);

    fill(255, star.glow);

    ellipse(star.x, star.y, star.size);

    star.y += star.speed * multiplier;

    if (star.y > height) {
      star.y = 0;
      star.x = random(width);
    }

  }

}
 //////////////////////////////////////////////////
// DESENHAR LUZES
//////////////////////////////////////////////////



//////////////////////////////////////////////////
// FOGUETE
//////////////////////////////////////////////////

function drawRocket() {

  rocketX += 1.2;

  if (rocketX > width + 100) {
    rocketX = -100;
    rocketY = random(height * 0.15, height * 0.4);
  }

  push();

  translate(rocketX, rocketY);

  fill(255, 40);
  ellipse(0, 0, 50, 20);

  fill(220);
  rect(-20, -5, 40, 10, 5);

  triangle(20, -5, 30, 0, 20, 5);

  triangle(-10, 5, -18, 12, 0, 5);

  fill(255, 120, 0);
  triangle(-20, -3, -35, 0, -20, 3);

  pop();

}

//////////////////////////////////////////////////
// CLICK
//////////////////////////////////////////////////

function mousePressed() {
  
  if (!audioStarted){

    userStartAudio();

    introDrone.start( 0.12, 2);

    logBeep.start();

    audioStarted = true;

  }

 

  if (state === "intro") {

    let bx = width / 2 - 60;
    let by = height / 2 + 70;
    let bw = 120;
    let bh = 40;

    if (
      mouseX > bx &&
      mouseX < bx + bw &&
      mouseY > by &&
      mouseY < by + bh
    ) {

      state = "transition";
      playTransitionSound ();
fullscreen (true);
      setTimeout(()=>{

resizeCanvas(
windowWidth,
windowHeight
);

},300);
    }

  }

if(
mouseX > width/2 - 100 &&
mouseX < width/2 + 100 &&
mouseY > height/2 + 130 &&
mouseY < height/2 + 170
){

document
.getElementById("archive")
.scrollIntoView({
behavior:"smooth"
});

}


}
//////////////////////////////////////////////////
// ANTENA
//////////////////////////////////////////////////

function drawAntenna(){

push();

translate(antennaX,antennaY);

stroke(180,220,255);

strokeWeight(2);

noFill();

let wiggle =
sin(frameCount*0.15)*6;

bezier(
0,0,
-15,-20,
-30,-35+wiggle,
-45,-60
);

bezier(
0,0,
15,-20,
30,-35-wiggle,
45,-60
);

fill(220,240,255,80);

ellipse(0,0,22);

pop();

}

//////////////////////////////////////////////////
// STAGES
//////////////////////////////////////////////////

function drawStageSystem(){

if(stage===1){

drawLight(
width*0.5,
height*0.45,
[255,255,255]
);

  listenSignal(
width*0.5,
height*0.45,
320
);
  

if(
dist(
antennaX,
antennaY,
width*0.5,
height*0.45
)<55){

currentLog=
"MISSION LOG 01\n\nLIGHT RESPONSE DETECTED";

logAlpha=255;

logTimer++;

if(logTimer>120){

stage=2;

logTimer=0;

}

}

}

//////////////////////////////////////////////////

if(stage===2){

drawLight(
width*0.35,
height*0.35,
[180,220,255]
);

  listenSignal(
width*0.35,
height*0.35,
440
);
  
drawLight(
width*0.65,
height*0.65,
[80,180,255]
);

  listenSignal(
width*0.65,
height*0.65,
580
);
  
//////////////////////////////////////////////////
// ASTRONAUTA
//////////////////////////////////////////////////

if(
dist(
antennaX,
antennaY,
width*0.35,
height*0.35
)<60
){

currentLog=
"CREW ACTIVITY DETECTED\n\nTHERMAL OUTPUT: HIGH";

logAlpha=255;

astronautSeen = true;
  playGhostSignal();

}

//////////////////////////////////////////////////
// NAVE
//////////////////////////////////////////////////

if(
dist(
antennaX,
antennaY,
width*0.65,
height*0.65
)<60
){

currentLog=
"LED ARRAY ACTIVE\n\nNOCTURNAL CYCLE: ABSENT";

logAlpha=255;

shipSeen=true;
  glitchAmount = 0.2;

}

if(astronautSeen && shipSeen){

stage=3;

}

}

//////////////////////////////////////////////////

if(stage===3){

//////////////////////////////////////////////////
// FALSA LUA
//////////////////////////////////////////////////

drawLight(
width*0.3,
height*0.5,
[255,120,120]
);

  listenSignal(
width*0.3,
height*0.5,
180
);
//////////////////////////////////////////////////
// LUA VERDADEIRA
//////////////////////////////////////////////////

drawLight(
width*0.72,
height*0.5,
[240,240,220]
);

listenSignal(
width*0.72,
height*0.5,
820
);  
//////////////////////////////////////////////////
// COLAPSO
//////////////////////////////////////////////////

if(
dist(
antennaX,
antennaY,
width*0.3,
height*0.5
)<65
){

currentLog=
"SIGNAL INSTABILITY\n\nSOURCE DOMINANT";

logAlpha=255;

collapseEnding=true;
  playFalseMoon();
  //////////////////////////////////////////////////
// FALHAS DIGITAIS
//////////////////////////////////////////////////

for(let i=0;i<12;i++){

fill(
random(255),
random(100),
random(100),
random(40,120)
);

rect(

random(width*0.15,width*0.45),

random(height*0.3,height*0.7),

random(10,80),

random(2,12)

);

}

//////////////////////////////////////////////////
// RGB SHIFT
//////////////////////////////////////////////////

push();

blendMode(ADD);

fill(255,0,0,30);

ellipse(
width*0.3 + random(-10,10),
height*0.5,
180
);

fill(0,180,255,20);

ellipse(
width*0.3 + random(-15,15),
height*0.5,
220
);

pop();

}

//////////////////////////////////////////////////
// LUA
//////////////////////////////////////////////////

if(
dist(
antennaX,
antennaY,
width*0.72,
height*0.5
)<65
){

currentLog=
"UNKNOWN LUNAR SIGNAL";

logAlpha=255;

moonEnding=true;
  playMoonSignal ();

}
}
}

//////////////////////////////////////////////////
// LIGHT
//////////////////////////////////////////////////

function drawLight(x,y,c){

let pulse =
sin(frameCount*0.05)*20;

noStroke();

fill(
c[0],
c[1],
c[2],
25
);

ellipse(
x,
y,
120+pulse
);

fill(
c[0],
c[1],
  
c[2],
70
);

ellipse(
x,
y,
55+pulse*0.5
);

fill(
c[0],
c[1],
c[2]
);

ellipse(
x,
y,
18
);

}

function listenSignal(x,y,freq){

let d =
dist(
antennaX,
antennaY,
x,
y
);

if(d < 120){

signalOsc.freq(freq);

let volume =
map(
d,
120,
0,
0,
0.08
);

signalOsc.amp(
volume,
0.1
);

}

}
//////////////////////////////////////////////////
// LOG
//////////////////////////////////////////////////

function drawLog(){

if(logAlpha>0){

fill(
220,
240,
255,
logAlpha
);

textAlign(CENTER);

textSize(20);

text(
currentLog,
width/2,
height*0.15
);

logAlpha-=1.2;

}

}

function playLogBeep(){

logBeep.start();

logBeep.freq(800);

logBeep.amp(0.08,0.01);

logBeep.amp(0,0.2);

}
function playTransitionSound(){

let sweep =
new p5.Oscillator("sawtooth");

sweep.start();

sweep.freq(120);

sweep.amp(0.25,0.05);

sweep.freq(
1200,
1.2
);

sweep.amp(
0,
1.4
);

}

function playGhostSignal(){

ghostOsc.freq(
random(90,160)
);

ghostOsc.amp(
0.05,
0.2
);

ghostOsc.amp(
0,
1.5
);

}

function playFalseMoon(){

falseMoonOsc.freq(80);

falseMoonOsc.amp(
0.12,
0.2
);

falseMoonOsc.amp(
0,
2
);

}

function playMoonSignal(){

moonTone.freq(880);

moonTone.amp(
0.08,
1
);

}
  //////////////////////////////////////////////////
// ASTRONAUTA
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// PNG ASTRONAUTA
//////////////////////////////////////////////////

function drawAstronaut(){

push();

//////////////////////////////////////////////////
// POSIÇÃO
//////////////////////////////////////////////////

let floatX =
sin(frameCount * 0.01) * 15;

let floatY =
sin(frameCount * 0.015) * 10;

translate(
width * 0.62 + floatX,
height * 0.05 + floatY
);

//////////////////////////////////////////////////
// CONSTRUÇÃO
//////////////////////////////////////////////////

let fadeOut = 1;

if(astronautTimer > 380){

fadeOut = map(
astronautTimer,
380,
520,
1,
0
);

}

let build =
constrain(
astronautTimer / 220,
0,
1
) * fadeOut;

//////////////////////////////////////////////////
// INSTABILIDADE
//////////////////////////////////////////////////

let flicker =
0.8 +
sin(frameCount * 0.08) * 0.2;

//////////////////////////////////////////////////
// PEQUENA DEFORMAÇÃO
//////////////////////////////////////////////////

scale(
1 + sin(frameCount*0.01)*0.01,
1 + sin(frameCount*0.012)*0.015
);



//////////////////////////////////////////////////
// TRANSPARÊNCIA
//////////////////////////////////////////////////

tint(
180,
220,
255,
55 * build * flicker
);

//////////////////////////////////////////////////
// IMAGEM
//////////////////////////////////////////////////

image(
  astronautImg,
  -600,
  -300,
  1600,
  1600
);
//////////////////////////////////////////////////
// SCANLINES
//////////////////////////////////////////////////

stroke(180,220,255,18);

for(let y=-100;y<700;y+=8){

line(-200,y,500,y);

}

//////////////////////////////////////////////////
// GLITCH
//////////////////////////////////////////////////

if(random()<0.05){

stroke(255,50);

for(let i=0;i<5;i++){

line(
random(-200,500),
random(-100,700),
random(-200,500),
random(-100,700)
);

}

}

//////////////////////////////////////////////////
// TEXTO FANTASMA
//////////////////////////////////////////////////

fill(180,220,255,30);

noStroke();

textAlign(CENTER);

textSize(18);

text(
"CREW DETECTED",
120,
-60
);

pop();

}



//////////////////////////////////////////////////
// COLLAPSE
//////////////////////////////////////////////////

function drawCollapse(){

glitchAmount += 0.02;

//////////////////////////////////////////////////
// RGB FLASH
//////////////////////////////////////////////////

fill(
255,
random(20,80),
random(20,80),
80
);

rect(
0,
0,
width,
height
);

//////////////////////////////////////////////////
// SCANLINES
//////////////////////////////////////////////////

for(let y=0;y<height;y+=8){

stroke(255,40);

line(0,y,width,y);

}

//////////////////////////////////////////////////
// LOG
//////////////////////////////////////////////////

fill(255);

textSize(28);

textAlign(CENTER);

text(
"ERROR\n\nSIGNAL OVERLOAD",
width/2,
height*0.5
);

}

//////////////////////////////////////////////////
// LUA FINAL
//////////////////////////////////////////////////

function drawMoonEnding(){

background(0,0,5);

//////////////////////////////////////////////////
// ESTRELAS MORREM
//////////////////////////////////////////////////

for(let star of stars){

fill(255,40);

ellipse(
star.x,
star.y,
star.size
);

}

//////////////////////////////////////////////////
// LUA PNG HOLOGRÁFICA
//////////////////////////////////////////////////

push();

//////////////////////////////////////////////////
// FLUTUAÇÃO ORGÂNICA
//////////////////////////////////////////////////

let moonFloatX =
sin(frameCount * 0.008) * 18;

let moonFloatY =
sin(frameCount * 0.012) * 10;

translate(

width/2 + moonFloatX,

height/2 + moonFloatY

);

//////////////////////////////////////////////////
// APARECIMENTO LENTO
//////////////////////////////////////////////////

let moonFade =
constrain(
(frameCount - 100) * 0.008,
0,
1
);

//////////////////////////////////////////////////
// PULSAÇÃO SUAVE
//////////////////////////////////////////////////

let pulse =
1 +
sin(frameCount * 0.02) * 0.015;

scale(
moonFade * pulse
);

//////////////////////////////////////////////////
// TRANSPARÊNCIA
//////////////////////////////////////////////////

tint(
255,
245,
220,
80 * moonFade
);

//////////////////////////////////////////////////
// GLOW SUAVE
//////////////////////////////////////////////////

drawingContext.shadowBlur = 12;

drawingContext.shadowColor =
color(255,245,220,80);

//////////////////////////////////////////////////
// IMAGEM
//////////////////////////////////////////////////

imageMode(CENTER);

image(
moonImg,
0,
0,
520,
520
);
  //////////////////////////////////////////////////
// DUPLICAÇÃO HOLOGRÁFICA
//////////////////////////////////////////////////

if(random() < 0.04){

tint(
180,
220,
255,
25
);

image(
moonImg,
random(-4,4),
random(-4,4),
520,
520
);

}

pop();

//////////////////////////////////////////////////
// LOG FINAL
//////////////////////////////////////////////////

fill(255,240);

textAlign(CENTER);

textSize(24);

text(
"PRIMARY TARGET CONFIRMED",
width/2,
height*0.82
);

}
  
//////////////////////////////////////////////////
// HEXÁGONO
//////////////////////////////////////////////////

function polygon(x, y, radius, npoints) {

  let angle = TWO_PI / npoints;

  beginShape();

  for (let a = 0; a < TWO_PI; a += angle) {

    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;

    vertex(sx, sy);

  }

  endShape(CLOSE);

}

function mouseMoved(){

if(!audioStarted){

userStartAudio();

introDrone.start();
  signalOsc.start();
  ghostOsc.start ();
  falseMoonOsc.start();
  moonTone.start();

introDrone.amp(
0.08,
4
);

audioStarted = true;

}

}

//////////////////////////////////////////////////

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  /////////////////////////////////////////////////
// RECALCULAR ESTRELAS
//////////////////////////////////////////////////

for (let star of stars){

star.x=random(width);
star.y=random(height);

}

}
