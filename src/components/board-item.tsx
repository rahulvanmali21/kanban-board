import React, { useRef } from "react";
import {
  DragLayerMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import styled from "styled-components";

type Item = {
  title: string;
  status: string;
  content: string;
};

type Props = {
  item: Item;
  index: number;
  color: string;
  onMove:(dragIndex:number,hoverIndex:number)=>void
};

const BoardItem = ({ item, index, color,onMove }: Props) => {
  const { title, status, content } = item;
  const ref = useRef<HTMLDivElement|any>();


  const [{ isOver }, dropRef] = useDrop({
    accept: "ITEM",
    hover: (draggedItem: any, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {

        return;
      }
      const hoverRect = ref.current?.getBoundingClientRect();
      if (!hoverRect) return;
      const hoverRectMidY = (hoverRect.bottom - hoverRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) return;
      const hoverClientY = mousePosition.y - hoverRect.y;

      if (dragIndex < hoverIndex && hoverClientY < hoverRectMidY) return;

      if (dragIndex > hoverIndex && hoverClientY < hoverRectMidY) return;

      onMove(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      didDrop: monitor.didDrop(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "ITEM",
      item:{...item,index,type:"ITEM"},
      collect: (monitor: DragLayerMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );


  dragRef(dropRef(ref));

  return (
    <Wrapper ref={ref} isDragging={isDragging} color={color}>
      <h4>{title}</h4>
      <p>{content}</p>
    </Wrapper>
  );
};

export default BoardItem;

type WProps = {
  isDragging: boolean;
  color: string;
};

const Wrapper = styled.div<WProps>`
  max-width: 100%;
  border: 1px solid grey;
  padding: 1rem;
  background: ${(props) => props.color ?? "#fefefe"};
  opacity: ${(props) => (props.isDragging ? "0" : "1")};
`;
