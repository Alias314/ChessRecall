export const ranks = Array(8).fill().map((x, i) => i + 1);
export const files = Array(8).fill().map((x, i) => String.fromCharCode(i + 97));
export const piecePosition = {
    a1: "rook_w",
    b1: "knight_w",
    c1: "bishop_w",
    d1: "queen_w",
    e1: "king_w",
    f1: "bishop_w",
    g1: "knight_w",
    h1: "rook_w",
    a8: "rook_b",
    b8: "knight_b",
    c8: "bishop_b",
    d8: "queen_b",
    e8: "king_b",
    f8: "bishop_b",
    g8: "knight_b",
    h8: "rook_b"
}