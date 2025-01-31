import { useDrop } from "react-dnd";
import Piece from "./Piece";

export default function Square({ coordinate, isDarkSquare, piece, movePiece, setValidMoves, isHighlighted, board }) {
    const [{ isDropping }, drop] = useDrop(() => ({
        accept: 'Piece',
        drop: (item) => movePiece(item.from, coordinate, item.piece),
    }), [piece]);
    
    return (
        <div
            ref={drop}
            className={`h-18 w-18 flex items-center justify-center text-lg font-bold relative z-0
                ${isDarkSquare ? "bg-[#739552] text-[#EBECD0]" : "bg-[#EBECD0] text-[#739552]"}`}
        >
            <div className="absolute top-0 left-1">
                {coordinate[0] === "a" && coordinate[1]}
            </div>
            <div className="absolute bottom-0 right-1">
                {coordinate[1] === '1' && coordinate[0]}
            </div>
            <div className="absolute text-6xl font-light z-10">
                {isHighlighted && 'O'}
            </div>
            <div className="z-20">
                {
                    piece &&
                    <Piece 
                        coordinate={coordinate} 
                        piece={piece} 
                        setValidMoves={setValidMoves}
                        board={board}
                    />
                }
            </div>
        </div>
    );
}