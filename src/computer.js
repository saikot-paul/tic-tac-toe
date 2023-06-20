import { game } from "./game";
import { player } from "./player";
export class computer extends player{ 

    constructor (marker) { 
        super(marker)
    }

    minimax (depth, marker) { 

        let maximizing_player = marker === "X" ? false : true 
        let board = game.getBoard()
        

        if (depth===0) { 
            const [isWinner, winningSymbol] = game.checkWin(board)
            
            if (isWinner && maximizing_player) { 
                return 1 
            }else if (isWinner && !maximizing_player) { 
                return -1
            }else { 
                return 0
            }
        }
        
        if (maximizing_player) { 
            let max_score = -Infinity
            let best_move = null 
            
            for (const move of this.moves()) {
                 
                let symbol = marker === "X" ? "O" : "X" 
                board[move] = symbol
                let score = this.minimax(depth-1, symbol)

                if (score > max_score) { 
                    max_score = score 
                    best_move = move
                }
            }

            return best_move

        } else { 
            let min_score = Infinity
            let best_move = null 
            
            for (const move in this.moves()) {
                 
                let symbol = marker === "X" ? "O" : "X" 
                board[move] = symbol
                let score = this.minimax(depth-1, symbol)

                if (score < min_score) { 
                    min_score = score 
                    best_move = move
                }
            }

            return best_move       
        }
    }

    findOpen (board) { 
        
        let moves = []

        board.forEach((element, index) => {
            if (element === null) { 
                moves.push(index)
            }
        });

        return moves
    }

}