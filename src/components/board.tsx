import React, { useMemo } from "react";
import styled from "styled-components";
import BoardLane from "./board-lane";

type Props = {};

const ITEMS = [
  {
    title: "Fix Datatable",
    priority:"high",
    lane: "progress",
  },
  {
    title: "redesign login page",
    priority:"low",
    lane: "todo",
  },
  {
    title: "add charts to dashboard",
    priority:"high",
    lane: "progress",
  },
  {
    title: "send invitation adter registration",
    priority:"medium",
    lane: "review",
  },
  {
    title: "setup landing page",
    priority:"medium",
    lane: "prod",
  },
];

const Board = (props: Props) => {
  const lanesItems = useMemo(() => {
    const data = new Map<string, Array<any>>();
    const lanes = new Set<string>();
    ITEMS.forEach((item) => {
      lanes.add(item.lane);
      if (!data.has(item.lane)) {
        data.set(item.lane, [item]);
      } else {
        const items = data.get(item.lane);
        if (items) {
          items?.push(item);
          data.set(item.lane, items);
        }
      }
    });
    return {
      items: data,
      lanes: Array.from(lanes),
    };
  }, []);
  return (
    <Wrapper>
      {lanesItems.lanes.map((lane) => (
        <BoardLane
          key={lane}
          title={lane}
          items={lanesItems.items.get(lane) ?? []}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
    padding:1.2rem;
    height:80vh;
    min-width:100%;
    display:flex;
    gap:10px;
`;

export default Board;
