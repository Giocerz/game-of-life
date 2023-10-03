const randomState = (threshold = 0.5) => {
    const randomValue =  Math.random();
    return randomValue >= threshold;
} 

export function randomBoard() {
    let board = []
    for(let i = 0; i < 150; i++) {
        let row = [];
        for(let j = 0; j < 100; j++){
            row.push(randomState());
        }
        board.push(row);
    }
    return board;
}