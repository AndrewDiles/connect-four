import { useState, useEffect } from "react";
import useSound from "use-sound";
import styled from "styled-components";
import startGame from "../../helpers/startGame";
import forward from "../../assets/sounds/forward.mp3";

const startButtonText = ["BEGIN", "START", "GO 4 IT", "YEAH", "▶"];

const BeginGameButton = ({ game, setGame }) => {
  const [startButtonTextIndex, setStartButtonTextIndex] = useState(0);
  const [playStartSound] = useSound(forward);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartButtonTextIndex((currentStartButtonTextIndex) => {
        if (currentStartButtonTextIndex >= startButtonText.length - 1) {
          return 0;
        } else {
          return currentStartButtonTextIndex + 1;
        }
      });
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StartButton
      onClick={() => {
        !game.mute && playStartSound();
        startGame(setGame, {
          status: "select-mode",
        });
      }}
    >
      {startButtonText[startButtonTextIndex]}
    </StartButton>
  );
};

export default BeginGameButton;

const StartButton = styled.button`
  min-width: 3em;
  display: block;
  margin: 1em auto;
`;
