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
  }
}

function App() {
  const { current, undo, redo, record } = useRecord('#FF0000');

  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <input type="color" value={current} onChange={({ target }) => record(target.value)} />
      <div></div>
    </>
  )
}

export default App;