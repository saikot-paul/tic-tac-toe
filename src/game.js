import { computer } from "./computer.js"

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

        this.scorekeeper = Array(3).fill(0)

        this.comp = new computer()
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
        
        this.buttons.forEach((element) => {
            element.disabled = true
        })
        this.begin()
        
    }
    
    clearBoard() {
        this.buttons = document.querySelectorAll(".item button")
        this.buttons.forEach((element) => {
            element.textContent = null
        })

        this.board.fill(null)
    }

    move (element) { 
        console.log("in move")

        //Click means human goes first 

        const human = this.player1.marker 
        const cplayer = this.player2.marker 

        //Human Goes First 
        let index = parseInt(element.id.split("-")[1])
        element.textContent = human
        element.disabled = true 
        this.board[index] = human
        //Check Condition of the game
        this.checkGame()

        //Computer turn 
        index = this.comp.bestMove(this.board)
        console.log("Best move is: " + index)
        let btn = document.getElementById("btn-" + index )
        btn.textContent = cplayer
        btn.disabled = true 
        this.board[index] = cplayer
        
        this.checkGame() 
        
    }
    
    checkGame () { 
        console.log("in checkGame")
        
        const [isWinner, winningSymbol] = this.checkWin()

        if (isWinner) {
            const player = winningSymbol === "X" ? "Player 1" : "Player 2"
            winningSymbol === "X" ? this.scorekeeper[0]++ : this.scorekeeper[1]++
            console.log(player + " wins!") 
            console.log(`Player 1: ${this.scorekeeper[0]}`)
            console.log(`Player 2: ${this.scorekeeper[1]}`)
            this.reset()
        }else if (this.checkFull()) { 
            console.log("No winners :(")
            this.scorekeeper[2]++
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
           return element !== null
        })
    }

    switchTurn () { 
        this.currentTurn = this.currentTurn === this.player1 ? this.player2 : this.player1
    }

    static getBoard () { 
        return Array.from(this.board)
    }
}


export {game}