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

            this.printBoard()
            
            if (this.currentTurn === this.human) { 
                let choice = prompt(`Player 1 choose a position ${this.findOpen()}`)
                this.board[choice] = this.human 
                this.currentTurn = this.comp 
            }else { 
                let choice = this.bestMove()
                this.board[choice] = this.comp
                this.currentTurn = this.human
            }

            this.printBoard()
        }
    }

    gameState() { 

        
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
        
        let copy = this.board.map((element) => element)
        return this.minimax(10, copy, true).index
    }

    minimax (depth, board, max_player) { 
        
        const { isWinHuman, isWinComp, isFull } = this._gameCondition(board)
        
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
            
            for (const index of this._findOpen(board)) { 
                board[index] = this.comp
                let score = this.minimax(depth-1, board, false)
                
                if (best_score < score) { 
                    best_score = score 
                    best_move = index
                }
            }
            return {score: best_score, index: best_move}
        }else { 
            let best_move = null 
            let best_score = Infinity

            for (const index of this._findOpen(board)) { 
                board[index] = this.human
                let score = this.minimax(depth-1, board, true)
                
                if (best_score > score) { 
                    best_score = score 
                    best_move = index
                }
            }
            return {score: best_score, index: best_move}
        }  
    }
    
    _gameCondition(board) { 
        const isWinHuman = this._checkWin(this.human, board)
        const isWinComp = this._checkWin(this.comp, board)
        const isFull = this._checkFull(board)
        return { isWinHuman, isWinComp, isFull }
    }
    
    _checkWin(symbol, board) { 
        let isWin = false 
        this.wins.forEach( (element) => { 
            let [index1, index2, index3] = element
            const sym1 = board[index1]
            const sym2 = board[index2]
            const sym3 = board[index3]

            if (sym1 && sym1 === sym2 && sym2 === sym3 && sym1 === symbol) { 
                isWin = true
            }
        })

        return isWin
    }
    
    _checkFull(board) { 
        return board.every( (element) => { 
            return element !== null 
        })
    }

    _findOpen(board) { 
        let moves = []

        board.forEach( (element, index) => { 
            if (element === null) { 
                moves.push(index)
            }
        })
        
        return moves
    }


}


const game = new computer() 
game.playGame()