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
        
        this.startButton = document.querySelector(".start")
        this.startButton.disabled = false 
        this.startButton.addEventListener('click', () => { 
            this.start()
        })

    }
    
    start () { 
        
        this.clearBoard()
        this.buttons = document.querySelectorAll(".item button")
        this.buttons.forEach((element) => { 
            element.disabled = false 
        })

        const title = document.getElementById("title") 
        title.textContent = "TIC-TAC-TOE"
        title.classList.remove('pulsing-red')
        
        this.startButton = document.querySelector(".start")
        this.startButton.disabled = true
        
        this.currentTurn = this.player1
    }
    
    reset () { 

        const score = document.getElementsByClassName("score")[0]

        score.textContent = "Wins-Loss-Ties: " +  this.scorekeeper[0] + "-" + this.scorekeeper[1] + "-" + this.scorekeeper[2]
        
        this.buttons.forEach((element) => {
            element.disabled = true
        })

        const title = document.getElementById("title")
        title.textContent = "GAME OVER"
        title.classList.add('pulsing-red')            
        
        setTimeout(() => {
            title.textContent = "Click Start Game to play again"
        }, 2500);


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
        let btn = document.getElementById("btn-" + index )
        btn.textContent = cplayer
        btn.disabled = true 
        this.board[index] = cplayer
        
        this.checkGame() 
        
    }
    
    checkGame () { 
        
        const isWinHuman = this.checkWin(this.player1.marker)
        const isWinComp = this.checkWin(this.player2.marker)
        const isFull = this.checkFull()

        if (isWinHuman) { 
            this.scorekeeper[0]++
            this.reset()
        }else if (isWinComp) { 
            this.scorekeeper[2]++
            this.reset()
        }else if (isFull) { 
            this.scorekeeper[1]++
            this.reset()
        }else { 
            this.switchTurn()
        }

    }
    
    checkWin (symbol) { 

        let isWin = false;
        this.wins.forEach(indices => {
            const [index1, index2, index3] = indices;
            const symbol1 = this.board[index1];
            const symbol2 = this.board[index2];
            const symbol3 = this.board[index3];
            if (symbol1 && symbol1 === symbol2 && symbol2 === symbol3 && symbol === symbol1) {
                isWin = true;
            }
        });
        return isWin;
    }

    checkFull () { 
    
        return this.board.every( (element) => { 
           return element !== null
        })
    }

    switchTurn () { 
        this.currentTurn = this.currentTurn === this.player1 ? this.player2 : this.player1
    }

}


export {game}