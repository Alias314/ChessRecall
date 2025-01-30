const fileToInteger = (file) => file.charCodeAt(0) - 96;
const rankToInteger = (rank) => parseInt(rank, 10);

const isSameColor = (to, piece, board) => {
    const toPieceColor = board[to] === null ? null : board[to][board[to].length - 1];
    const fromPieceColor = piece[piece.length - 1];

    return toPieceColor === fromPieceColor;
}

export function isValidPawnMove(from, to, piece, board) {
    const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
    const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);

    if (piece === 'pawn_w') {
        if (coordinateFrom[1] === 2) {
            if (!(coordinateTo[1] - coordinateFrom[1] === 1 || coordinateTo[1] - coordinateFrom[1] === 2)) {
                return false;
            }
        }
        else {
            if (!(coordinateTo[1] - coordinateFrom[1] === 1)) {
                return false;
            }
        }

    }
    else if (piece === 'pawn_b') {
        if (coordinateFrom[1] === 7) {
            if (!(coordinateTo[1] - coordinateFrom[1] === -1 || coordinateTo[1] - coordinateFrom[1] === -2)) {
                return false;
            }
        }
        else {
            if (!(coordinateTo[1] - coordinateFrom[1] === -1)) {
                return false;
            }
        }
    }
    
    if (fileDiff !== 0) {
        return false;
    }
    
    if (board[to] !== null) {
        return false;
    }
    console.log(board[to]);
    console.log(board[from]);

    return !isSameColor(to, piece, board);
}

export function isValidRookMove(from, to, piece, board) {
    const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
    const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

    if (!(fileDiff === 0 || rankDiff === 0)) {
        return false;
    }

    return !isSameColor(to, piece, board);
}

export function isValidKnightMove(from, to, piece, board) {
    const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
    const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);
    
    if (!((fileDiff === 2 && rankDiff === 1) || (fileDiff === 1 && rankDiff === 2))) {
        return false;
    }

    return !isSameColor(to, piece, board);
}

export function isValidBishopMove(from, to, piece, board) {
    const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
    const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

    if (!(fileDiff === rankDiff)) {
        return false;
    }

    return !isSameColor(to, piece, board);
}

export function isValidQueenMove(from, to, piece, board) {
    const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
    const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

    if (!((fileDiff === 0 || rankDiff === 0) || (fileDiff === rankDiff))) {
        return false;
    }

    return !isSameColor(to, piece, board);
}

export function isValidKingMove(from, to, piece, board) {
    const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
    const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

    if (!((fileDiff === 0 && rankDiff === 1) || 
          (fileDiff === 1 && rankDiff === 0) ||
          (fileDiff === 1 && rankDiff === 1))) {
        return false;
    }

    return !isSameColor(to, piece, board);
}