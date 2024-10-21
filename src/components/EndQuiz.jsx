import React from 'react'
const EndQuiz = ({points, totalPoints, highScore, dispatch}) => {
  const percentage = (points/totalPoints)*100;
  let message;
  if(percentage===100){
    message="Keep it up"
  }else if(percentage >=80 && percentage<100){
    message="Great Job"
  }else if(percentage >= 50 && percentage<80){
    message= "Good Effort"
  }else if(percentage >0 && percentage < 40){
    message = "Keep Trying...."
  }else if(percentage===0){
    message = "No answers are correct. Better Luck Next Time"
  }
  return (
    <section className='completion'>
        <h2>Thank you for completing the Quiz!</h2>
        <span>{message}</span>
        <p className="result">You Scored <strong>{points}</strong> out of {totalPoints} and your percentage is {Math.round(percentage)}%</p>
        <p className="highscore">(High Score : {highScore} points)</p>
        <button onClick={()=>dispatch({type:"restart"})}>Restart Quiz</button>
    </section>
  )
}

export default EndQuiz
