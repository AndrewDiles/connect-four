// Thanks Angelosp https://stackoverflow.com/users/1576414/angelosp
// https://stackoverflow.com/questions/4817029/whats-an-optimal-or-efficient-way-to-detect-a-touch-screen-device-using-javas

// and to Farhad Sakhaei https://stackoverflow.com/users/1742391/farhad-sakhaei
// https://stackoverflow.com/questions/4817029/whats-an-optimal-or-efficient-way-to-detect-a-touch-screen-device-using-javas

function is_touch_device4() {
  if ("ontouchstart" in window) return true;

  if (window.DocumentTouch && document instanceof DocumentTouch) return true;

  if (window.matchMedia("(pointer: coarse)").matches) return true;

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

export default is_touch_device4;
