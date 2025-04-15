import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChipSlot from "../shared/ChipSlot";
import { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
 0% { top: 0; transform: scaleY(1); }
 30% { top: -30px; transform: scaleY(1.05); }
 32.5% { top: -30px; transform: scaleY(1.2); }
 62.5% { top:0px; transform: scaleY(1); }
 65% { top:0px; transform: scaleY(0.9); }
 70% { top:-1px; transform: scaleY(1.1); }
 80% { top:-10px; transform: scaleY(1); }
 90% { top:0px; transform: scaleY(1); }
 91% { top:0px; transform: scaleY(0.95); }
 93% { top:-5px; transform: scaleY(1); }
 95% { top:0px; transform: scaleY(1); }
 96% { top:0px; transform: scaleY(0.98); }
 97% { top:0px; transform: scaleY(1); }
 98% { top:-2px; transform: scaleY(1); }
 99% { top:0px; transform: scaleY(1); }
 100% { top:0px; transform: scaleY(1); }
`

const ANIMATION_TIME = 1250;

const root = document.querySelector(":root");

function getCSSVariableValue(varName) {
  const styles = getComputedStyle(root);
  return styles.getPropertyValue(varName);
}

const SingleChipSelector = ({ playerNumber }) => {
  const colorInputRef = useRef(null);
	const [booped, setBooped] = useState(false);
	const cSSVarName = `--p${playerNumber}-color`;
	const [color, setColor] = useState(getCSSVariableValue(cSSVarName));

  useEffect(() => {
    if (!colorInputRef.current) return;
    colorInputRef.current.value = getCSSVariableValue(cSSVarName);
		setBooped(true);
  }, []);

	useEffect(()=>{
		let timer;
		if (booped) {
			timer = setTimeout(()=>{
				setBooped(false)
			}, ANIMATION_TIME)
		}
		return () => {
			clearTimeout(timer)
		}
	}, [booped]);

  
  const name = `player ${playerNumber} color`;

	const boopIt = ()=>{
		if (!booped) setBooped(true);
	}

  return (
    <Container key={playerNumber} className="column" $booped={booped} $color={color}>
      <label htmlFor={name}>PLAYER {playerNumber}</label>
      <div className="row" >
        <ChipSlot player={playerNumber}/>
        <input
          name={name}
					onClick={boopIt}
					onMouseEnter={boopIt}
          type="color"
          ref={colorInputRef}
          onChange={({ target: { value } }) => {
            root.style.setProperty(cSSVarName, value);
						setColor(value);
          }}
        ></input>
      </div>
    </Container>
  );
};

export default SingleChipSelector;

const Container = styled.div`
padding: 0 1em;
width: fit-content;
justify-self: center;
& input {
	margin-left: 1rem;
	min-height: 50px;
	min-width: 50px;
}
& >div >div {
	animation-name: ${({$booped}) => $booped ? bounceAnimation : "none"};
	animation-duration: ${ANIMATION_TIME}ms;
	animation-iteration-count: infinite;
	transform-origin: center;
}
& >div input[type="color"]::-webkit-color-swatch {
	background-color: ${({$color})=>$color} !important;
}
`