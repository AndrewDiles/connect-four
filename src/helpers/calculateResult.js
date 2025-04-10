// calculateResult will return:
// - 0 if the game is ongoing
// - 1 if player 1 has a win
// - 2 if player 2 has a win
// - 3 if the game is a draw

const calculateResult = (board) => {
	// Looking for any non 0 four-in-a row along any row, column, or diagonal 
	// Row tests
	for (let rowIndex = 0; rowIndex < 6; rowIndex++){
		for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
			// logic of 1st test: If the first cell is open (0), go to the next loop
			// logic of 2nd test: If the first cell, and the cell to its right are the same, proceed
			// logic of 3rd test: If the third cell and fourth cells are the same, proceed
			// logic of 4th test: If the first of fourth cell are the same, winner!
			if ( board[columnIndex][rowIndex] !== 0 &&
					board[columnIndex][rowIndex] === board[columnIndex+1][rowIndex] &&
					board[columnIndex+2][rowIndex] === board[columnIndex+3][rowIndex] &&
					board[columnIndex][rowIndex] === board[columnIndex+3][rowIndex]
				) return board[columnIndex][rowIndex]
		}
	}

	// Column tests
	
	for (let columnIndex = 0; columnIndex < 7; columnIndex++){
		for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
			if ( board[columnIndex][rowIndex] !== 0 &&
					board[columnIndex][rowIndex] === board[columnIndex][rowIndex+1] &&
					board[columnIndex][rowIndex+2] === board[columnIndex][rowIndex+3] &&
					board[columnIndex][rowIndex] === board[columnIndex][rowIndex+3]
				) return board[columnIndex][rowIndex]
		}
	}

	// \ tests

	for (let columnIndex = 0; columnIndex < 4; columnIndex++){
		for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
			if ( board[columnIndex][rowIndex] !== 0 &&
					board[columnIndex][rowIndex] === board[columnIndex+1][rowIndex+1] &&
					board[columnIndex+2][rowIndex+2] === board[columnIndex+3][rowIndex+3] &&
					board[columnIndex][rowIndex] === board[columnIndex+3][rowIndex+3]
				) return board[columnIndex][rowIndex]
		}
	}

	// / tests

	for (let columnIndex = 3; columnIndex < 7; columnIndex++){
		for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
			if ( board[columnIndex][rowIndex] !== 0 &&
					board[columnIndex][rowIndex] === board[columnIndex-1][rowIndex+1] &&
					board[columnIndex-2][rowIndex+2] === board[columnIndex-3][rowIndex+3] &&
					board[columnIndex][rowIndex] === board[columnIndex-3][rowIndex+3]
				) return board[columnIndex][rowIndex]
		}
	}

	// Neither player has won, test if the board is full

	let hasAZero = false;

	board.forEach(columnArray=>{
		if (hasAZero) return
		hasAZero = columnArray.includes(0)
	})
	return hasAZero ? 0 : 3
}

export default calculateResult