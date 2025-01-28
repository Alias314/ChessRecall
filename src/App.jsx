import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import Board from "./components/board";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-screen flex items-center justify-center">
        <Board />
      </div>
    </DndProvider>
  );
}