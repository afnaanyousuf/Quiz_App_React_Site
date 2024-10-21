import React from 'react'
import { Options } from './Options'

export const Question = ({quizQuestion, dispatch, answer}) => {
  // console.log(quizQuestion);
  return (
    <div className='question-container'>
        <h2 className='question'>{quizQuestion.question}</h2>
        <Options  quizQuestion={quizQuestion} dispatch={dispatch} answer={answer}/>
    </div>
  )
}
export default Question