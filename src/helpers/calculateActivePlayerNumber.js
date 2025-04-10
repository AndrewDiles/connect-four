const calculateActivePlayerNumber = (startingPlayerNumber, numberOfMoves) => {
	const activePlayerIsStartingPlayer = numberOfMoves % 2 == 0;
	if (activePlayerIsStartingPlayer) return startingPlayerNumber

	return startingPlayerNumber === 1 ? 2 : 1
}

export default calculateActivePlayerNumber