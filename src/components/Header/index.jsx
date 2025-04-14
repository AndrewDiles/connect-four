import { memo } from "react";
import styled from "styled-components";

const Header = ({ gameOn, difficultBots }) => {
  return (
    <VanishingHeader $gameOn={gameOn} $difficultBots={difficultBots}>
      <h1 className="title">
        CONNECT<span>4</span>
      </h1>
    </VanishingHeader>
  );
};

export default memo(Header);

const VanishingHeader = styled.header`
  @media only screen and (orientation: landscape) and (max-height: 500px) {
    & {
      display: ${({ $gameOn }) => $gameOn && "none"};
    }
  }
	& h1 {
		margin-bottom: ${({$gameOn}) => $gameOn ? "0" : ".5em"};
		color: ${({$difficultBots})=> $difficultBots && "red"};
	}
`;
