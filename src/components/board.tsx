import React, { useMemo, useState } from "react";
import styled from "styled-components";
import BoardLane from "./board-lane";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { DATA, STATUSES } from "../data";
type Props = {};

const Board = (props: Props) => {
  const [data, setData] = useState<any>(DATA);


  const onDrop = (item:any,status:string)=>{
    const mapping = STATUSES.find(si=>si.status===status);
    setData((preState:any)=>{
        const newItems = preState
          .filter((i:any)=>i.id !==item.id)
          .concat({...item,status,icon:mapping?.icon});
      return newItems
    })
  }

  const onMoveItem = (dragIndex:number,hoverIndex:number)=>{
    const item = data[dragIndex];
    setData((prevState:any)=>{
      const newItems = prevState.filter((_:any,idx:number)=>idx !== dragIndex)
      newItems.splice(hoverIndex,0,item);
      return [...newItems]
    })

  }

  const dataMap = useMemo(() => {
    const map = new Map<string, any[]>();
    data.forEach((d: any,index:number) => {
      if (!map.has(d.status)) {
        map.set(d.status, []);
      }
      const items = map.get(d.status);
      if (items) {
        items?.push({...d,index});
        map.set(d.status, items);
      }
    });
    return map;
  }, [data]);
  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        {STATUSES.map((status) => (
          <BoardLane
            onDrop={onDrop}
            onMove={onMoveItem}
            key={status.status}
            data={status}
            items={dataMap.get(status.status) ?? []}
          />
        ))}
      </Wrapper>
    </DndProvider>
  );
};

const Wrapper = styled.div`
  padding: 1.2rem;
  height: 80vh;
  min-width: 100%;
  display: flex;
  gap: 10px;
`;

export default Board;
