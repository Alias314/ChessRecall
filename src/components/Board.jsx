import { files, ranks, initialBoard } from "./chessData";
import { useEffect, useState } from "react";
import { isValidPawnMove, isValidRookMove, isValidKnightMove, isValidBishopMove, isValidQueenMove, isValidKingMove } from "./PieceMoveLogic";
import Square from "./square";

export default function Board() {
    const [board, setBoard] = useState(initialBoard);
    const [moveHistory, setMoveHistory] = useState([]);
    const [displayCoordinate, setDisplayCoordinate] = useState(false);
    const [draggingPiece, setDraggingPiece] = useState([]);
    const [validMoves, setValidMoves] = useState([]);

    const movePiece = (from, to, piece) => {
        if (piece.includes('pawn')) {
            if (!isValidPawnMove(from, to, piece, board)) {
                return;
            }
        }
        else if (piece.includes('rook')) {
            if (!isValidRookMove(from, to, piece, board)) {
                return;
            }
        }
        else if (piece.includes('knight')) {
            if (!isValidKnightMove(from, to, piece, board)) {
                return;
            }
        }
        else if (piece.includes('bishop')) {
            if (!isValidBishopMove(from, to, piece, board)) {
                return;
            }
        }
        else if (piece.includes('queen')) {
            if (!isValidQueenMove(from, to, piece, board)) {
                return;
            }
        }
        else if (piece.includes('king')) {
            if (!isValidKingMove(from, to, piece, board)) {
                return;
            }
        }

        setBoard(prevBoard => {
            const nextBoard = { ...prevBoard };
            nextBoard[to] = nextBoard[from];
            nextBoard[from] = null;
            return nextBoard;
        });
    }

    const resetBoard = () => {
        setBoard(initialBoard);
    }

    const logBoardState = () => {
        console.log(board);
    }

    return (
        <div>
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
                            />
                        )
                    })
                )}
            </div>
            <button
                onClick={resetBoard}
                className="mt-2 p-2 text-white font-semibold bg-red-500 rounded-xl cursor-pointer"
            >
                Reset Board
            </button>
            <button
                onClick={logBoardState}
                className="ml-2 mt-2 p-2 text-white font-semibold bg-blue-500 rounded-xl cursor-pointer"
            >
                Log Board State
            </button>
        </div>
    );
}