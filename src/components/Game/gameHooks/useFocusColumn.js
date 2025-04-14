import { useEffect } from "react";
import is_touch_device4 from "../../../helpers/isTouchDevice";

const isTouch = is_touch_device4();

// for accessibility, focuses a random column when the user can make a move

const focusRandomElementFromList = (list) => {
  list[Math.floor(Math.random() * list.length)].focus();
};

const useFocusColumn = ({ result, isBotTurn, game }) => {
  useEffect(() => {
    if (isTouch) return;
    const handleKeyboardPress = ({ code }) => {
      const selectableColumns = document.querySelectorAll(".selectable-column");
      if (selectableColumns.length > 0) {
        let indexOfColumnInFocus = null;
        selectableColumns.forEach((column, index) => {
          if (document?.activeElement?.id === column.id) {
            indexOfColumnInFocus = index;
          }
        });
        if (code === "KeyA" || code === "ArrowLeft") {
          if (typeof indexOfColumnInFocus !== "number") {
            focusRandomElementFromList(selectableColumns);
          } else {
            if (indexOfColumnInFocus === 0) {
              selectableColumns[selectableColumns.length - 1].focus();
            } else {
              selectableColumns[indexOfColumnInFocus - 1].focus();
            }
          }
        } else if (code === "KeyD" || code === "ArrowRight") {
          if (typeof indexOfColumnInFocus !== "number") {
            focusRandomElementFromList(selectableColumns);
          } else {
            if (indexOfColumnInFocus === selectableColumns.length - 1) {
              selectableColumns[0].focus();
            } else {
              selectableColumns[indexOfColumnInFocus + 1].focus();
            }
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyboardPress);
    return () => {
      window.addEventListener("keydown", handleKeyboardPress);
    };
  }, []);

  useEffect(() => {
    if (!result && !isBotTurn && !game.revisingHistory) {
      const selectableColumns = document.querySelectorAll(".selectable-column");
      if (selectableColumns.length > 0) {
        if (document.activeElement) {
          let oneInFocusAlready = false;
          selectableColumns.forEach((column) => {
            if (document.activeElement.id === column.id) {
              oneInFocusAlready = true;
            }
          });
          if (oneInFocusAlready) return;
        }
        focusRandomElementFromList(selectableColumns);
      }
    }
  });
};

export default useFocusColumn;
