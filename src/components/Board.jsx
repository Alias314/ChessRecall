import { files, ranks, initialBoard } from "./chessData";
import { useEffect, useState } from "react";
import { isValidPawnMove, isValidRookMove, isValidKnightMove, isValidBishopMove, isValidQueenMove, isValidKingMove } from "./PieceMoveLogic";
import Square from "./Square";

const fileToInteger = (file) => file.charCodeAt(0) - 96;
const rankToInteger = (rank) => parseInt(rank, 10);

export default function Board() {
    const [board, setBoard] = useState(initialBoard);
    const [moveHistory, setMoveHistory] = useState([]);
    const [displayCoordinate, setDisplayCoordinate] = useState(false);
    const [draggingPiece, setDraggingPiece] = useState([]);
    const [validMoves, setValidMoves] = useState([]);
    const [displayMoveHistroy, setDisplayMoveHistory] = useState(false);
    const [isWhiteTurn, setIsWhiteTurn] = useState(true);
    const [lastMove, setLastMove] = useState(null);

    const movePiece = (from, to, piece) => {
        const currentTurnColor = isWhiteTurn ? 'w' : 'b';
        const nextLastMove = [from, to, piece];
        const coordinateFrom = [fileToInteger(from[0]), rankToInteger(from[1])];
        const coordinateTo = [fileToInteger(to[0]), rankToInteger(to[1])];
        let isEnPassant = false;
        
        if (piece[1] !== currentTurnColor) {
            // return;
        }
        
        if (piece[0] === 'P' && isValidPawnMove(from, to, piece, board, lastMove)) {
            const fileDiff = Math.abs(coordinateTo[0] - coordinateFrom[0]);

            if (fileDiff === 1 && board[to] === null) {
                isEnPassant = true;
            }
        }
        else {
            return;
        }

        if (piece[0] === 'R' && !isValidRookMove(from, to, piece, board)) {
            return;
        }
        else if (piece[0] === 'N' && !isValidKnightMove(from, to, piece, board)) {
            return;
        }
        else if (piece[0] === 'B' && !isValidBishopMove(from, to, piece, board)) {
            return;
        }
        else if (piece[0] === 'Q' && !isValidQueenMove(from, to, piece, board)) {
            return;
        }
        else if (piece[0] === 'K' && !isValidKingMove(from, to, piece, board)) {
            return;
        }
        
        setLastMove(nextLastMove);
        console.log(lastMove);

        setIsWhiteTurn(!isWhiteTurn);
        setMoveHistory(prevMoveHistory => [ ...prevMoveHistory, `${piece[0] !== 'P' ? piece[0] : ''}${to}`]);
        setBoard(prevBoard => {
            const nextBoard = { ...prevBoard };

            if (isEnPassant) {
                const capturedPawnSquare = piece === 'Pw' ? to[0] + (rankToInteger(to[1]) - 1) : to[0] + (rankToInteger(to[1]) + 1);
                nextBoard[capturedPawnSquare] = null;
            }

            nextBoard[to] = nextBoard[from];
            nextBoard[from] = null;
            return nextBoard;
        });
    }

    const resetBoard = () => {
        setBoard(initialBoard);
    }

    const showMoveHistory = () => {
        setDisplayMoveHistory(!displayMoveHistroy);
    }

    return (
        <div>
            <div className="flex gap-10">
                <div className="grid grid-cols-8">
                    {ranks.map((rank, i) =>
                        files.map((file, j) => {
                            const coordinate = file + rank;
                            const isDarkSquare = (i + j) % 2 === 1;
                            const piece = board[coordinate] || null;
                            const isHighlighted = validMoves.includes(coordinate);

                            return (
                                <Square 
                                    key={coordinate}
                                    coordinate={coordinate}
                                    isDarkSquare={isDarkSquare}
                                    piece={piece}
                                    movePiece={movePiece}
                                    setValidMoves={setValidMoves}
                                    isHighlighted={isHighlighted}
                                    board={board}
                                    lastMove={lastMove}
                                />
                            )
                        })
                    )}
                </div>
                { displayMoveHistroy &&
                    <div className="flex flex-col">
                        <h1 className="text-2xl">Move History</h1>
                        <div className="grid grid-cols-2 gap-2">
                            {moveHistory.map((move, index) => {
                                const moveNumber = Math.ceil((index + 1) / 2)
                                
                                return (
                                    <div
                                        key={index}
                                    >
                                        {index % 2 === 0 && `${moveNumber}. `}
                                        {move}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
            <button
                onClick={resetBoard}
                className="mt-2 p-2 text-white font-semibold bg-red-500 rounded-xl cursor-pointer"
            >
                Reset Board
            </button>
            <button
                onClick={showMoveHistory}
                className="ml-2 mt-2 p-2 text-white font-semibold bg-blue-500 rounded-xl cursor-pointer"
            >
                {displayMoveHistroy ? 'Hide Move History' : 'Show Move History'}
            </button>
        </div>
    );
}