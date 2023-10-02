export const compareBoard = (board) => {
    let newBoard = [];
    let population = 0;
    for(let i = 0; i < board.length; i++) {
        let row = [];
        for(let j = 0; j < board[i].length; j++) {
            let neighbCount = 0;
            if(board[i-1]) {
                if(board[i-1][j-1]) {
                    neighbCount++;
                }
                if(board[i-1][j]) {
                    neighbCount++;
                }
                if(board[i-1][j+1]) {
                    neighbCount++;
                }
            }
            
            if(board[i][j-1]) {
                neighbCount++;
            }
            if(board[i][j+1]) {
                neighbCount++;
            }
            
            if(board[i+1]) {
                if(board[i+1][j-1]) {
                    neighbCount++;
                }
                if(board[i+1][j]) {
                    neighbCount++;
                }
                if(board[i+1][j+1]) {
                    neighbCount++;
                }
            }
            if(board[i][j]) {
                row.push(neighbCount === 2 || neighbCount === 3);
            } else {
                row.push(neighbCount === 3);
            }
        }
        newBoard.push(row);
    }

    return newBoard;
}

export const countPopulation = (board) => {
    let population = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j]) {
                population++;
            }
        }
    }

    return population;
}