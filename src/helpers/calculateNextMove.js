import calculateResult from "./calculateResult";
import dropAChip from "./dropAChip";

const generatePossibleMoves = (currentBoard) => {
  const possibleMoves = [];
  for (let columnNumber = 0; columnNumber < 7; columnNumber++) {
    if (!currentBoard[columnNumber][0]) possibleMoves.push(columnNumber);
  }
  return possibleMoves;
};

const getWinningPlay = (currentBoard, botPlayerNumber, possibleMoves) => {
  let moveToMake = null;
  possibleMoves.forEach((potentialColumn) => {
    const possibleResult = calculateResult(
      dropAChip(currentBoard, botPlayerNumber, potentialColumn)
    );
    if (possibleResult === botPlayerNumber) moveToMake = potentialColumn;
  });

  return moveToMake;
};

const calculateImperativeMove = (
  currentBoard,
  botPlayerNumber,
  possibleMoves,
  avoidWins
) => {
  let moveToMake = null;

  // if bot can win, win

  if (!avoidWins) {
    moveToMake = getWinningPlay(currentBoard, botPlayerNumber, possibleMoves);
    if (typeof moveToMake === "number") return moveToMake;
  }

  // if other player can win, stop them

  const otherPlayerNumber = botPlayerNumber === 1 ? 2 : 1;

  possibleMoves.forEach((potentialColumn) => {
    const possibleResult = calculateResult(
      dropAChip(currentBoard, otherPlayerNumber, potentialColumn)
    );
    if (possibleResult === otherPlayerNumber) moveToMake = potentialColumn;
  });

  if (typeof moveToMake === "number") return moveToMake;
};

const makeWeakPlay = (currentBoard, possibleMoves) => {
  // if under 3 moves, play within middle

  let chipsInBottomTwoRows = 0;

  for (let columnNumber = 0; columnNumber < 7; columnNumber++) {
    for (let rowNumber = 4; rowNumber < 6; rowNumber++) {
      if (currentBoard[columnNumber][rowNumber]) chipsInBottomTwoRows++;
    }
  }

  if (chipsInBottomTwoRows < 3) {
    return Math.random() > 0.5 ? 3 : Math.random() > 0.5 ? 2 : 4;
  }

  return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
};

const calculateBetterAiMove = (
  currentBoard,
  botPlayerNumber,
  possibleMoves
) => {
  let possibleImprovedMove = null;
  const movesNotToMake = [];
  possibleMoves.forEach((possibleMove) => {
    if (possibleImprovedMove) return;
    const possibleFutureBoard = dropAChip(
      currentBoard,
      botPlayerNumber,
      possibleMove
    );
    const nextPossibleMoves = generatePossibleMoves(possibleFutureBoard);

    const opponentHasWinningMove = getWinningPlay(
      possibleFutureBoard,
      botPlayerNumber === 1 ? 2 : 1,
      nextPossibleMoves
    );
    if (typeof opponentHasWinningMove === "number") {
      movesNotToMake.push(possibleMove);
    }
    if (!movesNotToMake.includes(possibleMove)) {
      possibleImprovedMove = calculateImperativeMove(
        possibleFutureBoard,
        botPlayerNumber,
        nextPossibleMoves,
        true
      );
    }
  });
	if (typeof possibleImprovedMove === "number") return possibleImprovedMove;

	// hard test bottom row openings
	const opponentNumber = botPlayerNumber === 1 ? 2 : 1;
	for (let columnNumber = 1 ; columnNumber < 5; columnNumber++) {
		const targetCell = currentBoard[columnNumber][5];
		const cellRight = currentBoard[columnNumber+1][5];
		if (targetCell !== opponentNumber || cellRight !== opponentNumber) continue;
		const singleOpenLeft = currentBoard[columnNumber-1][5] === 0;
		const doubleOpenLeft = singleOpenLeft && currentBoard[columnNumber-2] && currentBoard[columnNumber-2][5] === 0;
		const singleOpenRight = currentBoard[columnNumber+2][5] === 0;
		const doubleOpenRight = singleOpenRight && currentBoard[columnNumber+3] && currentBoard[columnNumber+3][5] === 0;
		if (singleOpenLeft && doubleOpenRight && possibleMoves.includes(columnNumber+2)) {
			return columnNumber+2
		}
		if (singleOpenRight && doubleOpenLeft && possibleMoves.includes(columnNumber-1)) {
			return columnNumber-1
		}
		if (doubleOpenLeft && doubleOpenRight) {
			if (columnNumber === 2 && possibleMoves.includes(4)) {
				return 4
			}	else if (columnNumber === 3 && possibleMoves.includes(2)) {
				return 2
			}
		}
	}
	if (movesNotToMake.length > 0) {
		return makeWeakPlay(currentBoard, possibleMoves.filter(possibleMove => !movesNotToMake.includes(possibleMove)));
	}
};

const calculateNextMove = (currentBoard, botPlayerNumber, betterAi) => {
  const possibleMoves = generatePossibleMoves(currentBoard);

  let moveToMake = calculateImperativeMove(
    currentBoard,
    botPlayerNumber,
    possibleMoves
  );

  if (typeof moveToMake === "number") return moveToMake;

  if (betterAi) {
    moveToMake = calculateBetterAiMove(
      currentBoard,
      botPlayerNumber,
      possibleMoves
    );
    if (typeof moveToMake === "number") {
      return moveToMake;
    }
  }
  return makeWeakPlay(currentBoard, possibleMoves);
};

export default calculateNextMove;
