function TPlane(plane){
	this.plane = plane;
	this.icap = new Vector(1,0, '#660033');
	
	this.jcap = new Vector(0,1, '#660033');
	
	this.ppi = plane.ppi;
	this.centerX = plane.centerX;
	this.centerY = plane.centerY;
	this.lineWidth = 1;
	this.strokeStyle = '#606060';
}

TPlane.prototype.draw = function (context){

	// context.save();
	// context.beginPath();
	// context.lineWidth = this.lineWidth;
	// context.strokeStyle = this.strokeStyle;
	this.icap.x0 = this.centerX;
	this.icap.y0 = this.centerY;
	this.jcap.x0 = this.centerX;
	this.jcap.y0 = this.centerY;
	this.icap.draw(context,this.plane);
	this.jcap.draw(context, this.plane);


	// context.stroke();

	// context.restore();
};