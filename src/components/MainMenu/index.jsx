import SelectChipColors from "./SelectChipColors";
import BeginGameButton from "./BeginGameButton";

const MainMenu = ({game, setGame}) => {
  return (
    <menu>
      <SelectChipColors game={game}/>
      <BeginGameButton game={game} setGame={setGame} />
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