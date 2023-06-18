class game { 
    constructor(player1, player2) { 
        this.board = Array(9)
        this.wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        this.player1 = player1
        this.player2 = player2 
    }

    begin () { 
        console.log("In begin")
        let startButton = document.querySelector(".start") 
        startButton.disabled = false
        startButton.onclick = () => { 
            this.start()
            console.log("STARTED GAME")
        }
    
    }

    start () {  

        console.log("In start")
        let buttons = document.querySelectorAll(".item button") 

        buttons.forEach(element => {
            element.disabled = false
        });
        
        buttons.forEach(element => { 
            element.addEventListener('click', () => this.move(element))
        })

        let startButton = document.querySelector(".start")
        startButton.disabled = true
        this.currentTurn = this.player1
    }

    move (element) { 
        
        console.log("In move")
        let sym = this.currentTurn.symbol
        element.textContent = sym
        element.disabled = true
        switch (element.id) { 
            case "btn-0": 
                this.board[0] = sym
                break;
            case "btn-1": 
                this.board[1] = sym
                break;
            case "btn-2": 
                this.board[2] = sym
                break;
            case "btn-3": 
                this.board[3] = sym
                break;
            case "btn-4": 
                this.board[4] = sym
                break;
            case "btn-5": 
                this.board[5] = sym
                break;
            case "btn-6": 
                this.board[6] = sym
                break;
            case "btn-7": 
                this.board[7] = sym
                break;
            case "btn-8": 
                this.board[8] = sym
                break;
        }
        this.checkWin()
        this.switchTurn()
    }

    switchTurn () { 
        
        console.log("In switchturn")
        
        switch (this.currentTurn) { 

            case (this.player1): 
                this.currentTurn = this.player2
                break
            
            case (this.player2): 
                this.currentTurn = this.player1 
                break
        }
        
        console.log(`${this.currentTurn.name} turn now`)
    }

    winCondition(indices) {

        console.log("In winCondition")
        let [index1, index2, index3] = indices;
        let symbol1 = this.board[index1];
        let symbol2 = this.board[index2];
        let symbol3 = this.board[index3];

        return symbol1 && symbol1 === symbol2 && symbol2 === symbol3;
    }
      

    checkWin () { 
        console.log("In checkWin")
        this.wins.forEach( indices => { 
            if (this.winCondition(indices)) { 
                console.log(`${this.currentTurn.name} wins`)
                this.reset()
            }
        })
    }

    reset () { 

        console.log("In reset")
        this.board.forEach( (element,index) => { 
            this.board[index] = null
        })
        let buttons = document.querySelectorAll(".item button")
        console.log(buttons)
        buttons.forEach( element => { 
            element.textContent = null 
        })
        this.start()
    }


}

class Player { 
    constructor(symbol, name) { 
        this.symbol = symbol
        this.name = name
    }
}

player1 = new Player("X", "Player1")
player2 = new Player("O", "Player2")
newGame = new game(player1, player2)
newGame.begin()
