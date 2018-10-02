require('./game.js');

describe("The test environment", function() {
	var questionsObjectTest = new QuestionDatabase(["Pop", "Science", "Sports", "Rock"]);
	var gameTest = new Game(questionsObjectTest);

	gameTest.add('Chet');
	gameTest.add('Pat');
	gameTest.add('Sue');

	it("should access game", function() {
    	expect(gameTest).toBeDefined();
	});

	it("should access game", function() {
    	expect(questionsObjectTest).toBeDefined();
	});

	it("should be playable", function() {
		var playable = gameTest.isPlayable();
		expect(playable).toEqual(true);
	});

	it("player 1 should be Chet", function() {
		player = gameTest.getPlayer(0);
		expect(player.playerName).toEqual("Chet");
	})
});