export class computer { 

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
    }
    
    bestMove(board) {
        
        let copy = [...board]
        let alpha = -Infinity
        let beta = Infinity
        return this.minimax(0, copy, alpha, beta, true).index
    }

    minimax (depth, board, alpha, beta, max_player) { 
        
        const { isWinHuman, isWinComp, isFull } = this._gameCondition(board)
        
        if (isWinHuman) { 
            return {score: -1, index: null} 
        }else if (isWinComp) { 
            return {score: 1, index: null} 
        }else if (isFull) { 
            return {score: 0, index: null} 
        }

        if (max_player) { 
            let best_move = null 
            let best_score = -Infinity
            
            for (const index of this._findOpen(board)) { 
                const boardCopy = [...board]
                boardCopy[index] = this.comp
                let score = this.minimax(depth+1, boardCopy, alpha, beta, false).score
                
                if (best_score < score) { 
                    best_score = score 
                    best_move = index
                }

                alpha = Math.max(alpha, best_score)

                if (beta <= alpha) { 
                    break
                }
            }
            return {score: best_score, index: best_move}
        }else { 
            let best_move = null 
            let best_score = Infinity

            for (const index of this._findOpen(board)) { 
                const boardCopy = [...board]
                boardCopy[index] = this.human
                let score = this.minimax(depth+1, boardCopy, alpha, beta, true).score
                
                if (best_score > score) { 
                    best_score = score 
                    best_move = index
                }

                beta = Math.min(beta, best_score)

                if (beta <= alpha) { 
                    break
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


