class game { 
  constructor(player1, player2) { 
    this.board = Array(9);
    this.wins = [
      [0,1,2], 
      [3,4,5], 
      [6,7,8], 
      [0,3,6], 
      [1,4,7], 
      [2,5,8], 
      [0,4,8], 
      [2,4,6]
    ];
    this.player1 = player1;
    this.player2 = player2;
    this.game = 0;
  }

  begin() { 
    console.log("In begin");
    console.log(`Game: ${this.game}`);
    let startButton = document.querySelector(".start"); 
    startButton.disabled = false;
    startButton.addEventListener('click', () => { 
      this.start();
      console.log("STARTED GAME");
    });
  }

  start() {  
    this.game += 1;
    console.log("In start");

    this.buttons = document.querySelectorAll(".item button");
    this.buttons.forEach(element => {
      element.disabled = false;
      element.addEventListener('click', () => this.move(element));
      element.textContent = null;
    });

    let startButton = document.querySelector(".start");
    startButton.disabled = true;
    this.currentTurn = this.player1;

    this.board.fill(null);
  }

  move(element) { 
    console.log("In move");
    let sym = this.currentTurn.symbol;
    element.textContent = sym;
    element.disabled = true;
    let index = parseInt(element.id.split("-")[1]);
    this.board[index] = sym;
    this.checkWin();
    if (!this.checkWin()) {
      this.switchTurn();
    }
    console.log(this.board);
  }

  switchTurn() { 
    console.log("In switchturn");
    this.currentTurn = this.currentTurn === this.player1 ? this.player2 : this.player1;
    console.log(`${this.currentTurn.name} turn now`);
  }

  winCondition(indices) {
    console.log("In winCondition");
    let [index1, index2, index3] = indices;
    let symbol1 = this.board[index1];
    let symbol2 = this.board[index2];
    let symbol3 = this.board[index3];

    return symbol1 && symbol1 === symbol2 && symbol2 === symbol3;
  }

  checkWin() { 
    console.log("In checkWin");
    this.wins.forEach(indices => { 
      if (this.winCondition(indices)) { 
        console.log(`${this.currentTurn.name} wins`);
        this.reset();
      }
    });
  }

  reset() { 
    console.log("In reset");
    this.buttons.forEach((element) => {
      element.disabled = true;
    });
    this.board.fill(null);
    this.currentTurn = this.player1;
    this.begin();
  }
}

class Player { 
  constructor(symbol, name) { 
    this.symbol = symbol;
    this.name = name;
  }
}

player1 = new Player("X", "Player1");
player2 = new Player("O", "Player2");
newGame = new game(player1, player2);
newGame.begin();
