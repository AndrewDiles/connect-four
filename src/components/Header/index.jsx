import styled from "styled-components";

const Header = ({ gameOn }) => {
  return (
    <VanishingHeader $gameOn={gameOn}>
      <h1 className="title">
        CONNECT<span>4</span>
      </h1>
    </VanishingHeader>
  );
};

export default Header;

const VanishingHeader = styled.header`
  @media only screen and (orientation: landscape) and (max-height: 500px) {
    & {
      display: ${({ $gameOn }) => $gameOn && "none"};
    }
  }
	& h1 {
		margin-bottom: ${({$gameOn}) => $gameOn ? "0" : ".5em"};
	}
`;
