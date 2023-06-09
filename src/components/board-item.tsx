import React, { useRef } from "react";
import { DragLayerMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

type Item = {
  title: string;
  priority: "high" | "low" | "medium";
};

type Props = {
  item: Item;
  index:number,
};

const BoardItem = ({ item,index }: Props) => {
  const ref = useRef<HTMLDivElement | any>()
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "ITEM",
      collect: (monitor: DragLayerMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  const [{ isOver }, dropRef] = useDrop({
    accept: "column",
    hover: (draggedItem: any, monitor: DropTargetMonitor) => {
      if(!ref.current){
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index
      if(dragIndex === hoverIndex){
        return
      }
      const hoverRect = ref.current?.getBoundingClientRect()
      if(!hoverRect) return
      const hoverRectMidY = (hoverRect.bottom - hoverRect.top) /2 ;
      const mousePosition = monitor.getClientOffset()
      if(!mousePosition) return
      const hoverClientY = mousePosition.y  - hoverRect.y;

      if(dragIndex < hoverIndex && hoverClientY < hoverRectMidY) return;

      if(dragIndex > hoverIndex && hoverClientY < hoverRectMidY) return;

      // moveItem(dragIndex,hoverIndex)
      draggedItem.index = hoverIndex
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      didDrop: monitor.didDrop(),
      canDrop: monitor.canDrop(),
    }),
  });

  dragRef(dragRef(ref))

  return (
    <Wrapper
      ref={ref}
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
