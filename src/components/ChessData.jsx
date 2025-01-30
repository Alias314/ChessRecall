export const ranks = Array(8).fill().map((x, i) => 8 - i);
export const files = Array(8).fill().map((x, i) => String.fromCharCode(i + 97));
export const initialBoard = {};
const piecePosition = {
    a1: 'rook_w',
    b1: 'knight_w',
    c1: 'bishop_w',
    d1: 'queen_w',
    e1: 'king_w',
    f1: 'bishop_w',
    g1: 'knight_w',
    h1: 'rook_w',
    a2: 'pawn_w',
    b2: 'pawn_w',
    c2: 'pawn_w',
    d2: 'pawn_w',
    e2: 'pawn_w',
    f2: 'pawn_w',
    g2: 'pawn_w',
    h2: 'pawn_w',
    
    a8: 'rook_b',
    b8: 'knight_b',
    c8: 'bishop_b',
    d8: 'queen_b',
    e8: 'king_b',
    f8: 'bishop_b',
    g8: 'knight_b',
    h8: 'rook_b',
    a7: 'pawn_b',
    b7: 'pawn_b',
    c7: 'pawn_b',
    d7: 'pawn_b',
    e7: 'pawn_b',
    f7: 'pawn_b',
    g7: 'pawn_b',
    h7: 'pawn_b',
}

ranks.forEach(rank => {
    files.forEach(file => {
        initialBoard[file + rank] = null;
    })
})

Object.entries(piecePosition).forEach(([coordinate, piece]) => {
    initialBoard[coordinate] = piece;
})