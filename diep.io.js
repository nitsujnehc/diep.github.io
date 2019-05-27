/// MESS AROUND WITH THIS PART ONLY

var mvtSpeed = 5; //default is set to 5
var bulletSpeed = 2; //default is set to 2

/** DON'T TOUCH **/

var spinning = false;
var doAutoSpin = false; //for auto spin

var shoot = false;

var tankSize = 1; //not very useful

var angle = 0; //for facing mouse-pointer

var tankRed = color(255, 0, 0); //red color
var tankBlue = color(15, 155, 230); //blue color
var tankGreen = color(0, 255, 120); //green color
var tankPurple = color(100, 0, 100); //purple color

var centerY = height/2; //tank location X
var centerX = width/2; //tank location Y

var bulletX = width/2; //bullet location X
var bulletY = height/2; //bullet location Y

var Bullet = function(x, y, speed, angleB, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angleB = angleB;
    this.color = color;
};

Bullet.prototype.draw = function() {
    fill(this.color);
    ellipse(this.x, this.y, 10, 10);
};
Bullet.prototype.move = function() {
    bulletX += this.speed;
};

var bullet = new Bullet(bulletX, bulletY, bulletSpeed, angle, tankRed);

var tank = function(color) {
    pushMatrix();
    translate(centerX, centerY);
    rotate(angle);
    fill(100, 100, 100);
    rect(0, -height/40, width/10*tankSize, height/20*tankSize);
    fill(color);
    ellipse(0, 0, width/8*tankSize, height/8*tankSize);
    popMatrix();
}; //tank

var twin = function(color) {
    pushMatrix();
    translate(centerX, centerY);
    rotate(angle);
    fill(100, 100, 100);
    rect(0, (-height/40)+17, width/10*tankSize, height/17*tankSize);
    rect(0, (-height/40)-23, width/10*tankSize, height/17*tankSize);
    fill(color);
    ellipse(0, 0, width/8*tankSize, height/8*tankSize);
    popMatrix();
}; //twin

var triplet = function(color) {
    pushMatrix();
    translate(centerX, centerY);
    rotate(angle);
    fill(100, 100, 100);
    rect(0, (-height/40)+17, width/10*tankSize, height/17*tankSize);
    rect(0, (-height/40)-23, width/10*tankSize, height/17*tankSize);
    rect(20, -height/40, width/10*tankSize, height/20*tankSize);
    fill(color);
    ellipse(0, 0, width/8*tankSize, height/8*tankSize);
    popMatrix();
}; //triplet

var quadTank = function(color) {
    pushMatrix();
    translate(centerX, centerY);
    rotate(angle);
    fill(100, 100, 100);
    rectMode(CENTER);
    rect(0, 0, 120*tankSize, 30*tankSize);
    rect(0, 0, 30*tankSize, 120*tankSize);
    fill(color);
    ellipse(0, 0, width/8*tankSize, height/8*tankSize);
    popMatrix();
    rectMode(LEFT);
}; //quad tank

var flankGuard = function(color) {
    pushMatrix();
    translate(centerX, centerY);
    rotate(angle);
    fill(100, 100, 100);
    rect(0, (-height/40), (width/10)+10*tankSize, height/20*tankSize);
    rect(0, (-height/40), (width/10)-120*tankSize, height/20*tankSize);
    fill(color);
    ellipse(0, 0, width/8*tankSize, height/8*tankSize);
    popMatrix();
}; //flank guard

var coordinateFinder = function() {
    fill(0);
    point(mouseX, mouseY);
    text((round(mouseX-height/2)) + " , " + (round(mouseY-height/2)), mouseX+10, mouseY + 10);
}; //coordinate finder for debugging

var getAngle = function() {
    var s = [
        (mouseY-centerY)/sqrt((mouseY-centerY)*(mouseY-centerY)+(mouseX-centerX)*(mouseX-centerX))
    ];
    angle =  asin(s[0]);
    if (mouseX < centerX) {
        angle = PI - angle;
    }
    //println("sin: " + s);
    //println("angle: " + angle);
    return angle;
}; //use arcsin to make tank face mouse-pointer




draw = function() {
    background(200); //background and smear preventer
    if (shoot) {
     bullet.move();
    bullet.draw();
    }
    tank(tankRed); //draw tank
    angleMode = "radians"; //set angle type for rotation
    
    if(shoot) {
        bullet.move();
    }
    
    if(spinning===true) {
        angle+=0.02;
    } //auto spin
    else{
        angle = getAngle();
    } //face mouse-pointer

    
    
    //debugging stuff:
        coordinateFinder();
        //println("centerX: " + centerX + ", centerY: " + centerY);
};

keyPressed = function() {
    if(keyCode===UP || keyCode===87) {
        centerY -= mvtSpeed;
    }
    if(keyCode===DOWN || keyCode===83) {
        centerY += mvtSpeed;
    }
    if(keyCode===LEFT || keyCode===65) {
        centerX -= mvtSpeed;
    }
    if(keyCode===RIGHT || keyCode===68) {
        centerX += mvtSpeed;
    }
    if(keyCode===67) { // c
        spinning = !spinning;
        doAutoSpin = !doAutoSpin;
    }
}; //use WASD or arrows to move //use C for auto spin //use E for auto fire(still implementing shooting)

mousePressed = function() {
    bulletX = centerX; //set bulletX
    bulletY= centerY; //set bulletY
    bullet = new Bullet(bulletX, bulletY, bulletSpeed, angle, tankRed);
    bullet.draw();
    shoot = true;
};
