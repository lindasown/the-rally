function ACTIONS() {
	var that			= this;
	this.actualPosition	= [8, 2];
	this.direction		= '1';



	that.init = function() {
		console.log('ACTIONS ready');
		that.placeRobot(that.actualPosition);
		that.test();
	}

	that.test = function() {
		$(document).on('keyup', function(e) {
			if (e.which === 38) {
				that.moveRobot(1);
			} else if (e.which === 76) {
				that.turnRobot('left', 1);
			} else if (e.which === 82) {
				that.turnRobot('right', 1);
			} else if (e.which === 85) {
				that.turnRobot('right', 2);
			}
		})	
	}

	that.placeRobot = function(positionXY) {
		var actualFieldNumber = positionXY[1] * 10;
		actualFieldNumber = actualFieldNumber + positionXY[0]
		$('#playboard > div:nth-child(' + actualFieldNumber + ')').append('<div class="robot"></div>');
		$('.robot').attr('direction', that.direction);
	}

	that.replaceRobot = function(positionXY) {
		$('.robot').remove();

		that.placeRobot(positionXY);
		that.actualPosition = positionXY;
	}

	that.turnRobot = function(direction, steps) {
		var actualDirection = that.direction; //get actualRobotDirection 
		var newDirection = actualDirection;
		console.log(actualDirection);
		if (direction === 'left') {
			newDirection = parseInt(actualDirection) - parseInt(steps);
			if (newDirection < 1) {
				newDirection = parseInt(newDirection) + 4;
			}
		} else {
			newDirection = parseInt(actualDirection) + parseInt(steps);
			if (newDirection > 4) {
				newDirection = parseInt(newDirection) - 4;
			}
		}
		that.direction = newDirection;
		$('.robot').attr('direction', newDirection);
		console.log(that.direction);
	}

	that.uTurnRobot = function() {
		that.turnRobot('left', 2);
	}


	that.moveRobot = function(steps, direction = 'default') {
		var newPosition		= [];
		newPosition[0]		= that.actualPosition[0];
		newPosition[1]		= that.actualPosition[1];
		var robotDirection	= that.direction;

		if (direction === 'default') {
			if (robotDirection == '1') {
				newPosition[1] = newPosition[1] - steps;
			} else if (robotDirection == '2') {
				newPosition[0] = newPosition[0] + steps;
			} else if (robotDirection == '3') {
				newPosition[1] = newPosition[1] + steps;
			} else if (robotDirection == '4') {
				newPosition[0] = newPosition[0] - steps;
			}  
		} else {
			if (direction == '1') {
				newPosition[1] = newPosition[1] - steps;
			} else if (direction == '2') {
				newPosition[0] = newPosition[0] + steps;
			} else if (direction == '3') {
				newPosition[1] = newPosition[1] + steps;
			} else if (direction == '4') {
				newPosition[0] = newPosition[0] - steps;
			}  
		}

		console.log(newPosition);
		that.replaceRobot(newPosition);
	}



}
