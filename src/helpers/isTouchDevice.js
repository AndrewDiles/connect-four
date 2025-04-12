// Thanks Angelosp https://stackoverflow.com/users/1576414/angelosp
// https://stackoverflow.com/questions/4817029/whats-an-optimal-or-efficient-way-to-detect-a-touch-screen-device-using-javas

function is_touch_device4() {
	if ("ontouchstart" in window)
			return true;

	if (window.DocumentTouch && document instanceof DocumentTouch)
			return true;


	return window.matchMedia( "(pointer: coarse)" ).matches;
}

export default is_touch_device4