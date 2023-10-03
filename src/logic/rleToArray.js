export function rleToArray(rle) {
    const lineas = rle.split('$');
    const patron = [];

    for (const linea of lineas) {
        const caracteres = linea.trim().split('');
        const fila = [];
        let cantidad = '';

        for (const caracter of caracteres) {
            if (/[0-9]/.test(caracter)) {
                cantidad += caracter;
            } else if (caracter === 'o' || caracter === 'b') {
                if (cantidad === '') {
                    // Si no hay cantidad, agregar 1
                    fila.push(caracter === 'o');
                } else {
                    const veces = parseInt(cantidad);
                    for (let i = 0; i < veces; i++) {
                        fila.push(caracter === 'o');
                    }
                    cantidad = '';
                }
            }
        }

        patron.push(fila);
    }

    return patron;
}

export function rleReader(rleString) {
    const lines = rleString.split('\n');
    let x = 0;
    let y = 0;
    let rleCode = '';
    for(const line of lines) {
        if(line === '' || line.startsWith('#')) {
            continue;
        }
        if(line.startsWith('x')) {
            let rules = line.trim().split(',');
            x = rules[0];
            y = rules[1];
            console.log({x, y})
            continue;
        }
        rleCode = rleCode + line;
    }
    return rleCode;
}