var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

var tics = 0;

//Canvas
var divArena;
var canArena;
var canScore;
var conArena;
var conScore;
var ArenaWidth = 500;
var ArenaHeight = 300;

//une modification

///////////////////////////////////
//Keys
var keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

var keyStatus = {};

function keyDownHandler(event) {
    "use strict"; 
    var keycode = event.keyCode, 
        key; 
    for (key in keys) {
        if (keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}
function keyUpHandler(event) {
   var keycode = event.keyCode,
            key;
    for (key in keys) 
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }
        
    }
///////////////////////////////////



/////////////////////////////////
//||obj.x >ArenaWidth || obj.x<0
/////////////////////////////////
// Enemy
var briques = {
    init : function(){
        this.tabBriques = new Array();
        for (var j = 3; j >= 0; j--) {
        for (var i = 10; i >= 0; i--) {
            var tmp=new Brique(i*50,j*100);
            this.add(tmp);
        }
    }
    },
    add : function (brique) {
        this.tabBriques.push(brique);  
    },
    remove : function () {  
        this.tabBriques.map(function(brique,index,array){
            if(brique.exists == false){
                  delete array[index];
            }
        });
    },
    draw : function(){ 
        this.tabBriques.map(function(obj){
            obj.draw();
        });
    },
    clear : function(){
       this.tabBriques.map(function(obj){
            obj.clear();
        });
    },
    update : function(){

        this.tabBriques.map(function(obj){
            obj.update();
        });
         this.remove();
    }
    
    
};
//test
function Brique(x,y){
    this.x = x;
    this.y = y;
    this.exists = true;
    this.height = 32;
    this.width = 32;
    this.img = new Image();
    this.img.src = "./assets/brique.png";


    this.collision = function(tabOfObjects){
        var hits = null;
        var index;
        for(index in tabOfObjects){
            if (this.x < tabOfObjects[index].x + tabOfObjects[index].width &&
                this.x + this.width > tabOfObjects[index].x &&
                this.y < tabOfObjects[index].y + tabOfObjects[index].height &&
                this.height + this.y > tabOfObjects[index].y) {
                    // collision detected!
                    hits = tabOfObjects[index];
                    if((this.x+16)-(hits.x+10)>(this.y+16)-(hits.y+10)){
                        hits.invx();
                    }
                    else{
                        hits.invy();
                    }
                    break;
            }
        }
        return hits;
    };
    this.draw = function(){ 
            conArena.drawImage(this.img,  0,0,this.width,this.height, this.x,this.y,this.width,this.height);
    };
    this.clear = function(){
        if(this.exists){
            conArena.clearRect(this.x,this.y,this.width,this.height);
        }
    };
    this.update = function(){
      //is not exploding
            var tmp = this.collision([bille]);
                if(tmp != null){
                    this.exists = false;
                }
    };
}
/////////////////////////////////

/////////////////////////////////
// Hero Player
var bille = {
    init : function(){
        this.img = new Image();
        this.img.src = "./assets/bille.png";
        this.cpt = 0;
    },

    x : 20,
    ySpeed : 2,
    xSpeed :2,
    y : 100,
    height : 22,
    width : 22,
    remove : function(){
        if (this.x>1000) {
                //Game Over
                console.log("GAME OVER");
            }
        },
    clear : function(){
        conArena.clearRect(this.x,this.y,this.width,this.height);
    },
    invx : function(){
        this.xSpeed=-(this.xSpeed);
    },
    invy : function(){
        this.ySpeed=-(this.ySpeed);
    },
    update :  function(){
        this.x=this.x+this.xSpeed;
        this.y=this.y+this.ySpeed;
        if(this.x<0 || this.x>480){
            this.invx()
        }
        if(this.y<0 || this.y>280){
            this.invy()
        }

    },
    draw : function(){
            conArena.drawImage(this.img,0,0,33,33, this.x,this.y,this.width,this.height);
        }
};


function updateItems() {
    "use strict"; 
    briques.update();
    bille.update();
}
function drawItems() {
    "use strict"; 
    briques.draw();
    bille.draw();
}
function clearItems() {
    "use strict"; 
    briques.clear(); 
    bille.clear();
}

function clearScore() {
    conScore.clearRect(0,0,300,50);
}
function drawScore() {
    conScore.fillText("score : "+0, 150,25);
}
function updateGame() {
    "use strict"; 
    updateItems();
}
function clearGame() {
    "use strict"; 
    clearItems();
    clearScore();
}

function drawGame() {
    "use strict"; 
    drawScore();
    drawItems();    
}


function mainloop () {
    "use strict"; 
    clearGame();
    updateGame();
    drawGame();
}

function recursiveAnim () {
    "use strict"; 
    mainloop();
    animFrame( recursiveAnim );
}
 
function init() {
    "use strict";
    divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    canArena.setAttribute("height", ArenaHeight);
    canArena.setAttribute("width", ArenaWidth);
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);

    canScore = document.createElement("canvas");
    canScore.setAttribute("id","canScore");
    canScore.setAttribute("height", ArenaHeight);
    canScore.setAttribute("width", ArenaWidth);
    conScore = canScore.getContext("2d");
    conScore.fillStyle = "rgb(200,0,0)";
    conScore.font = 'bold 12pt Courier';
    divArena.appendChild(canScore);

 
    bille.init();
    briques.init();
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);
/*        var keycode;
            for (keycode in keyStatus) {
                if(keyStatus[keycode] == true){
                    if(keycode == keys.UP) {
                        this.y -= this.ySpeed;
                        if(this.y<0) this.y=0;
                    }
                    if(keycode == keys.DOWN) {
                        this.y += this.ySpeed;
                        if(this.y>ArenaHeight-this.height) this.y=ArenaHeight-this.height;
                    }
                    if(keycode == keys.SPACE) {
                        //shoot
                        this.fires();
                    }
                
             keyStatus[keycode] = false;
            }
        }*/