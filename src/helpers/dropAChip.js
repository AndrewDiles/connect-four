const dropAChip = (board, playerNumber, targetIndex) => {
	board=JSON.parse(JSON.stringify(board));
	board[targetIndex][board[targetIndex].lastIndexOf(0)] = playerNumber;
	return board
}
export default dropAChip

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