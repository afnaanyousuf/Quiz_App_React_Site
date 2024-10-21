import React from 'react'
import { Timer } from './Timer'

export const QuizMain = ({numOfQuestion, index, points, totalPoints, answer, remainingTime, dispatch}) => {
  return (
    <section className='quiz'>
        <div className='progress-container'>
            <progress value={index+Number(answer!==null)} max={numOfQuestion}></progress>
        </div>
        <div className='progress-info'>
            <div></div>
            <p>Ques:{index+1}/{numOfQuestion}</p>
            <p>Points: <span>{points}/{totalPoints}</span></p>
            <p><Timer remainingTime={remainingTime} dispatch={dispatch}/></p>
        </div>
    </section>
  )
}

export default QuizMain
