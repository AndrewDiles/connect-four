import { useEffect } from "react";
import calculateNextMove from "../../../helpers/calculateNextMove";

// performs a bot move in 1-3s

const useBotMove = ({game, result, isBotTurn, activeBoard, handleClickColumn}) => {
		useEffect(() => {
			let timer;
			if (!result && isBotTurn && activeBoard) {
				const nextBotMove = calculateNextMove(activeBoard, game.activePlayer);
				if (typeof nextBotMove === "number")
					timer = setTimeout(() => {
						handleClickColumn(nextBotMove);
					}, 1000 + Math.random() * 2000);
			}
			return () => {
				timer && clearTimeout(timer);
			};
		}, [game]);
}

export default useBotMove