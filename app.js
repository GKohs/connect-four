/* global alert */
/* eslint semi: ["error", "always"] */

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const gridOfSquares = document.querySelector('.gridOfSquares');
  const result = document.querySelector('#result');
  const displayCurrentPlayer = document.querySelector('#current-player');

  let clickedPosition = null;
  let currentPlayer = 1;
  let turn = 0;

  let validTurn = false;

  const rows = 6;
  const columns = 7;

  for (var i = 0, len = squares.length; i < len; i++) {
    (function (index) {
      // ad an onclick to each square in your
      squares[i].onclick = function () {
        // if current square is not taken AND
        // (it is the first row OR it is above a taken one)
        if (!squares[index].classList.contains('taken') & (
          index >= ((rows - 1) * columns) ||
          squares[index + 7].classList.contains('taken'))
        ) {
          turn++;
          validTurn = true;
          clickedPosition = index;

          if (currentPlayer === 1) {
            squares[index].classList.add('taken');
            squares[index].classList.add('player-one');
          } else if (currentPlayer === 2) {
            squares[index].classList.add('taken');
            squares[index].classList.add('player-two');
          }
        } else {
          console.log('missed');
          // alert('cant go here');
        }
      };
    })(i);
  }

  // change the Player
  function nextPlayer () {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    displayCurrentPlayer.innerHTML = currentPlayer;
  }

  // check the board for a win/lose
  function checkBoard () {
    if (validTurn) {
      console.log(currentPlayer + ', ' + clickedPosition + ', ' + turn);
      let gameFinished = false;
      let check = [];
      let toCountFrom, toCountUntil;
      let playerString = '';

      if (currentPlayer === 1) {
        playerString = 'player-one';
      } else if (currentPlayer === 2) {
        playerString = 'player-two';
      }

      const sum = checkPoints(playerString);

      if (sum >= 4) {
        disableField();

        if (playerString === 'player-one') {
          result.innerHTML = 'Player one wins!';
        } else if (playerString === 'player-two') {
          result.innerHTML = 'Player two wins!';
        }
      }

      nextPlayer();
      // reset validTurn for next turn
      validTurn = false;
    }
  }

  // TODO: Stop playing after game is finished
  // TODO: implement restart button

  // add an eventListener to the grid that will proof, if someone has won.
  gridOfSquares.addEventListener('click', checkBoard);

  function disableField () {
    gridOfSquares.style.pointerEvents = 'none';
  }

  function checkPoints (playerString) {
    // proof if there is a row with 4 of a player in one line
    // count to left AND count to right
    let sum = 1;
    // left
    for (let i = 1; i < 4; i++) {
      if (((clickedPosition % columns) - i) >= 0 &&
        squares[clickedPosition - i].classList.contains(playerString)) {
        sum++;
      } else {
        break;
      }
    }
    // right
    for (let i = 1; i < 4; i++) {
      if (((clickedPosition % columns) + i) < columns &&
        squares[clickedPosition + i].classList.contains(playerString)) {
        sum++;
      } else {
        break;
      }
    }

    if (sum >= 4) {
      return sum;
    }

    // count to upper left AND count to lower right
    sum = 1;
    // upper left
    for (let i = 1; i < 4; i++) {
      if ((clickedPosition % columns) - i >= 0 &&
        (clickedPosition - (i * columns) >= 0) &&
        squares[clickedPosition - (i * columns) - i].classList.contains(playerString)) {
        sum++;
      } else {
        break;
      }
    }

    // lower right
    for (let i = 1; i < 4; i++) {
      if ((clickedPosition % columns) + i < columns &&
        (clickedPosition + (i * columns) <= ((columns * rows) - 1)) &&
        squares[clickedPosition + (i * columns) + i].classList.contains(playerString)) {
        sum++;
      } else {
        break;
      }
    }

    if (sum >= 4) {
      return sum;
    }

    // count to lower left AND count to upper righ
    sum = 1;
    // lower left
    for (let i = 1; i < 4; i++) {
      if ((clickedPosition % columns) - i >= 0 &&
        clickedPosition + (i * columns) <= ((columns * rows) - 1) &&
        squares[clickedPosition + (i * columns) - i].classList.contains(playerString)) {
        sum++;
      } else {
        break;
      }
    }
    // upper right
    for (let i = 1; i < 4; i++) {
      if ((clickedPosition % columns) + i < columns &&
        clickedPosition - (i * columns) >= 0 &&
        squares[clickedPosition - (i * columns) + i].classList.contains(playerString)) {
        sum++;
      } else {
        break;
      }
    }

    if (sum >= 4) {
      return sum;
    }

    // count upwards and downwards
    sum = 1;
    // upwards
    for (let i = 1; i < 4; i++) {
      if (clickedPosition - (i * columns) >= 0 &&
        squares[clickedPosition - (i * columns)].classList.contains(playerString)) {
        sum++;
      } else {
        break;
      }
    }
    // upper right
    for (let i = 1; i < 4; i++) {
      if (clickedPosition + (i * columns) < (columns * rows) &&
        squares[clickedPosition + (i * columns)].classList.contains(playerString)) {
        sum++;
      } else {
        break;
      }
    }

    return sum
  }
});
