import ChipSlot from "../shared/ChipSlot";
import styled from "styled-components";

const PlayerIndicator = ({
  paused,
  activePlayer,
  activePlayerIsABot,
  result,
}) => {
  if (paused) {
    return <StatusMessage className="row">CHECKING HISTORY</StatusMessage>;
  }
  if (result === 3) {
    return <StatusMessage className="row">DRAW</StatusMessage>;
  }
  if (result > 0) {
    return (
      <StatusMessage className="row">
        <ChipSlot player={result} />
        PLAYER {result} WINS!
      </StatusMessage>
    );
  }

  if (activePlayerIsABot) {
    return (
      <StatusMessage className="row">
        <ChipSlot player={activePlayer} />
        BOT'S TURN
      </StatusMessage>
    );
  }

  return (
    <StatusMessage className="row">
      <ChipSlot player={activePlayer} />
      PLAYER {activePlayer === 1 ? "ONE'S" : "TWO'S"} TURN
    </StatusMessage>
  );
};

export default PlayerIndicator;

const StatusMessage = styled.div`
  margin: 0.5em;
  & div {
    margin-right: 10px;
  }
	@media only screen and (orientation: landscape) and (max-height: 500px) {
    & {
      margin-top: 0;
    }
  }
`;
