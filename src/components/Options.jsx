export const Options = ({quizQuestion, dispatch, answer}) => {
  /*
         {
            "question":"1.what is the default behaviour of React when rendering a list",
            "options":["Keys", "Refs", "State", "Props"],
            "correctAnswer": 0,
            "points": 5
        }
  */

  const hasAnswered = answer !== null;
  console.log(hasAnswered);


  return (
    <div className='options'>
      {
      quizQuestion.options.map((option, index)=>(
        <button 
          className={`option ${hasAnswered?index===quizQuestion.correctAnswer?"Correct" : "Wrong" : " "}`}
          key={option} onClick={()=>dispatch({type:'newAnswer', payload:index})}  disabled={hasAnswered}>{option}
       </button>
      ))    
      }
    </div>
  )
}
export default Options

// step 1 - different bg colors for right and wrong answers
// step 2 - updating points
// step 3 - updating question number and status bar
// step 4 - Next Button has to be displayed 

// [0,1,2,3]
// correctAnswer : 2