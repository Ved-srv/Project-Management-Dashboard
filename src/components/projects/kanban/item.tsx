import {
  DragOverlay,
  UseDraggableArguments,
  useDraggable,
} from "@dnd-kit/core";
import React from "react";

interface Props {
  id: string;
  data: UseDraggableArguments["data"];
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
  // attributes - is the object that contains everything that we should use to spread on the item to make it draggable.
  // listeners - object creating event handlers to apply to this element
  // setNodeRef - function to pass to the ref prop of the element you want to make droppable.
  // active - object containing information about the draggable item that is currently being dragged.

  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab",
        }}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div
              style={{
                borderRadius: "8px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                cursor: "grabbing",
              }}
            >
              {children}
            </div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  );
};

export default KanbanItem;
