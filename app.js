const _ = document,
        reset = _.querySelector('.reset'),
        cols = _.querySelectorAll('.row>div'),
        statusDispaly= _.querySelector('.statusDispaly')

let cur = true
let gameState = new Array(9).fill(null)
let currentPlayer = "X"; //stores current player
let gameover = false;

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const winMessage =(currentPlayer)=> statusDispaly.textContent =`END OF GAME, Player ${currentPlayer} has won !`;
  const drawMessage=()=> statusDispaly.textContent = `END OF GAME, It's a draw`;
  const playerTurn =(currentPlayer)=> statusDispaly.textContent =`It's ${currentPlayer}'s turns`; 

statusDispaly.textContent = playerTurn()
reset.addEventListener('click', fnreset);



cols.forEach(col => {
    col.addEventListener('click',play)
});

function play(e) {
  const __ = e.target
  console.log(e.target)
  if(!__.innerHTML && !gameover){
    cur = !cur
    __.innerHTML = cur ? (playerTurn("X"),e.target.textContent ='<h1 name="O">O</h1>' ):(playerTurn("O"),  e.target.textContent='<h1 name="X">X</h1>')
    move(parseInt(__.id.split(/\D+/g)[1]), __.childNodes[0].getAttribute('name'))
  }
}

function move(ind, sign) {
  gameState[ind] = sign
  console.log(gameState)

  let winner = false;
  for (let i = 0; i < wins.length; i++) {
     let [a, b, c] = wins[i] 
      if(cmp(gameState[a], gameState[b], gameState[c])){
        console.log("a", gameState[a])
        console.log("b", gameState[b])
        console.log("c", gameState[c])
        console.log(sign, ' wins')
        isdraw = false;
        winMessage(sign)
        cols[a].classList.add('win')
        cols[b].classList.add('win')
        cols[c].classList.add('win')
        winner =true;
        gameover =true;
      }
  }
  if((!gameState.includes(null)) && !winner){
    gameover =true;
    drawMessage()
  }
}
function cmp(a, b, c) {
  if(a && b && c)
    return (a === b) && (a === c) && (b === c)
}

function fnreset() {
    for(let col of cols){
      col.classList.remove('win')
      col.innerHTML = ''
    }
    gameState = new Array(9).fill(null)
    playerTurn("X")
    cur= true
    gameover= false;
}



