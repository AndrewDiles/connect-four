import { useState, useEffect } from "react";
import styled from "styled-components";
import startGame from "../../helpers/startGame";

const startButtonText = ["BEGIN", "START", "GO 4 IT", "YEAH", "▶"];

const BeginGameButton = ({ setGame }) => {
  const [startButtonTextIndex, setStartButtonTextIndex] = useState(0);

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
        startGame(setGame, {
          status: "select-mode"
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
