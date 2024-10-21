import React from 'react'
// props is used as numOfQuestion 
const Header = ({numOfQuestion, dispatch}) => {
  return (
    <section className='welcome'>
        <h1>Welcome to the Quiz</h1>
        <p>Total Questions : {numOfQuestion}</p>
        <button onClick={()=>dispatch({type:"start"})}>Start Quiz</button>
    </section>
  )
}

export default Header
