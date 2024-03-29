/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		moveAmount = 2;
		
	var getX = function() {
    return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};	

	
	var draw = function(ctx) {
		ctx.fillRect(x-5, y-5, 10, 10);
	};

	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		update: update,		
		draw: draw
	}
};