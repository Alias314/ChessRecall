const fileToInteger = (file) => file.charCodeAt(0) - 96;
const rankToInteger = (rank) => parseInt(rank, 10);

const isSameColor = (to, piece, board) => {
    const toPieceColor = board[to] === null ? null : board[to][board[to].length - 1];
    const fromPieceColor = piece[piece.length - 1];

    return toPieceColor === fromPieceColor;
}

const checkRookPath = (coordinateFrom, coordinateTo, board) => {
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);
    const fileDirection = (coordinateTo[1] - coordinateFrom[1] > 0) ? 1 : 0;
    const rankDirection = (coordinateTo[0] - coordinateFrom[0] > 0) ? 1 : 0;

    if (fileDiff === 0) {
        if (fileDirection) {
            for (let i = 1; i <= rankDiff; i++) {
                if (board[`${String.fromCharCode(coordinateFrom[0] + 96)}${coordinateFrom[1] + i}`] !== null) {
                    return false;
                }
            }
        }
        else {
            for (let i = 1; i <= rankDiff; i++) {
                if (board[`${String.fromCharCode(coordinateFrom[0] + 96)}${coordinateFrom[1] - i}`] !== null) {
                    return false;
                }
            }
        }
    }
    else if (rankDiff === 0) {
        if (rankDirection) {
            for (let i = 1; i < fileDiff; i++) {
                if (board[`${String.fromCharCode(coordinateFrom[0] + 96 + i)}${coordinateFrom[1]}`] !== null) {
                    return false;
                }
            }
        }
        else {
            for (let i = 1; i < fileDiff; i++) {
                if (board[`${String.fromCharCode(coordinateFrom[0] + 96 - i)}${coordinateFrom[1]}`] !== null) {
                    return false;
                }
            }
        }
    }

    return true;
}

const checkBishopPath = (coordinateFrom, coordinateTo, board) => {
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);
    const fileDirection = (coordinateTo[0] - coordinateFrom[0] > 0) ? 1 : 0;
    const rankDirection = (coordinateTo[1] - coordinateFrom[1] > 0) ? 1 : 0;

    if (fileDirection && rankDirection) {
        for (let i = 1; i <= fileDiff; i++) {
            if (board[`${String.fromCharCode(coordinateFrom[0] + 96 + i)}${coordinateFrom[1] + i}`] !== null) {
                console.log(board[`${String.fromCharCode(coordinateFrom[0] + 96 + i)}${coordinateFrom[1] + i}`]);
                return false;
            }
        }
    }
    else if (fileDirection && !rankDirection) {
        for (let i = 1; i <= fileDiff; i++) {
            if (board[`${String.fromCharCode(coordinateFrom[0] + 96 + i)}${coordinateFrom[1] - i}`] !== null) {
                return false;
            }
        }
    }
    else if (!fileDirection && rankDirection) {
        for (let i = 1; i <= fileDiff; i++) {
            if (board[`${String.fromCharCode(coordinateFrom[0] + 96 - i)}${coordinateFrom[1] + i}`] !== null) {
                return false;
            }
        }
    }
    else if (!fileDirection && !rankDirection) {
        for (let i = 1; i <= fileDiff; i++) {
            if (board[`${String.fromCharCode(coordinateFrom[0] + 96 - i)}${coordinateFrom[1] - i}`] !== null) {
                return false;
            }
        }
    }

    return true;
}

export function isValidPawnMove(from, to, piece, board, lastMove, setIsEnPassantBlack, setIsEnPassantWhite) {
    const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
    const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = coordinateTo[1] - coordinateFrom[1];
    const destinationPiece = board[to];
    const isCapturing = destinationPiece !== null;

    if (piece === 'Pw') {
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
    else if (piece === 'Pb') {
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

    if (lastMove !== null) {
        const lastMoveFrom = [fileToInteger(lastMove[0][0]), rankToInteger(lastMove[0][1])];
        const lastMoveTo = [fileToInteger(lastMove[1][0]), rankToInteger(lastMove[1][1])];
        const lastMoveFileDiff = lastMoveTo[0] - lastMoveFrom[0];
        const lastMoveRankDiff = lastMoveTo[1] - lastMoveFrom[1];
        const currentAndLastMoveFileDiff = Math.abs(lastMoveTo[0] - coordinateFrom[0]);

        if (lastMoveRankDiff === 2) {
            if (currentAndLastMoveFileDiff === 1) {
                if (coordinateTo[0] === lastMoveFrom[0] && coordinateTo[1] === 3) {
                    return true;
                }
            }
        }
        else if (lastMoveRankDiff === -2) {
            if (currentAndLastMoveFileDiff === 1) {
                if (coordinateTo[0] === lastMoveFrom[0] && coordinateTo[1] === 6) {
                    return true;
                }
            }
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

    const toPiece = board[to];
    const isValidCapture = toPiece && !isSameColor(to, piece, board);

    if (isValidCapture) {
        board[to] = null;
    } 

    const isPathClear = checkRookPath(coordinateFrom, coordinateTo, board);

    if (isValidCapture) {
        board[to] = toPiece;
    }

    if (!isPathClear) {
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

    const toPiece = board[to];
    const isValidCapture = toPiece && !isSameColor(to, piece, board);

    if (isValidCapture) {
        board[to] = null;
    }

    const isPathClear = checkBishopPath(coordinateFrom, coordinateTo, board);

    if (isValidCapture) {
        board[to] = toPiece;
    }

    if (!isPathClear) {
        return false;
    }

    return !isSameColor(to, piece, board);
}

export function isValidQueenMove(from, to, piece, board) {
    if (isSameColor(to, piece, board)) {
        console.log('test');
        return false
    }

    const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
    const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
    const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
    const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

    if (!((fileDiff === 0 || rankDiff === 0) || (fileDiff === rankDiff))) {
        return false;
    }
    
    const toPiece = board[to];
    const isValidCapture = toPiece && !isSameColor(to, piece, board);

    if (isValidCapture) {
        board[to] = null;
    }

    let isPathClear = null;

    if ((fileDiff === 0 || rankDiff === 0)) {
        isPathClear = checkRookPath(coordinateFrom, coordinateTo, board);
    }
    else if (fileDiff === rankDiff) {
        isPathClear = checkBishopPath(coordinateFrom, coordinateTo, board);
    }
    
    if (isValidCapture) {
        board[to] = toPiece;
    }

    if (!isPathClear) {
        return false;
    }

    return true;
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