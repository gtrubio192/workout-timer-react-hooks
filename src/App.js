import React, { useState }from 'react';
import { Container, Button, Card, Row, FormControl, InputGroup } from 'react-bootstrap/';
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

  const deleteTask = (name) => {
    console.log(name);
    const newList = list.filter(item => item.name !== name)
    setList(newList);
  }

  const startWorkout = () => {
    const delay = ({name, time}) => {
      setTimeout(() => {
        console.log(name)
      }, time*1000);
    }

    for (let item in list) {
      console.log(list[item])
      delay(list[item])
    }
  }

  return (
    <Container fluid className="App">
      <Row className="justify-content-md-center">
        <Card>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">
                Task Name
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e)=>setTaskName(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">
                Time in Seconds
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={(e)=>setTaskTime(e.target.value)} type="number" id="basic-url" aria-describedby="basic-addon3" />
          </InputGroup>          
        </Card>

      </Row>

      <Button variant="outline-primary" onClick={addTask}>
        Create Task
      </Button>
      <Button variant="success" onClick={startWorkout}>
        Start Workout
      </Button>
      <TimerList list={list} handleDeleteTask={deleteTask}/>
    </Container>
  );
}

export default App;
