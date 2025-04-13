const getChipNRight = (position, board, n) => {
  const { columnIndex, rowIndex } = position;
  if (board[columnIndex + n]) {
    return board[columnIndex + n][rowIndex];
  }
};

const getChipNLeft = (position, board, n) => {
  const { columnIndex, rowIndex } = position;
  if (board[columnIndex - n]) {
    return board[columnIndex - n][rowIndex];
  }
};

const getChipNUp = (position, board, n) => {
  const { columnIndex, rowIndex } = position;
  return board[columnIndex][rowIndex - n];
};

const getChipNDown = (position, board, n) => {
  const { columnIndex, rowIndex } = position;
  return board[columnIndex][rowIndex + n];
};

const getChipNUpRight = (position, board, n) => {
  const { columnIndex, rowIndex } = position;
  if (board[columnIndex + n]) {
    return board[columnIndex + n][rowIndex - n];
  }
};

const getChipNUpLeft = (position, board, n) => {
  const { columnIndex, rowIndex } = position;
  if (board[columnIndex - n]) {
    return board[columnIndex - n][rowIndex - n];
  }
};

const getChipNDownRight = (position, board, n) => {
  const { columnIndex, rowIndex } = position;
  if (board[columnIndex + n]) {
    return board[columnIndex + n][rowIndex + n];
  }
};

const getChipNDownLeft = (position, board, n) => {
  const { columnIndex, rowIndex } = position;
  if (board[columnIndex - n]) {
    return board[columnIndex - n][rowIndex + n];
  }
};

const adjacentChipFunctions = [
  getChipNRight,
  getChipNLeft,
  getChipNUp,
  getChipNDown,
  getChipNUpRight,
  getChipNUpLeft,
  getChipNDownRight,
  getChipNDownLeft,
];

const getPositionNRight = (position, n) => {
  const { columnIndex, rowIndex } = position;
  return { columnIndex: columnIndex + n, rowIndex };
};

const getPositionNLeft = (position, n) => {
  const { columnIndex, rowIndex } = position;
  return { columnIndex: columnIndex - n, rowIndex };
};

const getPositionNUp = (position, n) => {
  const { columnIndex, rowIndex } = position;
  return { columnIndex: columnIndex, rowIndex: rowIndex - n };
};

const getPositionNDown = (position, n) => {
  const { columnIndex, rowIndex } = position;
  return { columnIndex: columnIndex, rowIndex: rowIndex + n };
};

const getPositionNUpRight = (position, n) => {
  const { columnIndex, rowIndex } = position;
  return { columnIndex: columnIndex + n, rowIndex: rowIndex - n };
};

const getPositionNUpLeft = (position, n) => {
  const { columnIndex, rowIndex } = position;
  return { columnIndex: columnIndex - n, rowIndex: rowIndex - n };
};

const getPositionNDownRight = (position, n) => {
  const { columnIndex, rowIndex } = position;
  return { columnIndex: columnIndex + n, rowIndex: rowIndex + n };
};

const getPositionNDownLeft = (position, n) => {
  const { columnIndex, rowIndex } = position;
  return { columnIndex: columnIndex - n, rowIndex: rowIndex + n };
};

const adjacentPositionFunctions = [
  getPositionNRight,
  getPositionNLeft,
  getPositionNUp,
  getPositionNDown,
  getPositionNUpRight,
  getPositionNUpLeft,
  getPositionNDownRight,
  getPositionNDownLeft,
];

const positionInArray = (arrayOfPositions, positionInQuestion) => {
  return arrayOfPositions.find(
    (possibleMatchingPosition) =>
      possibleMatchingPosition.columnIndex === positionInQuestion.columnIndex &&
      possibleMatchingPosition.rowIndex === positionInQuestion.rowIndex
  );
};

const calculateWinningCells = (board, result) => {
  const winningCells = [];
  board.forEach((columnArray, columnIndex) => {
    columnArray.forEach((cell, rowIndex) => {
      if (cell !== result) return;
      const position = { columnIndex, rowIndex };
      let inAWin = false;
      adjacentChipFunctions.forEach((adjacentFunction, functionIndex) => {
        if (inAWin) return;
        if (
          adjacentFunction(position, board, 1) === result &&
          adjacentFunction(position, board, 2) === result &&
          adjacentFunction(position, board, 3) === result
        ) {
          inAWin = true;
          const position2 = adjacentPositionFunctions[functionIndex](
            position,
            1
          );
          const position3 = adjacentPositionFunctions[functionIndex](
            position,
            2
          );
          const position4 = adjacentPositionFunctions[functionIndex](
            position,
            3
          );
          [position, position2, position3, position4].forEach(
            (positionObject) => {
              if (!positionInArray(winningCells, positionObject)) {
                winningCells.push(positionObject);
              }
            }
          );
        }
      });
    });
  });
  return winningCells;
};

export default calculateWinningCells;
