function SlopeLine(x,y,length=30){

	this.length = length
	this.x = x;
	this.y = y;
	this.strokeStyle = '#77a34a';
	this.lineWidth = 1;
	this.pivot = true;

}

SlopeLine.prototype.draw = function(context, slope){
	this.slope_angle = Math.atan(slope);
	this.run_len = this.length*Math.cos(this.slope_angle);
	this.rise_len = this.length*Math.sin(this.slope_angle);

	context.save();

	context.beginPath();
	context.strokeStyle = this.strokeStyle;
	context.lineWidth = this.lineWidth;

	var x1 = this.x - this.run_len / 2;
	var y1 = this.y + this.rise_len / 2;

	var x2 = this.x + this.run_len / 2;
	var y2 = this.y - this.rise_len / 2;

	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	
	if (this.pivot === true){
		context.moveTo(this.x, this.y);
		context.arc(this.x, this.y,2,0, 2*Math.PI);
		context.fillStyle = '#ffffff';
		context.fill();	
	}
	

	context.stroke();
	context.restore();

};