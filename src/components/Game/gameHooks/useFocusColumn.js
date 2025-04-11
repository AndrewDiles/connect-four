import { useEffect } from "react";

// for accessibility, focus a column when the user can make a move

const useFocusColumn = ({result, isBotTurn, game}) => {
	useEffect(() => {
    if (!result && !isBotTurn && !game.revisingHistory) {
      const firstSelectableColumn =
        document.querySelector(".selectable-column");
      firstSelectableColumn &&
        firstSelectableColumn.focus &&
        firstSelectableColumn.focus();
    }
  });
}

export default useFocusColumn