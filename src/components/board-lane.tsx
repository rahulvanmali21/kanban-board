import React, { useRef } from "react";
import styled from "styled-components";
import BoardItem from "./board-item";
import { DropTargetMonitor, useDrop } from "react-dnd";

type Props = {
  title: string;
  items: any[];
};

const BoardLane = ({ title, items }: Props) => {
  const [{isOver},drop] =useDrop({
    accept:"ITEM",
    canDrop:(item:any)=>{
      const itemIndex = items.findIndex(s=>s.status===item.status);
      const statusIndex = items.findIndex(s=>s.status ===1);
      return [itemIndex + 1,itemIndex-1,itemIndex].includes(statusIndex);
    },
    drop:(item,monitor:DropTargetMonitor)=>{
      console.log(item)
    },
    collect:(monitor:DropTargetMonitor)=>({
      isOver:monitor.isOver()
    })
  })


  return (
    <Wrapper>
      <LaneHeader>
        <Title>{title}</Title>
      </LaneHeader>
      <BoardItemList ref={drop}>
        {items.length > 0 ? (
          items.map((item, index) => <BoardItem index={index} item={item} key={index} />)
        ) : (
          <p>no items</p>
        )}
      </BoardItemList>
    </Wrapper>
  );
};

export default BoardLane;

const Wrapper = styled.div`
  width: 300px;
  background: #efefef;
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
  height: inherit;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
