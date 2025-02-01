export const ranks = Array(8).fill().map((x, i) => 8 - i);
export const files = Array(8).fill().map((x, i) => String.fromCharCode(i + 97));
export const initialBoard = {};
const piecePosition = {
    a1: 'Rw',
    b1: 'Nw',
    c1: 'Bw',
    d1: 'Qw',
    e1: 'Kw',
    f1: 'Bw',
    g1: 'Nw',
    h1: 'Rw',
    a2: 'Pw',
    b2: 'Pw',
    c2: 'Pw',
    d2: 'Pw',
    e2: 'Pw',
    f2: 'Pw',
    g2: 'Pw',
    h2: 'Pw',
    
    a8: 'Rb',
    b8: 'Nb',
    c8: 'Bb',
    d8: 'Qb',
    e8: 'Kb',
    f8: 'Bb',
    g8: 'Nb',
    h8: 'Rb',
    a7: 'Pb',
    b7: 'Pb',
    c7: 'Pb',
    d7: 'Pb',
    e7: 'Pb',
    f7: 'Pb',
    g7: 'Pb',
    h7: 'Pb',
}
// const piecePosition = {
//     d4: 'Qw',
//     // b1: 'Nw',
//     // c1: 'Bw',
//     // d1: 'Qw',
//     // e1: 'Kw',
//     // f1: 'Bw',
//     // g1: 'Nw',
//     // h1: 'Rw',
//     b4: 'Pw',
//     b5: 'Pw',
//     b3: 'Pw',
//     // f4: 'Pw',
//     f5: 'Pw',
//     f3: 'Pw',
//     d6: 'Pw',
//     d2: 'Pw',
//     c2: 'Pw',
//     e2: 'Pw',
//     c6: 'Pw',
//     e6: 'Pw',
//     b6: 'Pw',
//     f6: 'Pw',
//     b2: 'Pw',
//     f2: 'Pw',

    
//     // a8: 'Rb',
//     // b8: 'Nb',
//     // c8: 'Bb',
//     // d8: 'Qb',
//     // e8: 'Kb',
//     // f8: 'Bb',
//     // g8: 'Nb',
//     // h8: 'Rb',
//     // a7: 'Pb',
//     // b7: 'Pb',
//     // c7: 'Pb',
//     // d7: 'Pb',
//     // e7: 'Pb',
//     // f7: 'Pb',
//     // g7: 'Pb',
//     // h7: 'Pb',
// }

ranks.forEach(rank => {
    files.forEach(file => {
        initialBoard[file + rank] = null;
    })
})

Object.entries(piecePosition).forEach(([coordinate, piece]) => {
    initialBoard[coordinate] = piece;
})