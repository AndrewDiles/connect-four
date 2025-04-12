import styled from "styled-components";
import startGame from "../../helpers/startGame";
import back from "../../assets/back.svg";

const BackButton = ({ setGame }) => {
  return (
    <StyledButton
      onClick={() => {
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
