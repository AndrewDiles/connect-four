import { useEffect, useState } from "react";
import styled from "styled-components";
import startGame from "../../helpers/startGame";
import exit from "../../assets/exit.svg";
import back from "../../assets/back.svg";
import restart from "../../assets/restart.svg";

const ExitAndRestartButtons = ({ revisingHistory, gameOver, setGame }) => {
  const [revealConfirm, setRevealConfirm] = useState(false);

  useEffect(() => {
    setRevealConfirm(false);
  }, [gameOver]);

  useEffect(() => {
    if (!revealConfirm) return;
    const timer = setTimeout(() => {
      setRevealConfirm(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [revealConfirm]);

  useEffect(() => {
    if (revisingHistory) {
      setRevealConfirm(false);
    }
  }, [revisingHistory]);

  return (
    <ButtonsContainer className="column">
      <div className="row">
        {!gameOver && (
          <>
            {revealConfirm && (
              <button
                type="button"
                style={{ marginRight: "var(--border-size)" }}
                onClick={() => {
                  startGame(setGame, { status: "select-mode" });
                }}
              >
                <img src={back} alt="confirm exit button" />
              </button>
            )}
            <button
              type="button"
              disabled={revealConfirm}
              className="fadedIfDisabled"
              style={{ overflow: "hidden" }}
              onClick={() => {
                setGame((currentGame) => ({
                  ...currentGame,
                  revisingHistory: false,
                }));
                setRevealConfirm(true);
              }}
            >
              <img src={exit} style={{ scale: 1.5 }} alt="exit game button" />
            </button>
          </>
        )}

        {gameOver && (
          <button
            type="button"
            onClick={() => {
              startGame(setGame, { status: "select-mode" });
            }}
          >
            <img src={back} alt="confirm exit button" />
          </button>
        )}
      </div>

      {gameOver && (
        <button
          type="button"
          style={{ marginTop: "var(--border-size)" }}
          onClick={() => {
            startGame(setGame, { status: "on" });
          }}
        >
          <img src={restart} alt="restart button" />
        </button>
      )}
    </ButtonsContainer>
  );
};

export default ExitAndRestartButtons;

const ButtonsContainer = styled.aside`
  position: absolute;
  right: var(--border-size);
  top: var(--border-size);
`;
