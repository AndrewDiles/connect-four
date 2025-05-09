import { useState, useEffect } from "react";
import styled from "styled-components";
import ChipSlot from "../shared/ChipSlot";
import is_touch_device4 from "../../helpers/isTouchDevice";

const isTouch = is_touch_device4();

const Column = ({
  columnArray,
  onClick,
  disabled,
	winningCells,
	columnIndex,
  entireBoardDisabled,
  activePlayer,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (entireBoardDisabled) {
      setIsHovered(false);
    }
  }, [entireBoardDisabled]);
  const columnArrayToRender = [...columnArray];
	let lastZero = -1;
	columnArrayToRender.forEach((chip, index) => {
		if (chip === 0) {
			lastZero = index
		}
	})
  // const lastZero = columnArrayToRender.findLastIndex((chip) => chip === 0);
  if (isHovered && lastZero > -1) {
    columnArrayToRender[lastZero] = activePlayer;
  }
  return (
    <Container
			id={`column-${columnIndex}`}
			className={!entireBoardDisabled && !disabled && !columnArray[0] && "selectable-column"}
      disabled={entireBoardDisabled || disabled || columnArray[0]}
      tabIndex={entireBoardDisabled ? -1 : disabled ? -1 : 0}
      onClick={(ev) => {
				// document.activeElement?.blur && document.activeElement.blur()
        if (!entireBoardDisabled) {
					onClick();
					setIsHovered(false);
				}
      }}
      onMouseEnter={() => {
        !entireBoardDisabled && setIsHovered(true);
      }}
      onMouseLeave={() => {
        !entireBoardDisabled && setIsHovered(false);
      }}
    >
      {columnArrayToRender.map((player, rowIndex) => {
				let winner = false;
				if (winningCells) {
					const chipPosition = {columnIndex, rowIndex};
					const matchingCell = winningCells.find(winningPosition => {
						return winningPosition.columnIndex === chipPosition.columnIndex && winningPosition.rowIndex === chipPosition.rowIndex
					})
					if (matchingCell) winner = true;
				}
        const rowNumber = rowIndex + 1;
        return (
          <ChipSlot
            key={rowNumber}
            player={player}
            faded={isHovered && !isTouch && lastZero === rowIndex}
						winner={winner}
          />
        );
      })}
    </Container>
  );
};

export default Column;

const Container = styled.button`
  position: relative;
  border-color: transparent;
  margin: 2px 1px 0 0;
  background-color: transparent;
  outline-offset: -2px;
  cursor: pointer;
	scale: 1;
  &:focus,
  &:focus-visible,
  &:focus-within {
    z-index: 5;
  }
  &:disabled {
    cursor: not-allowed;
  }
  &:hover {
    scale: 1;
    box-shadow: none;
  }
  /* &:disabled:hover {
    outline: 0.25em red solid;
  } */
  &:focus {
    outline: none;
  }
  &:active:not(:disabled) div {
    border-color: var(--active-color);
  }
  &:focus::before {
    z-index: 5;
    content: " ⬇ ";
    position: absolute;
    font-size: 20px;
    top: -9%;
    left: -8%;
    color: white;
    font-weight: bold;
    letter-spacing: calc(var(--border-size) * 0.5);
    -webkit-text-stroke: var(--border-size) black;
    paint-order: stroke fill;
		visibility: ${isTouch && "hidden"};
		padding: 0 20%;
  }
	@-moz-document url-prefix() {
	&:focus::before {
    left: 11%;
  }
}
  &:focus:active::before {
    -webkit-text-stroke: var(--border-size) var(--active-color);
  }
`;
