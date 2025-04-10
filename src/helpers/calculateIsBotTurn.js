const calculateIsBotTurn = (game) => {
	if (game.revisingHistory) return false;
	if (game.activePlayer === 1) {
		return game.player1 === "bot"
	}
	return game.player2 === "bot"
}

export default calculateIsBotTurn