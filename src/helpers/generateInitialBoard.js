// the board state is a two dimension array
// the elements of which can either be:
// - 0: indicating no chip
// - 1: indicating a chip from player 1
// - 2: indicating a chip from player 2

// Below is an example
// return (
// 	[
// 		[0,0,0,1,1,2],
// 		[0,0,0,0,2,1],
// 		[0,0,0,1,1,1],
// 		[0,0,0,1,2,2],
// 		[0,0,2,2,1,2],
// 		[0,0,0,0,2,1],
// 		[0,0,0,0,0,0],
// 	]
// )

const generateInitialBoard = () => {
  const result = [];
  for (let column = 0; column < 7; column++) {
    result.push([]);
    for (let row = 0; row < 6; row++) {
      result[column].push(0);
    }
  }
  return result;
};

export default generateInitialBoard;
