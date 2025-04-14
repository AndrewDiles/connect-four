import styled from "styled-components";
import SingleChipSelector from "./SingleChipSelector";

const playerNumbers = [1, 2];

const root = document.querySelector(":root");

const SelectChipColors = () => {
  return (
    <Container>
      {playerNumbers.map((playerNumber) => (
        <SingleChipSelector key={playerNumber} playerNumber={playerNumber} />
      ))}
    </Container>
  );
};

export default SelectChipColors;

const Container = styled.section`
  display: grid;
  margin: 0 auto 1em;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
	max-width: 600px;
`;
