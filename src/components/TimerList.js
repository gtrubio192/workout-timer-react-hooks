import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap/';
import { ListItem } from './ListItem';

export const TimerList = ({list, handleDeleteTask}) => {
  // const deleteTask = (index) => {
  //   console.log(index)
  // }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>Tasks</Card.Header>
      <ListGroup variant="flush">
        {
          list.map((item, i)=> (
            <ListGroup.Item key={i}>
              {item.name} - {item.time}
              <Button variant="danger" className="delete-button" onClick={()=>handleDeleteTask(item.name)}>X</Button>
            </ListGroup.Item>
          ))
        }
        {/* {
          list.map(item => (
            <ListItem itemDetails={item} />
          ))
        } */}
      </ListGroup>
    </Card>
  );
}