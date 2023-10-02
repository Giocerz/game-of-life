const randomState = (threshold = 0.5) => {
    const randomValue =  Math.random();
    return randomValue >= threshold;
} 

export function randomBoard() {
    let board = []
    for(let i = 0; i < 100; i++) {
        let row = [];
        for(let j = 0; j < 50; j++){
            row.push(randomState());
        }
        board.push(row);
    }
    return board;
}