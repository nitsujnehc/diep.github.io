/** MESS AROUND WITH THESE ONLY **/

var mvtSpeed = 5; //default is set to 5



/** DON'T TOUCH **/

var spinning = false;

var tankSize = 1;

var angle = 0;

var tankRed = color(255, 0, 0);
var tankBlue = color(15, 155, 230);

var x=0; 
var y=0;

var centerY = height/2;
var centerX = width/2;

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



var coordinates = function() {
    fill(0);
    point(mouseX, mouseY);
    text((round(mouseX-height/2)) + " , " + (round(mouseY-height/2)), mouseX+10, mouseY + 10);
};


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
};

draw = function() {
    background(200);
    if(keyCode===49) {
        tank(tankBlue);
    } //1
    if(keyCode===50) {
        twin(tankBlue);
    } //2
    if(keyCode===51) {
        triplet(tankBlue);
    } //3
    if(keyCode===52) {
        flankGuard(tankBlue);
    } //4
    if(keyCode===53) {
        quadTank(tankBlue);
    } //5
    
    tank(tankRed);
    angleMode = "radians";
    
    if(spinning===true) {
        angle+=0.1;
    } else{
        angle = getAngle();
    }
    
    
    
    //coordinates();
    
    println("centerX: " + centerX + ", centerY: " + centerY);
};
    

keyPressed = function() {
    
    if(keyCode===UP || keyCode===87) {
        centerY -= mvtSpeed;
    } else if(keyCode===DOWN || keyCode===83) {
        centerY += mvtSpeed;
    } else if(keyCode===LEFT || keyCode===65) {
        centerX -= mvtSpeed;
    } else if(keyCode===RIGHT || keyCode===68) {
        centerX += mvtSpeed;
    } else if(keyCode===67) {
        spinning = !spinning;
    }
}; //use WASD or arrows to move

