import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { usePSStore } from './use-psstore';
import { createRequest, RequestTypes as RT } from 'counter-store';

const App = () => {
  const { state, request } = usePSStore({ endpoint: process.env.WS_ENDPOINT });
  const decrement = () => request(createRequest(RT.Decrement)({}));
  const increment = () => request(createRequest(RT.Increment)({}));

  return (
    <>
      <p>Shared counter value is {state.value}</p>
      <button onClick={decrement}>-1</button>
      <button onClick={increment}>+1</button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
