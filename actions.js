function ACTIONS() {
	var that			= this;

	that.init = function() {
		console.log('ACTIONS ready');
		robotid = 'robot-1';
		
		//that.test();
		that.executeRobotActions(robotid);
	}

	that.getPosition = function(robotid) {
		return robotlist[robotid]['position']['coordinates'];
	}

	that.getDirection = function(robotid) {
		return robotlist[robotid]['position']['direction'];
	}

	that.test = function() {
		var robotid = 'robot-1';
		$(document).on('keyup', function(e) {
			if (e.which === 38) {
				that.moveRobot(robotid, 1);
			} else if (e.which === 76) {
				that.turnRobot(robotid, 'left', 1);
			} else if (e.which === 82) {
				that.turnRobot(robotid, 'right', 1);
			} else if (e.which === 85) {
				that.turnRobot(robotid, 'right', 2);
			}
		})	
	}

	that.executeRobotActions = function(robotid) {
		$(document).on('keyup', function(e) {
			if (e.which === 13) {
				setTimeout(function(){ that.getSingleRobotAction(robotid, 1); }, 200);
			} 
		})
	}

	that.getSingleRobotAction = function(robotid, counter) {
		var actualAction = $('#robotControl .turn' + counter + ' select').val();

		if (actualAction == '1-forward') {
			that.moveRobot(robotid, 1);
		} else if (actualAction == '2-forward') {
			that.moveRobot(robotid, 2);
		} else if (actualAction == '3-forward') {
			that.moveRobot(robotid, 3);
		} else if (actualAction == '1-back') {
			that.moveRobot(robotid, -1);
		} else if (actualAction == 'turn-left') {
			that.turnRobot(robotid, 'left', 1);
		} else if (actualAction == 'turn-right') {
			that.turnRobot(robotid, 'right', 1);
		} else if (actualAction == 'u-turn') {
			that.uTurnRobot(robotid);
		} 

		if (counter <= 5) {
			setTimeout(function(){ that.getSingleRobotAction(robotid, counter); }, 500);
			counter++;
		}
	}

	that.robotOptic = function(robotid) {
		$("#" + robotid).css('background-image', 'url(' + robotlist[robotid]['information']['image'] + ')');
	}

	that.placeRobot = function(robotid, positionXY) {
		var actualFieldNumber = that.getPosition(robotid)[1] * 10;
		
		actualFieldNumber = actualFieldNumber + positionXY[0];
		$('#playboard > div:nth-child(' + actualFieldNumber + ')').append('<div class="robot" id="' + robotid + '"></div>');
		$('.robot').attr('direction', that.getDirection(robotid));
		that.robotOptic(robotid);
	}

	that.replaceRobot = function(robotid, positionXY) {
		$('.robot').remove();
		that.placeRobot(robotid, positionXY);	
	}

	that.turnRobot = function(robotid, direction, steps) {
		var actualDirection = that.getDirection(robotid); //get actualRobotDirection 
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
		robotlist[robotid]['position']['direction'] = newDirection;
		$('.robot').attr('direction', newDirection);
	}

	that.uTurnRobot = function(robotid) {
		that.turnRobot(robotid, 'left', 2);
	}

	that.moveRobot = function(robotid, steps, direction = 'default') {
		var newPosition		= [];
		newPosition[0]		= that.getPosition(robotid)[0];
		newPosition[1]		= that.getPosition(robotid)[1];
		var robotDirection	= that.getDirection(robotid);

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
		robotlist[robotid]['position']['coordinates'] = newPosition;
		that.replaceRobot(robotid, newPosition);	
	}
}
