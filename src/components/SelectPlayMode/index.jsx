import { useState, useEffect } from "react";
import styled from "styled-components";
import human from "../../assets/human.svg";
import bot from "../../assets/bot.svg";
import betterBot from "../../assets/betterBot.svg";
import BackButton from "./BackButton";
import startGame from "../../helpers/startGame";

const SelectPlayMode = ({ game, setGame }) => {
  const [botVsBotUnlock, setBotVsBotUnlock] = useState(false);
  const [secretInputInteraction, setSecretInputInteraction] = useState(false);
  const [secretText, setSecretText] = useState("");

  useEffect(() => {
    if (secretText.toLowerCase().includes("unlock bots")) {
      return setBotVsBotUnlock(true);
    }
		if (secretText.toLowerCase().includes("harder bots")) {
			setSecretText("");
			setGame({...game, difficultBots: true})
    }
  }, [secretText]);

	const sharedNewGame = {
		status: "on",
		player1: "human",
    player2: "human",
	}

	const botSrc = game.difficultBots ? betterBot : bot;

  return (
    <Container $botVsBotUnlock={botVsBotUnlock}>
      <BackButton setGame={setGame} />

      <ModeSelectionButton
        className="plastic-background"
        type="button"
        onClick={() => {
          startGame(setGame, {
            ...sharedNewGame
          });
        }}
      >
        <img src={human} alt="human player" />
        <img src={human} alt="human player" />
        <DiagonalVersus />
      </ModeSelectionButton>

      <ModeSelectionButton
        className="bamboo-background"
        type="button"
        onClick={() => {
          startGame(setGame, {
            ...sharedNewGame,
            player2: "bot",
          });
        }}
      >
        <img src={human} alt="human player" />{" "}
        <img src={botSrc} alt="computer player" />
        <DiagonalVersus />
      </ModeSelectionButton>

      {botVsBotUnlock && (
        <ModeSelectionButton
          className="circuit-board-background"
          type="button"
          onClick={() => {
            startGame(setGame, {
              ...sharedNewGame,
              player1: "bot",
              player2: "bot",
            });
          }}
        >
          <img src={botSrc} alt="computer player" />{" "}
          <img src={botSrc} alt="computer player" /> <DiagonalVersus />
        </ModeSelectionButton>
      )}
      {!botVsBotUnlock && (
        <HiddenLabel
          className="column"
          $secretInputInteraction={secretInputInteraction}
          onMouseEnter={() => {
            setSecretInputInteraction(true);
          }}
          htmlFor="unlock hidden mode"
        >
          Enter "unlock bots" for a secret.
          <input
            onFocus={() => {
              setSecretInputInteraction(true);
            }}
            onClick={() => {
              setSecretInputInteraction(true);
            }}
            name="unlock hidden mode"
            value={secretText}
            onChange={({ target }) => setSecretText(target.value)}
          ></input>
        </HiddenLabel>
      )}
    </Container>
  );
};

export default SelectPlayMode;

const Container = styled.section`
  grid-gap: 1rem;
  display: grid;
  margin: 0 auto 1em;
  grid-template-columns: ${({ $botVsBotUnlock }) =>
    $botVsBotUnlock ? "1fr 1fr 1fr" : "1fr 1fr"};
  max-width: ${({ $botVsBotUnlock }) => ($botVsBotUnlock ? "900px" : "600px")};
  padding-bottom: 3rem;

  & button:nth-child(4) {
    transition: all 0.3s ease-in-out, left 0.01s linear;
  }

  @media only screen and (max-width: 700px) {
    & {
      grid-template-columns: ${({ $botVsBotUnlock }) =>
        $botVsBotUnlock ? "1fr 1fr" : "1fr 1fr"};
    }
    & button:nth-child(4) {
      left: 52%;
    }
  }
  @media only screen and (max-width: 450px) {
    & {
      grid-template-columns: 1fr;
    }
    & img {
      scale: 1.3;
    }
    & button:nth-child(4) {
      left: 0;
    }
  }
`;

const ModeSelectionButton = styled.button`
  position: relative;
  width: 80%;
  justify-self: center;
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--semi-transparent-bg);
  padding: 0;
  padding-top: calc(80% - calc(var(--border-size) * 2));
  scale: 1;
  & img:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: top left;
  }
  & img:nth-child(2) {
    position: absolute;
    bottom: 0;
    right: 0;
    transform-origin: bottom right;
  }
  &:active span::after {
    -webkit-text-stroke: var(--border-size) var(--active-color);
  }
`;

const HiddenLabel = styled.label`
  grid-column: 1 / 2;
  justify-self: center;
  position: absolute;
  bottom: 0.5em;
  color: ${({ $secretInputInteraction }) =>
    $secretInputInteraction ? "white" : "transparent"};
  & input {
    margin: 0 1em;
    color: white;
    background-color: ${({ $secretInputInteraction }) =>
      $secretInputInteraction ? "var(--semi-transparent-bg)" : "transparent"};
  }
  @media only screen and (max-width: 450px) {
    & {
      font-size: 0.8em;
    }
  }
`;

const DiagonalVersus = styled.span`
  position: absolute;
  top: -55%;
  left: 50%;
  transform: rotate(45deg);
  width: 0.6em;
  background-color: yellow;
	border: .2em solid red;
  height: 200%;
  &::after {
    z-index: 5;
    content: "VS";
    position: absolute;
    font-size: 1.5em;
    top: 53%;
    left: 52%;
    transform: translate(-50%, -50%) rotate(-45deg);
    color: white;
    font-weight: bold;
    letter-spacing: calc(var(--border-size) * 0.5);
    -webkit-text-stroke: var(--border-size) black; /* width and color */
    paint-order: stroke fill;
  }
`;
