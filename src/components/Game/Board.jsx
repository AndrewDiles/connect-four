import styled from "styled-components";
import Column from "./Column";
import calculateWinningCells from "../../helpers/calculateWinningCells";

const Board = ({
  board,
  handleClickColumn,
  result,
  activePlayer,
  className,
  disabled,
  scale,
}) => {
	const winningCells = (result === 1 || result === 2) ? calculateWinningCells(board, result) : null;
	
  return (
    <Container id="board" className={className} $scale={scale}>
      {board.map((columnArray, index) => {
        return (
          <Column
            key={index}
						winningCells={winningCells}
						columnIndex={index}
            columnArray={columnArray}
            activePlayer={activePlayer}
            onClick={() => {
              handleClickColumn(index);
            }}
            entireBoardDisabled={disabled}
            disabled={result > 0}
          />
        );
      })}
    </Container>
  );
};

export default Board;

const Container = styled.main`
  transform-origin: top;
  transform: scale(${({ $scale }) => $scale || 1});
  position: relative;
  padding: 0 10px;
  margin: auto;
  white-space: nowrap;
  width: fit-content;
  border: 4px solid black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
