import React, { useRef } from "react";
import styled from "styled-components";
import BoardItem from "./board-item";
import { DropTargetMonitor, useDrop } from "react-dnd";

type Props = {
  title: string;
  items: any[];
};

const BoardLane = ({ title, items }: Props) => {
 


  return (
    <Wrapper>
      <LaneHeader>
        <Title>{title}</Title>
      </LaneHeader>
      <BoardItemList>
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
