import generateInitialBoard from "./generateInitialBoard"

const startGame = (setter, gameContent) => {
	setter(current => {
		return {
			...current,
			...gameContent,
			revisingHistory: false,
			boardIndex: 0,
      boards: [generateInitialBoard()],
		}
	})
}

export default startGame