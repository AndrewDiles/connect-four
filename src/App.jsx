import { useState } from "react";
import Header from "./components/Header";
import SelectChipColors from "./components/SelectChipColors";
import generateInitialBoard from "./helpers/generateInitialBoard";
import BeginGameButton from "./components/BeginGameButton";
import SelectPlayMode from "./components/SelectPlayMode";
import Game from "./components/Game";

const initialGameState = {
  status: "off", // "off", "select-mode"
	startingPlayer: null,
  activePlayer: null,
  revisingHistory: false,
  boardIndex: 0,
  boards: [generateInitialBoard()],
};

function App() {
  const [game, setGame] = useState(structuredClone(initialGameState));

  return (
    <>
      <Header gameOn={game.status === "on"} />

      {game.status === "off" && (
        <menu>
          <SelectChipColors />
          <BeginGameButton setGame={setGame} />
          <a
            href="https://www.unco.edu/hewit/pdf/giant-map/connect-4-instructions.pdf"
            target="_blank"
          >
            RULES
          </a>
        </menu>
      )}

      {game.status === "select-mode" && <SelectPlayMode setGame={setGame} />}

      {game.status === "on" && <Game game={game} setGame={setGame} />}
    </>
  );
}

export default App;
