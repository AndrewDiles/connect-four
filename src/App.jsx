import { useState } from "react";
import SelectChipColors from "./components/SelectChipColors";
import generateInitialBoard from "./helpers/generateInitialBoard";
import BeginGameButton from "./components/BeginGameButton";
import SelectPlayMode from "./components/SelectPlayMode";

const initialGameState = {
  status: "off", // "off", "select-mode"
  activePlayer: null,
  boardIndex: 0,
  boards: [generateInitialBoard()],
};

function App() {
  const [game, setGame] = useState(structuredClone(initialGameState));

  return (
    <>
      <h1 className="title">
        CONNECT<span>4</span>
      </h1>

      {game.status === "off" && (
        <>
          <SelectChipColors />
          <BeginGameButton setGame={setGame}/>
					<a href="https://www.unco.edu/hewit/pdf/giant-map/connect-4-instructions.pdf" target="_blank">RULES</a>
        </>
      )}

			{game.status==="select-mode" && <SelectPlayMode setGame={setGame}/>}

			{game.status==="on" && <p>Play the game</p>}

    </>
  );
}

export default App;
