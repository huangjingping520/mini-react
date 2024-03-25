import React from './core/React.js'

function Counter({ num }) {
  return <div>Count: { num }</div>
}

function CounterContainer () {
  return <Counter />
}

function App () {
  return (
    <>
      <div>hello-mini-react</div>
      <Counter num={ 6 }/>
      <Counter num={ 7 }/>
      {/* <CounterContainer /> */}
    </>
  )
} 

export default App
