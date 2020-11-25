import React, { useState }from 'react';
import { Container, Button, Col, Row, FormControl, InputGroup } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerList } from './components/TimerList';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState(0);

  const addTask = () => {
    let task = { name: taskName, time: taskTime };
    setList(list => [...list, task]);
  }

  return (
    <Container fluid className="App">
      <Row className="justify-content-md-center">
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">
                Task Name
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e)=>setTaskName(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">
                Time in Seconds
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e)=>setTaskTime(e.target.value)} type="number" id="basic-url" aria-describedby="basic-addon3" />
          </InputGroup>      
        </Col>
      </Row>

      <Button onClick={addTask}>
        Create Task
      </Button>
      <TimerList list={list} />
    </Container>
  );
}

export default App;
