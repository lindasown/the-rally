function BOARD() {
	var that			= this;
	that.size			= 10,10;
	that.startnumber	= '';

	that.extensionList	= [];
	that.deckActions	= [];

	that.init = function() {
		that.createBoard(10, 10);
	}


	that.createBoard = function(x, y) {
		var fieldCount = x * y;

		for (var i = 0; i < fieldCount; i++) {
			$('#playboard').append('<div class="field"></div>');
		}
	}

}
