import React, { useRef } from "react";
import styled from "styled-components";
import BoardItem from "./board-item";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { STATUSES  } from "../data";

type Props = {
  data: any;
  items: any[];
  onDrop:(item:any,status:string)=>void
  onMove:(dragIndex:number,hoverIndex:number)=>void
};

const BoardLane = ({ data, items,onMove,onDrop }: Props) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "ITEM",
    canDrop: (item: any) => {
      const itemIndex = STATUSES.findIndex(si=>si.status === item.status);
      const statusIndex = STATUSES.findIndex(si=>si.status === data.status)
      return [itemIndex + 1 , itemIndex -1 ,itemIndex].includes(statusIndex);
    },
    drop: (item, monitor: DropTargetMonitor) => {
      onDrop(item,data.status);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Wrapper isOver={isOver}>
      <LaneHeader>
        <Title>{data.status}</Title>
      </LaneHeader>
      <BoardItemList ref={dropRef}>
        {items.length > 0 ? (
          items.map((item) => (
            <BoardItem
              onMove={onMove}
              color={data.color}
              index={item.index}
              item={item}
              key={item.index}
            />
          ))
        ) : (
          <p>no items</p>
        )}
      </BoardItemList>
    </Wrapper>
  );
};

export default BoardLane;

type WrapperProps = {
  isOver: boolean;
};
const Wrapper = styled.div<WrapperProps>`
  width: 300px;
  background: ${(props) => (props.isOver ? "#dfdfdf" : "#ffffff")};
  padding: 10px 20px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

const LaneHeader = styled.div`
  width: 100%;
  padding: 0.35rem 0.2rem;
`;

const BoardItemList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
