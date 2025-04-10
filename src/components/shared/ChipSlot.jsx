import styled from "styled-components";

const ChipSlot = ({player, faded, style}) => <Chip $player={player} $faded={faded} style={style ? style : {}}/>

export default ChipSlot

const Chip = styled.div`
  height: 30px;
  width: 30px;
  background: ${({$player})=> $player === 1 ? "var(--p1-color)" : $player === 2 ? "var(--p2-color)" : "cornsilk"};
  border-radius: 50%;
	border: 2px solid black;
	margin: 5px -5px;
	position: relative;
	opacity: ${({$faded})=>$faded && ".65"};
	filter: ${({$faded})=>$faded && "hue-rotate(5deg)"};
	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
		height: 100%;
		width: 100%;
		box-shadow: ${({$player})=> $player &&
		`inset 6px 10px 6px -6px rgba(255,255,255,.3),
		inset -12px -21px 4px -19px rgba(0,0,0,.3)` };
	}
`;