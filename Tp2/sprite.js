
var Sprite = function(img,x,y,width,height,canvas,anim,nbfr,freq){
	this.canvas=canvas;
	this.img=img;
	this.context=this.canvas.getContext("2d");
	this.x=x;
	this.y=y;
	this.anim=anim;
	this.nbfr=nbfr;
	this.freq=freq;
	this.width=width;
	this.height=height;
	var cmp=0;
	this.freq=freq;
	this.aff=0;

	this.draw = function()
	{
		
		this.context.clearRect(0,0, 1000, 1000);
		var imageheight=this.height/this.anim;
		var imagewidth=this.width*this.anim/this.nbfr;
		this.context.drawImage(this.img, (this.aff%(this.nbfr/this.anim))*imagewidth ,Math.trunc(this.aff/(this.nbfr/this.anim))*imageheight,imagewidth,imageheight,this.x,this.y,imagewidth,imageheight);

	}
	this.update=function () {
		cmp++;
		if(cmp%this.freq===0){
			this.aff=(this.aff+1)%(this.nbfr/this.anim)+Math.trunc(this.aff/(this.nbfr/this.anim));
		}
	}
	this.setposition=function(x,y){
		this.x=x;
		this.y=y;
	}
	this.setanimation=function(i){
		this.aff=i*(this.nbfr/this.anim)
	}
	this.haut=function(){
		if(this.aff>3){
			this.aff=0;
		}
	}
	this.bas=function(){
		if (!(this.aff>3 && this.aff<8)){
			this.aff=4;
		}
	}
	this.gauche=function(){
		if (!(this.aff>7 && this.aff<12)){
			this.aff=8;
		}
	}
	this.droite=function(){
		if (this.aff<12){
			this.aff=12;
		}
	}

}