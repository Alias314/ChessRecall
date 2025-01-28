import { piecePosition } from "./chessData";

export default function Square({ file, rank, isDarkSquare }) {
    const coordinate = file + rank;
    
    return (
        <div
            draggable={true}
            className={`h-18 w-18 flex items-center justify-center text-lg font-bold relative
                ${isDarkSquare ? "bg-[#739552] text-[#EBECD0]" : "bg-[#EBECD0] text-[#739552]"}`}
        >
            <div className="absolute bottom-0 right-1">
                {rank === 1 && coordinate[0]}
            </div>
            <div className="absolute top-0 left-1">
                {file === "a" && coordinate[1]}        
            </div>

            {piecePosition[coordinate] &&
                <img 
                    src={`assets/pieces/${piecePosition[coordinate]}.png`}
                    className="h-15 w-15"
                />
            }
            {rank === 2 &&
                <img 
                    src="assets/pieces/pawn_w.png"
                    className="h-15 w-15"
                />
            }
            {rank === 7 &&
                <img 
                    src="assets/pieces/pawn_b.png"
                    className="h-15 w-15"
                />
            }
        </div>
    );
}