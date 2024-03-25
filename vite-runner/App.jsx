import React from './core/React.js'

function Counter() {
  return <div>Counter</div>
}

function CounterContainer () {
  return <Counter />
}

function App () {
  return (
    <>
      <div>hello-mini-react</div>
      <Counter />
      {/* <CounterContainer /> */}
    </>
  )
} 

export default App
