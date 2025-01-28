import { useDrag } from "react-dnd";

export default function Piece({ coordinate, piece }) {
    const [{ canDrag }, drag] = useDrag(() => ({
        type: 'Piece',
        item: { from: coordinate, piece: piece },
    }));
    
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