import generateInitialBoard from "./generateInitialBoard";

const startGame = (setter, gameContent) => {
	const nextStartingPlayer = Math.random() > 0.5 ? 1 : 2;
	setter(current => {
		return {
			...current,
			...gameContent,
			startingPlayer: nextStartingPlayer,
			activePlayer: nextStartingPlayer,
			revisingHistory: false,
			boardIndex: 0,
      boards: [generateInitialBoard()],
		}
	})
}

export default startGame