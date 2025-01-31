import { files, ranks } from "./chessData";

const fileToInteger = (file) => file.charCodeAt(0) - 96;
const rankToInteger = (rank) => parseInt(rank, 10);

const isSameColor = (to, piece, board) => {
    const toPieceColor = board[to] === null ? null : board[to][board[to].length - 1];
    const fromPieceColor = piece[piece.length - 1];

    return toPieceColor === fromPieceColor;
}

export function isValidPawnHighlight(from, piece, setValidMoves, board) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = coordinateTo[1] - coordinateFrom[1];
            const destinationPiece = board[to];
            const isCapturing = destinationPiece !== null;

            if (piece === 'pawn_w') {
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
            else if (piece === 'pawn_b') {
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
        })
    )}
}

export function isValidRookHighlight(from, setValidMoves) {
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

export function isValidBishopHighlight(from, setValidMoves) {
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

            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
        })
    )}
}

export function isValidQueenHighlight(from, setValidMoves) {
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

            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
        })
    )}
}

export function isValidKingHighlight(from, setValidMoves) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

            if (!((fileDiff === 0 && rankDiff === 1) || 
                  (fileDiff === 1 && rankDiff === 0) ||
                  (fileDiff === 1 && rankDiff === 1))) {
                return false;
            }

            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
        })
    )}
}