import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import {FormControl,InputLabel,Input, FormHelperText} from '@material-ui/core';
import Todo from './Todo/Todo';
import db from './firebase';
import firebase from 'firebase';
import './App.css';

const App = () => {
  const [todos, addTodos] = useState([])
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('time', 'desc').onSnapshot(snapShot => {
      addTodos(snapShot.docs.map(doc => ({id: doc.id , todo: doc.data().todo, time: doc.data().time})))
    })
  }, [])
  const inputChangeHandler = (event) => {
    setInput(event.target.value)
  }

  const submitButtonHandler = () => {
    console.log(todos)
    db.collection('todos').add({
      todo: input,
      time: firebase.firestore.FieldValue.serverTimestamp()
    })
    // addTodos([...todos, input]);
    setInput('')
  }

  return (
    <div className="App">
      <h2 style={{color:'#27ae60'}}>TODO App</h2>
      
      <FormControl>
        <InputLabel htmlFor="my-input">Add to Todo's List</InputLabel>
        <Input value={input} onChange={inputChangeHandler} />
      </FormControl>
      <Button disabled={!input} onClick={submitButtonHandler} variant="contained" color="success">
        Add Todo
      </Button>

      <ul>
        {todos.map(todo => <Todo key={todo.id} id={todo.id} text={todo.todo} time="" />)}
      </ul>
    </div>
  );
}

export default App;
