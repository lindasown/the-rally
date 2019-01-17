function ROBOT() {
	var that			= this;
	this.actualPosition	= [8, 2];
	this.direction		= '1';
	this.startnumber	= '';

	this.extensionList	= [];
	this.deckActions	= [];

	that.init = function() {
		//that.placeRobot(that.actualPosition);
		

		that.ACTIONS = new ACTIONS();
		that.BOARD = new BOARD();
		that.HELPER = new HELPER();

		that.ACTIONS.init();
		that.BOARD.init();
		that.generateRobots();
	}

	that.generateRobots = function() {	
		robotlist['robot-1'] = that.generateSingleRobot('2', '5', '7', 'R2', 'https://cdn.dribbble.com/users/146798/screenshots/2398320/r2d2.png');
		robotlist['robot-2'] = that.generateSingleRobot('2', '2', '2', 'BB8', 'http://icons-for-free.com/free-icons/png/512/2525050.png');

		that.ACTIONS.placeRobot('robot-1', that.HELPER.getPosition('robot-1'));
		that.ACTIONS.placeRobot('robot-2', that.HELPER.getPosition('robot-2'));

		that.generateSingleRobotControls(robotlist['robot-1']['information']['name'], 'robot-1', 1)
		that.generateSingleRobotControls(robotlist['robot-2']['information']['name'], 'robot-2', 2)
	}

	that.generateSingleRobot = function(robot_direction, robot_x, robot_y, robot_name, robot_image) {
		var robotTemplate = '{' +
								'"extensions" : {' +
								'}, ' +
								'"damage" : {' +
									'"spam" : 0,' +
									'"virus" : 0' +
								'},' +
								'"position" : {' +
									'"direction" : "robot_direction",' +
									'"coordinates" : [robot_x,robot_y]' +
								'},' +
								'"information" : {' +
									'"name" : "robot_name", ' +
									'"image" : "robot_image"' +
								'}' +
							'}';

		var newRobot = robotTemplate;
		newRobot = newRobot.replace('robot_direction', robot_direction);
		newRobot = newRobot.replace('robot_x', robot_x);
		newRobot = newRobot.replace('robot_y', robot_y);
		newRobot = newRobot.replace('robot_name', robot_name);
		newRobot = newRobot.replace('robot_image', robot_image);

		newRobot = JSON.parse(newRobot);

		return newRobot;
	}

	that.generateSingleRobotControls = function(robot_name, robot_id, counter) {
		var basicControls = '<select>' +
					'<option value="1-forward">1 forward</option>' +
					'<option value="2-forward">2 forward</option>' +
					'<option value="3-forward">3 forward</option>' +
					'<option value="1-back">1 back</option>' +
					'<option value="turn-left">turn left</option>' +
					'<option value="turn-right">turn right</option>' +
					'<option value="u-turn">uTurn</option>' +
				'</select>';

		$('#controls').append('<form key="' + robot_id + '" id="robotControl-' + counter + '"><h2>' + robot_name + '</h2></form>');

		var controlCounter = 5;

		for (var i = 0; i < controlCounter; i++) {
			$('#robotControl-' + counter).append('<div class="turn' + i + '"></div>');
			$('#robotControl-' + counter + ' .turn' + i).append(basicControls);
		}
			
	}


	

}




//ROBOTS

//multiple robots on the field, at least 2
//proceed ACTIONS
//proceed 5 ACTIONS chosen by player
//proceed x ACIONS depending on other robots
//proceed x ACTIONS depending on board

//have EXTENSIONS (it must be possible to activate them)
//have a deck of ACTIONS (deck-only, both)

//have positions
//have a direction (up, down, left, right)
//have changing startnumbers (who is starting) depending on distance to the antenna
