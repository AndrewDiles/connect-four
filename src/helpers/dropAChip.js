const dropAChip = (board, playerNumber, targetIndex) => {
	board=JSON.parse(JSON.stringify(board));
	board[targetIndex][board[targetIndex].lastIndexOf(0)] = playerNumber;
	return board
}
export default dropAChip

// for testing, comment out the export and run through node

// const board1 = [
// 	[0,0,0,0,0,0],
// 	[0,0,0,0,0,0],
// 	[0,0,0,0,0,0],
// 	[0,0,0,0,0,1],
// 	[0,0,0,0,0,0],
// 	[0,0,0,0,0,0],
// 	[0,0,0,0,0,0],
// ]

// console.log(dropAChip(board1,2,1))