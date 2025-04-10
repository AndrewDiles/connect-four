import { useState, useEffect } from "react";
import PlayerIndicator from "./PlayerIndicator";
import Board from "./Board";
import calculateResult from "../../helpers/calculateResult";
import dropAChip from "../../helpers/dropAChip";
import calculateActivePlayerNumber from "../../helpers/calculateActivePlayerNumber";
import calculateIsBotTurn from "../../helpers/calculateIsBotTurn";
import calculateNextMove from "../../helpers/calculateNextMove";

const Game = ({ game, setGame }) => {
  const activeBoard = game.boards[game.boardIndex];
	const [scale, setScale] = useState(1);
  const result = activeBoard ? calculateResult(activeBoard) : 4;
  const isBotTurn = calculateIsBotTurn(game);

	// manage the dimension of the board via scale
	useEffect(()=>{
		const baseBoardWidth = board.offsetWidth;
		const baseBoardHeight = board.offsetHeight;
		const handleSizeChange = () => {
			const windowHeight = window.innerHeight;
			const windowWidth = window.innerWidth;
			const maxXScale = windowWidth / baseBoardWidth;
			const maxYScale = windowHeight / baseBoardHeight;
			setScale(0.7*Math.min(maxXScale, maxYScale));
		}
		handleSizeChange()
		window.addEventListener("resize" , handleSizeChange);
		return () => {
			window.removeEventListener("resize" , handleSizeChange);
		}
	},[])

  // this useEffect performs a bot move in 1-3s
  useEffect(() => {
    let timer;
    if (!result && isBotTurn) {
      const nextBotMove = calculateNextMove(activeBoard, game.activePlayer);
      if (typeof nextBotMove === "number")
        timer = setTimeout(() => {
          handleClickColumn(nextBotMove);
        }, 1000 + Math.random() * 2000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [game]);

  const handleClickColumn = (columnIndex) => {
    const newBoards = game.boards.filter((board, index) => {
      return index <= game.boardIndex;
    });
    const currentActivePlayer = calculateActivePlayerNumber(
      game.startingPlayer,
      newBoards.length - 1
    );
    const nextBoard = dropAChip(
      newBoards[newBoards.length - 1],
      currentActivePlayer,
      columnIndex
    );
    newBoards.push(nextBoard);
    const newActivePlayer = calculateActivePlayerNumber(
      game.startingPlayer,
      newBoards.length - 1
    );
    setGame({
      ...game,
      boards: newBoards,
      activePlayer: newActivePlayer,
      boardIndex: newBoards.length - 1,
    });
  };

  // this useEffect is purely to focus a column when the user can make a move
  useEffect(() => {
    if (!result && !isBotTurn && !game.revisingHistory) {
      const firstSelectableColumn =
        document.querySelector(".selectable-column");
      firstSelectableColumn &&
        firstSelectableColumn.focus &&
        firstSelectableColumn.focus();
    }
  });

  if (!activeBoard) return <p>ERROR - invalid board index</p>;

  return (
    <>
      <PlayerIndicator
        activePlayer={game.activePlayer}
        result={result}
        paused={game.revisingHistory}
				activePlayerIsABot={game.activePlayer === 1 ? game.player1 === "bot" : game.player2 === "bot"}
      />
      <Board
				scale={scale}
        board={activeBoard}
        handleClickColumn={handleClickColumn}
        result={result}
        activePlayer={game.activePlayer}
        disabled={game.revisingHistory || isBotTurn}
        className={
          game.player1 === "bot"
            ? "circuit-board-background"
            : game.player2 === "bot"
            ? "bamboo-background"
            : "plastic-background"
        }
      />
    </>
  );
};

export default Game;
