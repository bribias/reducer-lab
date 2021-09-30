import React, { useReducer } from 'react';

const initialValue = {
  before: [],
  current: '#FF0000',
  after: ['#0000FF']
};

const colorHistory = (state, action) => {
  switch (action.type) {
    case 'undo':
      return {
        after: [state.current, ...state.after],
        current: state.before[state.before.length - 1],
        before: state.before.slice(0, -1)
      };
    case 'redo':
      return {
        before: [...state.before, state],
        current: state.after[0],
        after: state.after.slice(1)
      };
    case 'record':
      return {
        ...state,
        before: [...state.before, state.current],
        current: action.payload
      };
    default:
      return new Error(`Invalid action, unexpected type: ${action.type}`);
  }
};


function App() {

const [state, dispatch] = useReducer(colorHistory, initialValue);

  return (
    <>
      <button onClick={() => dispatch({ type: 'undo' })}>undo</button>
      <button onClick={() => dispatch({ type: 'redo' })}>redo</button>
      <input type="color" value={state.current} onChange={({ target }) => dispatch({ type: 'record', payload: target.value })} />
      <div aria-label="display" style={{ backgroundColor: state.current, width: '10rem', height: '10rem' }}></div>
    </>
  )
}

export default App;