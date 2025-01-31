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
    const rankDiff = coordinateTo[1] - coordinateFrom[1];
    const destinationPiece = board[to];
    const isCapturing = destinationPiece !== null;

    if (piece === 'pawn_w') {
        if (fileDiff === 0 && rankDiff === 1 && destinationPiece === null) {
            return true;
        }

        if (coordinateFrom[1] === 2 && rankDiff === 2 && fileDiff === 0 && 
            destinationPiece === null && board[from[0] + (coordinateFrom[1] + 1)] === null) {
            return true;
        }

        if (fileDiff === 1 && rankDiff === 1 && isCapturing) {
            return !isSameColor(to, piece, board);
        }
    }
    
    else if (piece === 'pawn_b') {
        if (fileDiff === 0 && rankDiff === -1 && destinationPiece === null) {
            return true;
        }

        if (coordinateFrom[1] === 7 && rankDiff === -2 && fileDiff === 0 && 
            destinationPiece === null && board[from[0] + (coordinateFrom[1] - 1)] === null) {
            return true;
        }

        if (fileDiff === 1 && rankDiff === -1 && isCapturing) {
            return !isSameColor(to, piece, board);
        }
    }

    return false;
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