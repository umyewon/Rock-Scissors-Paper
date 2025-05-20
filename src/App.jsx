import { useState } from 'react'
import './App.css'
import Box from './component/Box'
import {useMediaQuery} from 'react-responsive';

export const Mobile = ({}) => {
  const isMobile = useMediaQuery({
    query : "(max-width:768px)"
  });
  
  return <>{isMobile && 
    <div>
      <h1 className="main">🎮Rock, Scissors, Paper🎮</h1>
      <h2>Score <span>{userScore} : {computerScore}</span></h2> 
      <div className="main">
        <Box title="You" item={userSelect} result={userResult}/>
        <pre>     </pre>
        <Box title="Computer" item={computerSelect} result={computerResult}/>
      </div>
      
      <br/>

      <div className="main">
        {/* 아래처럼 함수를 호출하는 형태로 부르면 
        소스가 로딩되지마자 함수가 다 실행되어버림
        클릭 했을 때 함수를 실행시키려면 () => 함수명()으로 콜백함수를 넣어줘야함
        */}
        {/* <button onClick={play("scissors")}>가위</button> */} 
        
        <button className="item-hand" onClick={() => play("scissors")}>✌🏻</button>
        <button className="item-hand" onClick={() => play("rock")}>✊🏻</button>
        <button className="item-hand" onClick={() => play("paper")}>🖐🏻</button>
      </div>
    </div>
  }</>
}

export const PC = ({}) => {
  const isPc = useMediaQuery({
    query : "(min-width:1024px)"
  });
  
  return <>{isPc &&
    <div>
      <h1 className="main">🎮Rock, Scissors, Paper🎮</h1>
      <h2>Score <span>{userScore} : {computerScore}</span></h2> 
      <div className="main">
        <Box title="You" item={userSelect} result={userResult}/>
        <pre>     </pre>
        <Box title="Computer" item={computerSelect} result={computerResult}/>
      </div>
      
      <br/>

      <div className="main">
        {/* 아래처럼 함수를 호출하는 형태로 부르면 
        소스가 로딩되지마자 함수가 다 실행되어버림
        클릭 했을 때 함수를 실행시키려면 () => 함수명()으로 콜백함수를 넣어줘야함
        */}
        {/* <button onClick={play("scissors")}>가위</button> */} 
        
        <button className="item-hand" onClick={() => play("scissors")}>✌🏻</button>
        <button className="item-hand" onClick={() => play("rock")}>✊🏻</button>
        <button className="item-hand" onClick={() => play("paper")}>🖐🏻</button>
      </div>
    </div>
  }</>
}

// 1.박스 2개 생성 (타이틀, 사진, 결과)
// 2. 박스 하단에 버튼 (가위, 바위, 보) : 버튼을 클릭 시 클릭한 값이 박스에 보임 & 컴퓨터 박스는 랜덤하게 선택
// 3. 2번의 결과를 가지고 승패를 따진다.
// 4. 승패 결과에 따라 박스 테두리 색이 바뀐다 (이기면 - 초록, 지면 - 빨강, 비기면 - 검정)

const choice = {
  rock : {
    name : "Rock",
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHHIiwU8uVoAk9ky8t15hYouYcWK5MANg7Ig&s"
  },
  scissors : {
    name : "Scissors",
    img : "https://m.media-amazon.com/images/I/717kH7cNQ8L.jpg"
  },
  paper : {
    name : "Paper",
    img : "https://cdn11.bigcommerce.com/s-2i5mq6440u/images/stencil/original/products/3762/9095/PlasticPaper-CutSheet__18809.1597757191.png?c=2"
  }
}

function App() {
  const [ userSelect, setUserSelect ] = useState(null)
  const [ computerSelect, setComputerSelect ] = useState(null)
  const [ userResult, setUserResult ] = useState("")
  const [computerResult, setComputerResult ] = useState("")
  const [userScore , setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)

  const play = (userChoice) => {
    // 나의 선택
    setUserSelect(choice[userChoice]);
    //console.log(userChoice + " 선택됨");
    
    // 컴퓨터의 선택
    let computerChoice = ramdomChoice();
    setComputerSelect(computerChoice)

    // 나의 승패 판단
    const userResultTemp = userJudgement(choice[userChoice], computerChoice);
    setUserResult(userResultTemp);
    
    // 컴퓨터의 승패 판단 <= 아래처럼 할 수 없음 (setUserResult는 비동기로 동작하기 때문에)
    // setComputerResult(computerJudgement(userResult)); // userResult는 비동기라서 바로 못가져옴
    const computerResultTemp = computerJudgement(userResultTemp);
    setComputerResult(computerResultTemp);

    // 현재 스코어
    if(userResultTemp == 'win'){ setUserScore(Number(userScore+1))};
    if(computerResultTemp == 'win'){ setComputerScore(Number(computerScore+1))};
  }

  const userJudgement = (user, computer) => {
    // 가위바위보 로직
    if (user.name == computer.name){
      return "tie";
    } else if (user.name == 'Rock'){
      return computer.name == 'Scissors' ? "lose" : "win"
    } else if (user.name == 'Scissors'){
      return computer.name == 'Rock' ? "lose" : "win"
    } else if (user.name == 'Paper') {
      return computer.name == 'Scissors' ? "lose" : "win"
    }
  } 

  const computerJudgement = (userResult) => {
    console.log("userResult : " + userResult)
    if (userResult == "win"){
      return "lose";
    } else if (userResult == "lose"){
      return "win";
    } else {
      return "tie";
    }
  }
 
  const ramdomChoice = () => {
    let itemArr = Object.keys(choice); // Object.keys() : 객체의 키값만 뽑아서 배열로 만들어주는 함수
    //console.log("itemArr : ", itemArr);
    let randomItem = Math.floor(Math.random() * itemArr.length);
    let final = itemArr[randomItem];
    //console.log("랜덤값 : " + final);
    return choice[final]
  }

  return (
    <>
      <Mobile></Mobile>
      <PC></PC>
    </>
  )
}

export default App
