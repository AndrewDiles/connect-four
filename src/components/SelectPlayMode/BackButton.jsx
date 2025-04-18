import useSound from "use-sound";
import styled from "styled-components";
import startGame from "../../helpers/startGame";
import back from "../../assets/back.svg";
import backSound from "../../assets/sounds/back.mp3";

const BackButton = ({ game, setGame }) => {
  const [playBackSound] = useSound(backSound);
  return (
    <StyledButton
      onClick={() => {
        !game.mute && playBackSound();
        startGame(setGame, { status: "off" });
      }}
    >
      <img style={{ scale: 1 }} src={back} alt="back button" />
    </StyledButton>
  );
};

export default BackButton;

const StyledButton = styled.button`
  position: absolute;
  right: var(--border-size);
  top: var(--border-size);
`;
