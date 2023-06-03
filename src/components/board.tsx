import React, { useMemo, useState } from "react";
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

const DATA = {
	"progress": [
		{
			"title": "Fix Datatable",
			"priority": "high",
			"lane": "progress"
		},
		{
			"title": "add charts to dashboard",
			"priority": "high",
			"lane": "progress"
		}
	],
	"todo": [
		{
			"title": "redesign login page",
			"priority": "low",
			"lane": "todo"
		}
	],
	"review": [
		{
			"title": "send invitation adter registration",
			"priority": "medium",
			"lane": "review"
		}
	],
	"prod": [
		{
			"title": "setup landing page",
			"priority": "medium",
			"lane": "prod"
		}
	]
}

const Board = (props: Props) => {
     const [data, setData] = useState<any>(DATA)



  const lanes = useMemo(() => {
    return Object.keys(data)
  }, [data]);
  return (
    <Wrapper>
      {lanes.map((lane:string) => (
        <BoardLane
          onItemHover={()=>{}}
          key={lane}
          title={lane}
          items={data[lane] ?? []}
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
