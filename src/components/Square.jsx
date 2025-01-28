import { useDrop } from "react-dnd";
import Piece from "./Piece";

export default function Square({ coordinate, isDarkSquare, piece, movePiece }) {
    const [{ canDrop }, drop] = useDrop(() => ({
        accept: 'Piece',
        drop: (item) => movePiece(item.from, coordinate),
    }));
    
    return (
        <div
            ref={drop}
            className={`h-18 w-18 flex items-center justify-center text-lg font-bold relative
                ${isDarkSquare ? "bg-[#739552] text-[#EBECD0]" : "bg-[#EBECD0] text-[#739552]"}`}
        >
            <div className="absolute top-0 left-1">
                {coordinate[0] === "a" && coordinate[1]}
            </div>
            <div className="absolute bottom-0 right-1">
                {coordinate[1] === '1' && coordinate[0]}
            </div>
            
            {
                piece &&
                <Piece 
                    coordinate={coordinate} 
                    piece={piece} 
                />
            }
        </div>
    );
}