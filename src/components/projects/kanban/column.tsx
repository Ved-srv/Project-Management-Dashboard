import { Text } from "@/components/text";
import { PlusOutlined } from "@ant-design/icons";
import { UseDroppableArguments, useDroppable } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";
import React from "react";

type Props = {
  id: string;
  title: string;
  description?: React.ReactNode;
  count: number;
  data?: UseDroppableArguments["data"];
  onAddClick?: (args: { id: string }) => void;
};

const KanbanColumn = ({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick,
}: React.PropsWithChildren<Props>) => {
  // isOver - boolean telling whether a draggable element is currently hovering over the target element.
  // setNodeRef - function to pass to the ref prop of the element you want to make droppable.
  // active - object containing information about the draggable item that is currently being dragged.

  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const onAddClickHandler = () => {
    onAddClick?.({ id });
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}
    >
      <div style={{ padding: "12px" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              size="xs"
              strong
              style={{
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color="cyan" />}
            {/* Convert the count from a number to a boolean and if it exists then render the badge component */}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "auto",
          border: "2px dashed transparent",
          borderColor: isOver ? "#000040" : "transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
