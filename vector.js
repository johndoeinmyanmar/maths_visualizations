function Vector(x, y, color){
	if (color == undefined){
		color = '#fff';
	}
	this.x = x; 
	this.y = y;
	this.color = color;
	this.x0 = 10;
	this.y0 = 10;
	this.lineWidth = 2;

}

Vector.prototype.draw = function (context, plane, show_label=false){
	if (plane != undefined){

		this.xp = this.x0 + (this.x * plane.ppi);
		this.yp = this.y0 - (this.y * plane.ppi);
	}
	
	context.save();

	// draw a vector
	context.beginPath();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.color;
	context.moveTo(this.x0, this.y0);
	context.lineTo(this.xp, this.yp);
	context.stroke();

	// draw (x,y) point label
	context.beginPath();
	context.lineWidth = 1;
	if (show_label == true){
		let label = '(' + Math.floor(this.x) + ',' + Math.floor(this.y) + ')';
		context.strokeText(label, this.xp+5, this.yp+5);
	}
	context.stroke();

	// draw tip point
	context.beginPath();
	context.lineWidth = this.lineWidth;
	context.arc(this.xp, this.yp, 2, 0, 2*Math.PI);
	context.stroke();
	context.restore();
};


Vector.prototype.scale = function(value){
	var new_v = new Vector(0,0, '#ff00ff');
	new_v.x0 = this.x0;
	new_v.y0 = this.y0;
	var x = this.x * value;
	var y = this.y * value;
	new_v.x = x;
	new_v.y = y;
	return new_v;
}

Vector.prototype.add = function (v2){
	var new_v = new Vector(0,0, '#0000ff');
	new_v.x = this.x + v2.x;
	new_v.y = this.y + v2.y;
	return new_v;
}