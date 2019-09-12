function XYPlane(canvas){

	this.centerX = 0;
	this.centerY = 0;
	this.width = canvas.width;
	this.height = canvas.height;
	this.ppi = 30;   // pixel per interval
	this.lineWidth = 1;
	this.strokeStyle = '#f0f0f0';
	this.gridcolor = '#606060';
}

XYPlane.prototype.draw = function (context){
	context.save();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.strokeStyle;

	// draw x, y coordinate
	context.beginPath();
	context.moveTo(0, this.centerY);
	context.lineTo(this.width,this.centerY);
	context.moveTo(this.centerX, 0);
	context.lineTo(this.centerX, this.height);
	context.stroke();

	// draw grid
	context.strokeStyle = this.gridcolor;
	context.lineWidth = 1;

	context.beginPath();
	var rightx = 1;
	for (let t=this.centerX+this.ppi; t < this.width; t=t+this.ppi){
		context.moveTo(t, 0);
		context.lineTo(t, this.height);
		context.strokeText(rightx, t, this.centerY + 10);
		rightx+= 1;
	}
	var leftx = 1;
	for (let t=this.centerX-this.ppi; t > 0; t=t-this.ppi){
		context.moveTo(t, 0);
		context.lineTo(t, this.height);
		context.strokeText(leftx*(-1), t, this.centerY + 10);
		leftx+=1;
	}
	var bottomy = 1;
	for (let t=this.centerY+this.ppi; t < this.height; t=t+this.ppi){
		context.moveTo(0,t);
		context.lineTo(this.width,t);
		context.strokeText(bottomy*(-1), this.centerX+10, t);
		bottomy += 1;
	}
	var topy = 1;
	for (let t=this.centerY-this.ppi; t > 0; t=t-this.ppi){
		context.moveTo(0,t);
		context.lineTo(this.width, t);
		context.strokeText(topy, this.centerX+10, t);
		topy += 1;
	}
	context.stroke();
	context.restore();
};