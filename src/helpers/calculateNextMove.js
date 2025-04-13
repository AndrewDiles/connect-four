import calculateResult from "./calculateResult";
import dropAChip from "./dropAChip";

const calculateImperativeMove = (currentBoard, botPlayerNumber, possibleMoves) => {
	let moveToMake = null;

	// if bot can win, win

	possibleMoves.forEach(potentialColumn => {
		const possibleResult = calculateResult(dropAChip(currentBoard, botPlayerNumber, potentialColumn));
		if (possibleResult === botPlayerNumber) moveToMake = potentialColumn;
	})

	if (typeof moveToMake === "number") return moveToMake

	// if other player can win, stop them

	const otherPlayerNumber = botPlayerNumber === 1 ? 2 : 1;

	possibleMoves.forEach(potentialColumn => {
		const possibleResult = calculateResult(dropAChip(currentBoard, otherPlayerNumber, potentialColumn));
		if (possibleResult === otherPlayerNumber) moveToMake = potentialColumn;
	})

	if (typeof moveToMake === "number") return moveToMake
}

const makeWeakPlay = (currentBoard, possibleMoves) => {
	// if under 3 moves, play within middle

	let chipsInBottomTwoRows = 0;

	for (let columnNumber = 0; columnNumber < 7; columnNumber++) {
		for (let rowNumber = 4; rowNumber < 6; rowNumber++) {
			if (currentBoard[columnNumber][rowNumber]) chipsInBottomTwoRows++
		}
	}
	
	if (chipsInBottomTwoRows <3) {
		return Math.random() > .5 ? 3 : Math.random() > .5 ? 2 : 4
	}

	return possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
}

const calculateNextMove = (currentBoard, botPlayerNumber) => {
	const possibleMoves = [];
	for (let columnNumber = 0; columnNumber < 7; columnNumber++) {
		if (!currentBoard[columnNumber][0]) possibleMoves.push(columnNumber)
	}

	let moveToMake = calculateImperativeMove(currentBoard, botPlayerNumber, possibleMoves);

	if (typeof moveToMake === "number") return moveToMake

	return makeWeakPlay(currentBoard, possibleMoves)
}

export default calculateNextMove