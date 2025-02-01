import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { isValidPawnHighlight, isValidRookHighlight, isValidKnightHighlight, isValidBishopHighlight, isValidQueenHighlight, isValidKingHighlight } from "./CheckValidHighlight";

export default function Piece({ coordinate, piece, setValidMoves, board }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'Piece',
        item: { from: coordinate, piece },
        end: () => setValidMoves([]),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }), [coordinate, piece]);

    useEffect(() => {
        if (isDragging) {
            if (piece[0] === 'P') {
                isValidPawnHighlight(coordinate, piece, setValidMoves, board);
            }
            else if (piece[0] === 'R') {
                isValidRookHighlight(coordinate, setValidMoves, board);
            }
            else if (piece[0] === 'N') {
                isValidKnightHighlight(coordinate, setValidMoves);
            }
            else if (piece[0] === 'B') {
                isValidBishopHighlight(coordinate, setValidMoves, board);
            }
            else if (piece[0] === 'Q') {
                isValidQueenHighlight(coordinate, setValidMoves, board);
            }
            else if (piece[0] === 'K') {
                isValidKingHighlight(coordinate, setValidMoves);
            }
        }
        else {
            setValidMoves([]);
        }
    }, [isDragging]);

    return (
        <div ref={drag}>
            {piece &&
                <img 
                    src={`assets/pieces/${piece}.png`}
                    className="h-15 w-15"
                />
            }
        </div>
    );
}