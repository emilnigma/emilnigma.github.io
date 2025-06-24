// import { observer } from 'mobx-react';
// import { Grid } from '@mui/material';
// import { boardPositions } from '../../Assets/BoardPositions';
// import Spot from './Spot';
// import { useStore } from '../../Core/Store';
// import Ingredient from './Ingredient';

// export const GRID_HEIGHT = 80;

// function Board() {
//   const { player } = useStore();
//   const { getChipOnBoard, getHighestChipOnBoard } = player;
//   const highestChips = getHighestChipOnBoard();
//   const disableUntil = highestChips.length > 0 ? highestChips[0].position : -1;

//   const boardCmps = boardPositions.map((positionOnBoard) => {
//     const disabled = positionOnBoard <= disableUntil;
//     if (disabled) {
//       const chipOnBoard = getChipOnBoard(positionOnBoard);
//       // chip in spot
//       if (chipOnBoard !== undefined) {
//         const { kind } = chipOnBoard.chip;
//         return (
//           <Grid item xs={3} key={`spot-${positionOnBoard}`} sx={{ p: 0 }}>
//             <Ingredient {...{ kind }} />
//           </Grid>
//         );
//       }
//     }

//     // free spot
//     const isHighlight = positionOnBoard === disableUntil + 1;
//     return (
//       <Grid item xs={3} key={`spot-${positionOnBoard}`} sx={{ p: 0 }}>
//         <Spot {...{
//           score: 0,
//           currency: {
//             gold: 0,
//             emerald: 0,
//             ruby: 0,
//             sapphire: 0,
//             topaz: 0,
//           },
//           disabled,
//           isHighlight,
//         }}
//         />
//       </Grid>
//     );
//   });
//   return (
//     <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>{boardCmps}</Grid>
//   );
// };

// export default observer(Board);
