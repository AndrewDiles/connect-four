// components
import PlayerIndicator from "./PlayerIndicator";
import ExitAndRestartButtons from "./ExitAndRestartButtons";
import Board from "./Board";
import History from "./History";
import SpecialMessage from "./SpecialMessage";

// hooks
import { useEffect } from "react";
import useSound from "use-sound";
import useBoardScale from "./gameHooks/useBoardScale";
import useBotMove from "./gameHooks/useBotMove";
import useFocusColumn from "./gameHooks/useFocusColumn";

// helpers
import calculateResult from "../../helpers/calculateResult";
import dropAChip from "../../helpers/dropAChip";
import calculateActivePlayerNumber from "../../helpers/calculateActivePlayerNumber";
import calculateIsBotTurn from "../../helpers/calculateIsBotTurn";

// assets
import chipSound from "../../assets/sounds/chip.mp3";
import gameCompleteSound from "../../assets/sounds/gameOver.mp3";

const Game = ({ game, setGame }) => {
  const activeBoard = game.boards[game.boardIndex];
  const result = activeBoard ? calculateResult(activeBoard) : 4;
  const isBotTurn = calculateIsBotTurn(game);
  const scale = useBoardScale();
	const [playChipSound] = useSound(chipSound);
	const [playGameOverSound] = useSound(gameCompleteSound);

	useEffect(()=>{
		if (result > 0) {
			!game.mute && playGameOverSound()
		}
	}, [game.mute, result])

  const handleClickColumn = (columnIndex) => {
		!game.mute && playChipSound()
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

  useBotMove({ game, result, isBotTurn, activeBoard, handleClickColumn });
  useFocusColumn({ result, isBotTurn, game });

  if (!activeBoard) return <p>ERROR - invalid board index</p>;

  return (
    <>
      {game.boards.length > 1 && <History game={game} setGame={setGame} />}
      <ExitAndRestartButtons game={game} revisingHistory={game.revisingHistory} setGame={setGame} gameOver={result>0}/>
      <PlayerIndicator
        activePlayer={game.activePlayer}
        result={result}
        paused={game.revisingHistory}
        activePlayerIsABot={
          game.activePlayer === 1
            ? game.player1 === "bot"
            : game.player2 === "bot"
        }
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
			{result === 1 && game.player1 === "human" && game.player2 ==="bot" && !game.difficultBots && <SpecialMessage message='Try "harder bots" for a challenge!'/>}
			{result === 1 && game.player1 === "human" && game.player2 ==="bot" && game.difficultBots && <SpecialMessage message="Wow, you beat the better ai!"/>}
    </>
  );
};

export default Game;
