function ROBOT() {
	var that			= this;
	this.actualPosition	= [8, 2];
	this.direction		= '1';
	this.startnumber	= '';

	this.extensionList	= [];
	this.deckActions	= [];

	that.init = function() {
		//that.placeRobot(that.actualPosition);
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