import { files, ranks } from "./chessData";
import Square from "./square";

export default function Board() {
    const board = Array(64).fill().map((_, i) => {
        const file = i % 8;
        const rank = 7 - Math.floor(i / 8);
        const isDarkSquare = (file + rank) % 2 === 0;

        return (
            <Square 
                key={i}
                file={files[file]}
                rank={ranks[rank]}
                isDarkSquare={isDarkSquare}
            />
        );
    });

    return (
        <div className="grid grid-cols-8">
            {board}
        </div>
    );
}