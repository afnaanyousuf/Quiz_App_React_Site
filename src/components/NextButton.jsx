import React from 'react'

export const NextButton = ({dispatch, answer, index, numOfQuestion}) => {
  if(answer === null) return null;
  if(index<numOfQuestion-1) 
  return (
    <div className='navigation-buttons'>
      <button className='next' onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
    </div>
  )
  if(index===numOfQuestion-1)
    return (
    <div className='navigation-buttons'>
      <button className='finish' onClick={()=>dispatch({type:'finish'})}>Finish</button>
    </div>
    )
}

export default NextButton