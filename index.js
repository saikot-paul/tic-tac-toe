class game { 
    
    constructor (player1, player2) { 
        this.player1  = player1
        this.player2 = player2  
        this.board = Array(9).fill(null)
        this.wins = [
            [0,1,2], 
            [3,4,5], 
            [6,7,8], 
            [0,3,6], 
            [1,4,7], 
            [2,5,8], 
            [0,4,8], 
            [2,4,6]
        ]
        
        this.buttons = document.querySelectorAll(".item button")
        this.buttons.forEach( (element) => { 
            element.addEventListener('click', () => {
                this.move(element)
            })
        })
    }
    
    begin () { 
        
        console.log("in begin")
        this.startButton = document.querySelector(".start")
        this.startButton.disabled = false 
        this.startButton.addEventListener('click', () => { 
            this.start()
        })
    }
    
    start () { 
        
        this.clearBoard()
        console.log("in start")
        this.buttons = document.querySelectorAll(".item button")
        this.buttons.forEach((element) => { 
            element.disabled = false 
        })
        
        this.startButton = document.querySelector(".start")
        this.startButton.disabled = true
        
        this.currentTurn = this.player1
    }
    
    reset () { 
        
        console.log("in reset")
        
        this.begin()
        
    }
    
    clearBoard() {
        this.buttons = document.querySelectorAll(".item button")
        this.buttons.forEach((element) => {
            element.textContent = null
            element.disabled = true
        })

        this.board.fill(null)
    }

    move (element) { 
        console.log("in move")
        let sym = this.currentTurn.marker
        element.textContent = sym 
        element.disabled = true 
        let index = parseInt(element.id.split("-")[1])
        this.board[index] = sym 
        
        this.checkGame()
    }
    
    checkGame () { 
        console.log("in checkGame")
        
        const [isWin, winningSymbol] = this.checkWin()

        if (isWin) {
            const player = winningSymbol === "X" ? "PLayer 1" : "PLayer 2"
            console.log(player + " wins!") 
            this.reset()
        }else if (this.checkFull()) { 
            console.log("No winners :(")
            this.reset()
        }else { 
            this.switchTurn()
        }
    }
    
    checkWin () { 
        
        console.log("in checkWin")
        let isWin = false;
        let winningSymbol = null;
        this.wins.forEach(indices => {
            const [index1, index2, index3] = indices;
            const symbol1 = this.board[index1];
            const symbol2 = this.board[index2];
            const symbol3 = this.board[index3];
            if (symbol1 && symbol1 === symbol2 && symbol2 === symbol3) {
            isWin = true;
            winningSymbol = symbol1;
        }
        });
        return [isWin, winningSymbol];
    }

    checkFull () { 
        
        console.log("in checkFull")
        return this.board.every( (element) => { 
            element !== null
        })
    }

    switchTurn () { 
        this.currentTurn = this.currentTurn === this.player1 ? this.player2 : this.player1
    }

}

class player { 
    constructor (marker) { 
        this.marker = marker
    }
}

const player1 = new player("X")
const player2 = new player("O")
const newGame = new game(player1, player2)
newGame.begin()