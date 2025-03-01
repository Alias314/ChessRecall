import { files, ranks } from "./chessData";

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
            for (let i = 1; i <= rankDiff - 1; i++) {
                if (board[`${String.fromCharCode(coordinateFrom[0] + 96)}${coordinateFrom[1] + i}`] !== null) {
                    return false;
                }
            }
        }
        else {
            for (let i = 1; i <= rankDiff - 1; i++) {
                if (board[`${String.fromCharCode(coordinateFrom[0] + 96)}${coordinateFrom[1] - i}`] !== null) {
                    return false;
                }
            }
        }
    }
    else if (rankDiff === 0) {
        // console.log('rankDiff');
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
        for (let i = 1; i <= fileDiff - 1; i++) {
            if (board[`${String.fromCharCode(coordinateFrom[0] + 96 + i)}${coordinateFrom[1] + i}`] !== null) {
                console.log(board[`${String.fromCharCode(coordinateFrom[0] + 96 + i)}${coordinateFrom[1] + i}`]);
                return false;
            }
        }
    }
    else if (fileDirection && !rankDirection) {
        for (let i = 1; i <= fileDiff - 1; i++) {
            if (board[`${String.fromCharCode(coordinateFrom[0] + 96 + i)}${coordinateFrom[1] - i}`] !== null) {
                return false;
            }
        }
    }
    else if (!fileDirection && rankDirection) {
        for (let i = 1; i <= fileDiff - 1; i++) {
            if (board[`${String.fromCharCode(coordinateFrom[0] + 96 - i)}${coordinateFrom[1] + i}`] !== null) {
                return false;
            }
        }
    }
    else if (!fileDirection && !rankDirection) {
        for (let i = 1; i <= fileDiff - 1; i++) {
            if (board[`${String.fromCharCode(coordinateFrom[0] + 96 - i)}${coordinateFrom[1] - i}`] !== null) {
                return false;
            }
        }
    }

    return true;
}

export function isValidPawnHighlight(from, piece, setValidMoves, board, lastMove) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = coordinateTo[1] - coordinateFrom[1];
            const destinationPiece = board[to];
            const isCapturing = destinationPiece !== null;

            if (piece === 'Pw') {
                if (fileDiff === 0 && rankDiff === 1 && destinationPiece === null) {
                    setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);            
                    return true;
                }

                if (coordinateFrom[1] === 2 && rankDiff === 2 && fileDiff === 0 && 
                    destinationPiece === null && board[from[0] + (coordinateFrom[1] + 1)] === null) {
                    setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
                    return true;
                }

                if (fileDiff === 1 && rankDiff === 1 && isCapturing) {
                    if (!isSameColor(to, piece, board)) {
                        setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
                    }
                }
            }
            else if (piece === 'Pb') {
                if (fileDiff === 0 && rankDiff === -1 && destinationPiece === null) {
                    setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
                    return true;
                }

                if (coordinateFrom[1] === 7 && rankDiff === -2 && fileDiff === 0 && 
                    destinationPiece === null && board[from[0] + (coordinateFrom[1] - 1)] === null) {
                    setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
                    return true;
                }

                if (fileDiff === 1 && rankDiff === -1 && isCapturing) {
                    if (!isSameColor(to, piece, board)) {
                        setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
                    }
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
                            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
                        }
                    }
                }
                else if (lastMoveRankDiff === -2) {
                    if (currentAndLastMoveFileDiff === 1) {
                        if (coordinateTo[0] === lastMoveFrom[0] && coordinateTo[1] === 6) {
                            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]); 
                        }
                    }
                }
            }
        })
    )}
}

export function isValidRookHighlight(from, setValidMoves, board) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

            if (!(fileDiff === 0 || rankDiff === 0)) {
                return;
            }

            if (!checkRookPath(coordinateFrom, coordinateTo, board)) {
                return;
            }

            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
        })
    )}
}

export function isValidKnightHighlight(from, setValidMoves) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

            if (!((fileDiff === 2 && rankDiff === 1) || (fileDiff === 1 && rankDiff === 2))) {
                return false;
            }

            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
        })
    )}
}

export function isValidBishopHighlight(from, setValidMoves, board) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

            if (!(fileDiff === rankDiff)) {
                return false;
            }

            if (!checkBishopPath(coordinateFrom, coordinateTo, board)) {
                return false;
            }

            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
        })
    )}
}

export function isValidQueenHighlight(from, setValidMoves, board) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

            if (!((fileDiff === 0 || rankDiff === 0) || (fileDiff === rankDiff))) {
                return false;
            }

            if ((fileDiff === 0 || rankDiff === 0)) {
                if (!checkRookPath(coordinateFrom, coordinateTo, board)) {
                    return false;
                }
            }
            else if (fileDiff === rankDiff) {
                if (!checkBishopPath(coordinateFrom, coordinateTo, board)) {
                    return false;
                }
            }

            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
        })
    )}
}

export function isValidKingHighlight(from, setValidMoves, board, hasWhiteKingMoved, hasBlackKingMoved, hasWhiteKingRookMoved, hasWhiteQueenRookMoved, hasBlackKingRookMoved, hasBlackQueenRookMoved, piece) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

            if (((from === 'e1' && to === 'g1' && !hasWhiteKingRookMoved) ||
                (from === 'e1' && to === 'c1' && board['b1'] === null && !hasWhiteQueenRookMoved)) &&
                (!hasWhiteKingMoved)) {
                if (checkRookPath(coordinateFrom, coordinateTo, board)) {
                    if (!isSameColor(to, piece, board)) {
                        setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
                        return false;
                    }
                }
            }
            else if (((from === 'e8' && to === 'g8' && !hasBlackKingRookMoved) ||
                    (from === 'e8' && to === 'c8' && board['b8'] === null && !hasBlackQueenRookMoved)) &&
                    (!hasBlackKingMoved)) {
                if (checkRookPath(coordinateFrom, coordinateTo, board)) {
                    if (!isSameColor(to, piece, board)) {
                        setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
                        return false;
                    }
                }
            }

            if (!((fileDiff === 0 && rankDiff === 1) || 
                  (fileDiff === 1 && rankDiff === 0) ||
                  (fileDiff === 1 && rankDiff === 1))) {
                return false;
            }

            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
        })
    )}
}