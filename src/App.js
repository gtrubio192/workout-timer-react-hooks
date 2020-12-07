import React, { useState, useEffect }from 'react';
import { Container, Button, Card, Row, FormControl, InputGroup } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerList } from './components/TimerList';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState(0);
  const [currentTask, setCurrentTask] = useState({})
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const test = [
      {name: "burpees", time: 3},
      {name: "sit ups", time: 3},
      {name: "flying", time: 3},
      {name: "rest", time: 5},
    ];
    setList(test)
  }, [])

  const addTask = () => {
    let task = { name: taskName, time: taskTime };
    setList(list => [...list, task]);
  }

  const deleteTask = (name) => {
    console.log(name);
    const newList = list.filter(item => item.name !== name)
    setList(newList);
  }

  const toggleWorkout = async () => {
    setIsActive(!isActive);    
    for ( const item of list ) {
      setCurrentTask(item);
      await new Promise( resolve => setTimeout( resolve, item.time*1000 + 2000) )
    }
  }

  useEffect(() => {
    if(isActive) {
      setCurrentIndex(currentIndex => currentIndex + 1);
    }
  }, [isActive])

  useEffect(() => {
    // setTimeout( ()=>{ console.log('...')}, 2000 );
    if(list.length > 0 && list.length >= currentIndex) {
      setCurrentTask(list[currentIndex])
    }
  }, [currentIndex])

  const handleNextItem = () => {
    setCurrentIndex(currentIndex => currentIndex + 1);
  }

  const toggle = () => {
    setIsActive(!isActive);
  }

  const reset = () => {
    setList([]);
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
      <Button variant="success" onClick={toggle}>
        {isActive ? 'Pause' : 'Start'}
      </Button>
      <Button onClick={reset}>
        Reset
      </Button>

      <TimerList list={list} handleDeleteTask={deleteTask}/>
      {
        currentTask && currentTask.time > 0
        ? <Timer time={currentTask.time} task={currentTask.name} isActive={isActive} nextItem={handleNextItem} />
        : <Timer time={0} task={'End of the road'} isActive={false} nextItem={handleNextItem} />
      }
      {/* <Timer time={currentTask.time} task={currentTask.name} isActive={isActive} /> */}
    </Container>
  );
}

export default App;
