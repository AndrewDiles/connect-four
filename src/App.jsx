import { useState } from "react";
import Header from "./components/Header";
import MainMenu from "./components/MainMenu";
import generateInitialBoard from "./helpers/generateInitialBoard";
import SelectPlayMode from "./components/SelectPlayMode";
import Game from "./components/Game";

const initialGameState = {
  status: "off", // "off", "select-mode"
  startingPlayer: null,
  activePlayer: null,
  revisingHistory: false,
  boardIndex: 0,
  boards: [generateInitialBoard()],
  difficultBots: false,
  player1: "human",
  player2: "human",
};

function App() {
  const [game, setGame] = useState(structuredClone(initialGameState));
  return (
    <>
      <Header gameOn={game.status === "on"} difficultBots={game.difficultBots}/>

      {game.status === "off" && <MainMenu setGame={setGame} />}

      {game.status === "select-mode" && <SelectPlayMode game={game} setGame={setGame} />}

      {game.status === "on" && <Game game={game} setGame={setGame} />}
    </>
  );
}

export default App;
