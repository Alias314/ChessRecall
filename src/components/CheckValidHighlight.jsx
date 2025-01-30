import { files, ranks } from "./chessData";

const fileToInteger = (file) => file.charCodeAt(0) - 96;
const rankToInteger = (rank) => parseInt(rank, 10);

export function isValidPawnHighlight(from, piece, setValidMoves) {
    {ranks.map((rank, i) =>
        files.map((file, j) => {
            const to = file + rank;
            const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
            const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);
            const rankDiff = Math.abs(coordinateTo[1] - coordinateFrom[1]);

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
            
            setValidMoves(prevValidMoves => [ ...prevValidMoves, to ]);
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