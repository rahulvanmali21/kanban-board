import React from 'react'
import styled from 'styled-components';


type Item = {
  title:string,
  priority: "high" | "low" | "medium"
}

type Props = {
  item:Item;
  onDragStart:(e:React.DragEvent)=>void,
  onDragEnd:(e:React.DragEvent)=>void,
  onDragEnter:(e:React.DragEvent)=>void,
  
}

const BoardItem = ({item,onDragStart,onDragEnd,onDragEnter}: Props) => {
  return (
    <Wrapper draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragEnter}>
      <h4>{item.title}</h4>
      <p>{item.priority}</p>
    </Wrapper>
  )
}

export default BoardItem

const Wrapper = styled.div`
max-width:100%;
border:1px solid grey;
padding:1rem;
background:#fefefe
`