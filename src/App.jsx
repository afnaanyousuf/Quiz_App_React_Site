// status
//  1.loading --- <loading></loading>
//  2. error --- <error></error>
//  3. ready --- <Header></Header>
//  4. active--- QuizMain , Question, NextButton
//  5. finished --- <EndQuiz></EndQuiz>

import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Loading from './components/Loading';
import Error from './components/Error';
import Question from './components/Question';
import QuizMain from './components/QuizMain';
import NextButton from './components/NextButton';
import EndQuiz from './components/EndQuiz'
import './App.css'
const secsPerQuestion = 20;
const initialState = {
  quizQuestion: [],
  status : "loading",
  // re rendering takes place after clicking the next button it must display the index 1 question  
  index:0,
  answer: null,
  points:0,
  highScore:0,
  remainingTime:null,
}
function reducer(state, action){
  switch(action.type){
    case 'fetch_success' : 
       return {
        ...state,
        quizQuestion: action.payload,
        status: 'ready'
       }
    case 'fetch_error' :
      return{
        ...state,
        status: 'error'
      }
    case 'start' :
      return{
        ...state,
        status : 'active',
        remainingTime: state.quizQuestion.length*secsPerQuestion,
      }
    case 'newAnswer' :
      // getting access to current question
      const question = state.quizQuestion.at(state.index);
      console.log(question);
      return{
        ...state,
        answer : action.payload,
        points : action.payload === question.correctAnswer?state.points+question.points : state.points

      }
      case 'nextQuestion':
        return{
          ...state,
          index: state.index+1,
          answer:null,
        } 
      case 'finish':
        return{
          ...state,
          status: "finished",
          highScore:state.points>state.highScore?state.points:state.highScore
        }
      case 'restart':
        return{
          ...initialState, 
          quizQuestion:state.quizQuestion,
          status: 'ready',
          highScore: state.highScore,
        }
      case 'timer':
        return{
          ...state,
          remainingTime:state.remainingTime-1,
          status: state.remainingTime===0?'finished':state.status,
        }
    default:
      return state
  }
}

export default function App(){
  const [state, dispatch] = useReducer(reducer, initialState); 
  // from the state, we have destructing the quizQuestion, index, status 
  const {quizQuestion, status, index, answer, points, highScore, remainingTime} = state;
  // find the length of json object meaning checking how many question are there in the db.json
  // App.jsx is the parent and Header is the child component
  // numOfQuestion is a prop
  const numOfQuestion = quizQuestion.length;
  const totalPoints = quizQuestion.reduce((prev, cur)=>prev+cur.points, 0);
  useEffect(function(){
    fetch('http://localhost:8000/quizQuestion')
    .then((res)=>res.json())
    .then((data)=>{
      dispatch({type:'fetch_success', payload:data})
      console.log(data)
    }
  ).catch((err)=>dispatch({type:'fetch_error'}))
  }, [])
  return(
    <>
    {status === 'loading' && <Loading/>}
    {status === 'error' && <Error/>}
    {/* props is used as numOfQuestion, quizQuestion */}
    {status === 'ready' && <Header numOfQuestion={numOfQuestion} dispatch={dispatch}/>}
    {
    status === 'active' &&
    <>
    <QuizMain numOfQuestion={numOfQuestion} index={index} 
    points={points} totalPoints={totalPoints} answer={answer} remainingTime={remainingTime}
    dispatch={dispatch}
    />
    <Question quizQuestion={quizQuestion[index]} 
    dispatch ={dispatch} answer = {answer}/>
    <NextButton dispatch={dispatch} answer={answer} index={index} numOfQuestion={numOfQuestion} />
    </>
    }
    {
    status==='finished' && <EndQuiz points={points} totalPoints={totalPoints}
    highScore={highScore} dispatch={dispatch}/>
     }
    </>
  )
}
// 50/70 == 50
// 45/70 == 50
// 60/70 == 60