import React, { useRef } from "react";
import styled from "styled-components";
import BoardItem from "./board-item";

type Props = {
  title: string;
  items: any[];
  onItemHover:(e:any)=>void
};

const BoardLane = ({ title, items ,onItemHover }: Props) => {
  const dragIndex = useRef<number>()
  const onDragStart = (e: React.DragEvent, index: number) => {
    dragIndex.current = index;
  };

  const onDragEnd = (e: React.DragEvent) => {
    console.log("end");
  };

  const onDragEnter = (e: React.DragEvent, index?: number) => {
    console.log("enter", index,title);
  };



  return (
    <Wrapper 
    onDragEnter={(e)=>onDragEnter(e)}
    >
      <LaneHeader>
        <Title>{title}</Title>
      </LaneHeader>
      <BoardItemList>
        {items.length > 0 ? (
          items.map((item, index) => (
            <BoardItem
              item={item}
              key={index}
              onDragStart={(e) => onDragStart(e, index)}
              onDragEnter={(e)=>onDragEnter(e,index)}
              onDragEnd={onDragEnd}
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
