
let xSymbol = 'X'
let oSymbol = 'O'
let displaySymbol = '';


const boxes = document.querySelectorAll('.box')
const resetButton = document.querySelector('#reset')

resetButton.addEventListener('click', (e) => {
  boxes.forEach(box => box.textContent = '')
})



const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const handleClick = (e) => {
  const box = e.target;

  if (box.innerText !== '') return;

  if (player === 1) {
    displaySymbol = xSymbol
    player = 2
  } else {
    displaySymbol = oSymbol;
    player = 1;
  }
  box.innerText = displaySymbol
  checkWinner(displaySymbol)
}

const checkWinner = (currentSymbol) => {
  // row check
  console.log('checking if there is a winner...')
  const hasWon = winningCombination.some(combination => {
    return combination.every(index => boxes[index].textContent === currentSymbol)
  })
  if (hasWon) {
    console.log(`${currentSymbol} has won`)
    alert(`${currentSymbol} has won`)
    boxes.forEach(box => box.removeEventListener('click', handleClick ))
  }
}



// console.log(table)

let player = 1
boxes.forEach(box => {
  box.addEventListener('click', e => handleClick(e))
})
