import { files, ranks, initialBoard } from "./chessData";
import { useEffect, useState } from "react";
import Square from "./square";

export default function Board() {
    const [board, setBoard] = useState(initialBoard);

    const movePiece = (from, to) => {
        console.log(from, to);
        setBoard((prevBoard) => {
            const nextBoard = { ...prevBoard };
            nextBoard[to] = nextBoard[from];
            delete nextBoard[from];
            return nextBoard;
        });
    }

    const resetBoard = () => {
        setBoard(initialBoard);
    }

    return (
        <div>
            <div className="grid grid-cols-8">
                {ranks.map((rank, i) =>
                    files.map((file, j) => {
                        const coordinate = file + rank;
                        const isDarkSquare = (i + j) % 2 === 1;
                        const piece = board[coordinate] || null;

                        return (
                            <Square 
                                key={coordinate}
                                coordinate={coordinate}
                                isDarkSquare={isDarkSquare}
                                piece={piece}
                                movePiece={movePiece}
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
        </div>
    );
}