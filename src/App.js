import React, {useState} from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

// 여기서 props는 변수의 이름일뿐 다른 이름으로 변경해도 상관없다.
function FuncComp(props) {
  // useState : function style에서 state를 만들때 사용; 매개변수는 state의 초기값; 배열을 리턴
  var numberState = useState(props.initNumber);
  // 배열의 첫번째는 상태값
  var number = numberState[0];
  // 배열의 두번째는 상태를 변경할 수 있는 함수
  var setNumber = numberState[1];

  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];

  // 위 코드의 축약형
  var [_date, setDate] = useState((new Date()).toString());

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type="button" value="random" onClick={
          function() {
            setNumber(Math.random());
          }
        }></input>
      <input type="button" value="date" onClick={
          function() {
            setDate((new Date()).toString());
          }
        }></input>
    </div>
  );
}

var classStyle = 'color:red';
class ClassComp extends React.Component{
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }
  componentWillMount() {
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount() {
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('%cclass => componentWillUpdate', classStyle);
  }
  componentDidUpdate(nextProps, nextState) {
    console.log('%cclass => componentDidUpdate', classStyle);
  }
  render() {
    console.log('%cclass => render', classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Data : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function() {
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function() {
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    );
  }
}

export default App;
