function XYPlane(canvas){

	this.centerX = 0;
	this.centerY = 0;
	this.width = canvas.width;
	this.height = canvas.height;
	this.ppi = 30;   // pixel per interval
	this.lineWidth = 1;
	this.strokeStyle = '#f0f0f0';
	this.gridcolor = '#606060';
	this.zoom_factor = 1;
	this.grid = true;
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

	// draw x, y labels
	context.beginPath();
	context.fillStyle = '#ffffff';
	context.font = '20px Arial';
	context.fillText('x', this.width-10, this.centerY-5);
	context.fillText('y', this.centerX-10, 10);

	// draw grid
	if (this.grid === true){
		context.strokeStyle = this.gridcolor;
		context.lineWidth = 1;

		context.beginPath();
		context.font = '12px Arial';
		var rightx = 0;
		for (let t=this.centerX; t < this.width; t=t+this.ppi){
			context.moveTo(t, 0);
			context.lineTo(t, this.height);
			context.fillText(rightx, t, this.centerY + 10);
			rightx+= this.zoom_factor;
		}
		var leftx = 0;
		for (let t=this.centerX; t > 0; t=t-this.ppi){
			context.moveTo(t, 0);
			context.lineTo(t, this.height);
			context.fillText(leftx*(-1), t, this.centerY + 10);
			leftx+= this.zoom_factor;
		}
		var bottomy = 0;
		for (let t=this.centerY; t < this.height; t=t+this.ppi){
			context.moveTo(0,t);
			context.lineTo(this.width,t);
			context.fillText(bottomy*(-1), this.centerX+10, t);
			bottomy += this.zoom_factor;
		}
		var topy = 0;
		for (let t=this.centerY; t > 0; t=t-this.ppi){
			context.moveTo(0,t);
			context.lineTo(this.width, t);
			context.fillText(topy, this.centerX+10, t);
			topy += this.zoom_factor;
		}
	}
	
	context.stroke();
	context.restore();
};

function Plot(){
	this.x = [];
	this.y = [];
	this.strokeStyle = '#ffffff';
	this.lineWidth = 2;
	this.offset = 0;
}

Plot.prototype.draw = function (context, plane){

	context.save();
	var ppi = plane.ppi / plane.zoom_factor;
	var cx = plane.centerX + this.offset;
	var cy = plane.centerY;

	context.beginPath();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.strokeStyle;
	context.moveTo(cx+this.x[0]*ppi, cy-this.y[0]*ppi);
	for (let i=0; i< this.x.length -1 ; i++){
		context.lineTo(cx+this.x[i]*ppi, cy-this.y[i]*ppi);	
		context.moveTo(cx+this.x[i]*ppi, cy-this.y[i]*ppi);	
	}

	context.stroke();
	context.restore();
};

function zoom(e){
			if (e.deltaY > 0){
				plane.ppi += 1;
				if (plane.ppi > 60){
					plane.ppi = 30;
					plane.zoom_factor /= 2;
				}
			}else{
				plane.ppi -= 1;
				if (plane.ppi < 25){
					plane.ppi = 30;
					plane.zoom_factor *= 2;
				}
			
			}
		}