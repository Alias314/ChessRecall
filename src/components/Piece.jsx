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
            if (piece.includes('pawn')) {
                isValidPawnHighlight(coordinate, piece, setValidMoves, board);
            }
            else if (piece.includes('rook')) {
                isValidRookHighlight(coordinate, setValidMoves);
            }
            else if (piece.includes('knight')) {
                isValidKnightHighlight(coordinate, setValidMoves);
            }
            else if (piece.includes('bishop')) {
                isValidBishopHighlight(coordinate, setValidMoves);
            }
            else if (piece.includes('queen')) {
                isValidQueenHighlight(coordinate, setValidMoves);
            }
            else if (piece.includes('king')) {
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