import { useState, useEffect } from "react";

const useBoardScale = () => {
	const [scale, setScale] = useState(1);

	useEffect(()=>{
		const baseBoardWidth = board.offsetWidth;
		const baseBoardHeight = board.offsetHeight;
		const handleSizeChange = () => {
			const windowHeight = window.innerHeight;
			const windowWidth = window.innerWidth;
			let heightModifier = 0;
			const header = document.querySelector("header")
			if ( header && header.checkVisibility({ checkDisplayNone: true })) {
				const possibleFourInTitle = document.querySelector("span");
				if (possibleFourInTitle) {
					heightModifier = possibleFourInTitle.offsetHeight;
				}
			}
			const indicator = document.getElementById("indicator");
			if (indicator) {
				heightModifier += 2 * indicator.offsetHeight;
			}
			const maxXScale = windowWidth / baseBoardWidth;
			const maxYScale = (windowHeight - heightModifier) / baseBoardHeight;
			setScale(0.9*Math.min(maxXScale, maxYScale));
		}
		handleSizeChange()
		window.addEventListener("resize" , handleSizeChange);
		return () => {
			window.removeEventListener("resize" , handleSizeChange);
		}
	},[])

	return scale
}

export default useBoardScale