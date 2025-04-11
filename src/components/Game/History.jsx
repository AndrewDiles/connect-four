import { useState, useEffect } from "react";
import styled from "styled-components";
import hourglass from "../../assets/hourglass.svg";
import pause from "../../assets/pause.svg";
import play from "../../assets/play.svg";
import stepBack from "../../assets/stepBack.svg";
import stepForward from "../../assets/stepForward.svg";

const History = ({ game, setGame }) => {
  const [showHourGlass, setShowHourGlass] = useState(false);
  const [width, setWidth] = useState(0);

	console.log(game);
	

  useEffect(() => {
    const timer = setInterval(() => {
      setShowHourGlass((c) => !c);
    }, 2500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <HistoryContainer className="row">
      <button
        onClick={() => {
          setWidth(game.revisingHistory ? 0 : 1);
          setGame((currentGame) => {
            return {
              ...currentGame,
              revisingHistory: !currentGame.revisingHistory,
            };
          });
        }}
      >
        <img
          src={!game.revisingHistory ? pause : showHourGlass ? hourglass : play}
          alt={
            game.revisingHistory ? "resume game button" : "pause game button"
          }
        />
      </button>

      <ExpandingStepsContainer $width={width}>
        <button
					disabled={game.boardIndex === 0}
          onClick={() => {
            setGame((currentGame) => {
              return {
                ...currentGame,
                boardIndex: game.boardIndex - 1,
								activePlayer : game.activePlayer === 1 ? 2 : 1
              };
            });
          }}
        >
          <img src={stepBack} alt="Back a move" />
        </button>

        <button
					disabled={game.boardIndex >= game.boards.length -1}
          onClick={() => {
            setGame((currentGame) => {
              return {
                ...currentGame,
                boardIndex: game.boardIndex + 1,
								activePlayer : game.activePlayer === 1 ? 2 : 1
              };
            });
          }}
        >
          <img src={stepForward} alt="Forward a move" />
        </button>
      </ExpandingStepsContainer>
    </HistoryContainer>
  );
};

export default History;

const HistoryContainer = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  & button {
    margin: var(--border-size);
  }
`;

const ExpandingStepsContainer = styled.div`
  transform-origin: left center;
  transform: scaleX(${({ $width }) => $width});
  transition: transform 0.5s ease-in-out;
  /* display: ${({ $width }) => ($width ? "block" : "none")}; */
  visibility: ${({ $width }) => ($width ? "visible" : "hidden")};
`;
