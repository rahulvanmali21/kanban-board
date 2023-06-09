import React from "react";
import { DragLayerMonitor, useDrag } from "react-dnd";
import styled from "styled-components";

type Item = {
  title: string;
  priority: "high" | "low" | "medium";
};

type Props = {
  item: Item;
};

const BoardItem = ({ item }: Props) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "ITEM",
      collect: (monitor: DragLayerMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );
  return (
    <Wrapper
      ref={dragRef}
      draggable="true"
    >
      <h4>{item.title}</h4>
      <p>{item.priority}</p>
    </Wrapper>
  );
};

export default BoardItem;

const Wrapper = styled.div`
  max-width: 100%;
  border: 1px solid grey;
  padding: 1rem;
  background: #fefefe;
`;
