class computer { 

    constructor () { 
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

        this.human = "X"
        this.comp = "O"
        this.currentTurn = this.human
    }

    printBoard() { 
        let str = `${this.board[0]} | ${this.board[1]} | ${this.board[2]}\n`
        str += "-".repeat(15)    
        str += "\n"
        str += `${this.board[3]} | ${this.board[4]} | ${this.board[5]}\n`
        str += "-".repeat(15)
        str += "\n"
        str += `${this.board[6]} | ${this.board[7]} | ${this.board[8]}`

        console.log(str)
    }

    playGame() { 

        while (!this.gameState()) { 

            
            if (this.currentTurn === this.human) { 
                let choice = prompt(`Choose a position ${this.findOpen()}`)
                this.board[choice] = this.human 
                this.currentTurn = this.comp 
            }else { 
                let choice = prompt(`Choose a position ${this.findOpen()}`)
                this.board[choice] = this.comp
                this.currentTurn = this.human
            }

            this.gameState()
        }
    }

    gameState() { 

        
        this.printBoard()
        const { isWinHuman, isWinComp, isFull } = this.gameCondition()

        if (isWinHuman) { 
            console.log("Human Player wins")
        }else if (isWinComp) { 
            console.log("Computer Player wins")
        }else if (isFull){ 
            console.log("Tie, no winners :(")
        }        
        
        return isWinHuman || isWinComp || isFull
    }

    gameCondition() {
        const isWinHuman = this.checkWin(this.human)
        const isWinComp = this.checkWin(this.comp)
        const isFull = this.checkFull()
        return { isWinHuman, isWinComp, isFull }
    }

    checkWin(symbol) { 

        let isWin = false 
        this.wins.forEach( (element) => { 
            let [index1, index2, index3] = element
            const sym1 = this.board[index1]
            const sym2 = this.board[index2]
            const sym3 = this.board[index3]

            if (sym1 && sym1 === sym2 && sym2 === sym3 && sym1 === symbol) { 
                isWin = true
            }
        })

        return isWin
    }

    checkFull () { 
        return this.board.every( (element) => { 
            return element !== null 
        })
    }

    findOpen() { 
        let moves = [] 

        this.board.forEach( (element, index) => { 
            if (element === null) { 
                moves.push(index)
            }
        })

        return moves
    }

    bestMove() {
        return this.minimax(10, true).index
    }

    minimax (depth, max_player) { 

        const { isWinHuman, isWinComp, isFull } = this.gameCondition()

        if (isWinHuman) { 
            return -1
        }else if (isWinComp) { 
            return 1
        }else if (isFull) { 
            return 0
        }

        if (depth === 0) { 
            return 0
        }

        if (max_player) { 
            let best_move = null 
            let best_score = -Infinity

            for (const index of this.findOpen()) { 
                this.board[index] = this.comp
                let score = this.minimax(depth-1, false)

                if (best_score < score) { 
                    best_score = score 
                    best_move = index
                }
            }
            return {score: best_score, index: best_move}
        }else { 
            let best_move = null 
            let best_score = Infinity

            for (const index of this.findOpen()) { 
                this.board[index] = this.human
                let score = this.minimax(depth-1, true)

                if (best_score > score) { 
                    best_score = score 
                    best_move = index
                }
            }
            return {score: best_score, index: best_move}
        }  
    }

}

const game = new computer() 
game.playGame()