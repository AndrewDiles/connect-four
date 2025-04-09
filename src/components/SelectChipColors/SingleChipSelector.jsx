import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChipSlot from "../shared/ChipSlot";
import { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
 0% { top: 0; transform: scaleY(1); }
 30% { top: -30px; transform: scaleY(1); }
 32.5% { top: -30px; transform: scaleY(1.1); }
 62.5% { top:0px; transform: scaleY(1); }
 65% { top:0px; transform: scaleY(0.8); }
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

const root = document.querySelector(":root");

function getCSSVariableValue(varName) {
  var styles = getComputedStyle(root);
  return styles.getPropertyValue(varName);
}

const SingleChipSelector = ({ playerNumber }) => {
  const colorInputRef = useRef(null);
	const [booped, setBooped] = useState(false);

  useEffect(() => {
    if (!colorInputRef.current) return;
    colorInputRef.current.value = getCSSVariableValue(cSSVarName);
  }, []);

	useEffect(()=>{
		let timer;
		if (booped) {
			timer = setTimeout(()=>{
				setBooped(false)
			}, 1000)
		}
		return () => {
			clearTimeout(booped)
		}
	}, [booped]);

  const cSSVarName = `--p${playerNumber}-color`;
  const name = `player ${playerNumber} color`;

	const boopIt = ()=>{
		if (!booped) setBooped(true);
	}

	const chipSlotStyle = { animationIterationCount: booped ? "infinite" : 0};

  return (
    <Container key={playerNumber} className="column" $booped={booped}>
      <label htmlFor={name}>PLAYER {playerNumber}</label>
      <div className="row" >
        <ChipSlot player={playerNumber} style={chipSlotStyle}/>
        <input
          name={name}
					onClick={boopIt}
					onMouseEnter={boopIt}
          type="color"
          ref={colorInputRef}
          onChange={({ target: { value } }) => {
            root.style.setProperty(cSSVarName, value);
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
	animation: ${bounceAnimation};
}
`