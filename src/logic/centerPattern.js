export function centerPattern(patternArr) {
    let board = [];
    const rowLenPatternArr = patternArr.length;
    const colLenPatternArr = patternArr.reduce((maxValue, row) => {
        if(row.length > maxValue) {
            maxValue = row.length;
        }
        return maxValue;
    }, 0);
    const startRow = Math.floor((150 - rowLenPatternArr) / 2);
    const startCol = Math.floor((100 - colLenPatternArr) / 2);

    for(let i = 0; i < 150; i++ ) {
        let rows = [];
        for(let j = 0; j < 100; j++) {
            if((i >= startRow && i < rowLenPatternArr + startRow) && (j >= startCol && j < colLenPatternArr + startCol)) {
                const rowElement = patternArr[i - startRow][j - startCol];
                if(rowElement === undefined) {
                    rows.push(false);
                } else {
                    rows.push(patternArr[i - startRow][j - startCol]);
                }
            } else {
                rows.push(false);
            }
        }
        board.push(rows);
    }

    return board;
}