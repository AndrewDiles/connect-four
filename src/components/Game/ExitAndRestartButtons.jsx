import styled from "styled-components";
import startGame from "../../helpers/startGame";
import back from "../../assets/back.svg";
import restart from "../../assets/restart.svg";

const ExitAndRestartButtons = ({ gameOver, setGame }) => {
  return (
    <ButtonsContainer className="column">
      <button
        onClick={() => {
          startGame(setGame, { status: "select-mode" });
        }}
      >
        <img src={back} alt="back button" />
      </button>
      {gameOver && (
        <button
					style={{marginTop:"var(--border-size)"}}
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
