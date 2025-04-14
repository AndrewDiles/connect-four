import SelectChipColors from "./SelectChipColors";
import BeginGameButton from "./BeginGameButton";

const MainMenu = ({setGame}) => {
  return (
    <menu>
      <SelectChipColors />
      <BeginGameButton setGame={setGame} />
      <a
        href="https://www.unco.edu/hewit/pdf/giant-map/connect-4-instructions.pdf"
        target="_blank"
      >
        RULES
      </a>
    </menu>
  );
};

export default MainMenu