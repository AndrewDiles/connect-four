import ChipSlot from "../shared/ChipSlot";
import styled from "styled-components";

const PlayerIndicator = ({
  paused,
  activePlayer,
  activePlayerIsABot,
  result,
}) => {
  return (
    <StatusMessage id="indicator" className="row">
      {paused ? (
        "CHECKING HISTORY"
      ) : result === 3 ? (
        "DRAW"
      ) : result > 0 ? (
        <>
          {" "}
          <ChipSlot player={result} />
          PLAYER {result} WINS!
        </>
      ) : activePlayerIsABot ? (
        <>
          <ChipSlot player={activePlayer} />
          BOT'S TURN
        </>
      ) : (
        <>
          {" "}
          <ChipSlot player={activePlayer} />
          PLAYER {activePlayer === 1 ? "ONE'S" : "TWO'S"} TURN
        </>
      )}
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
