import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="remove func" onClick={function() {
        setFuncShow(false);
      }}></input>
      <input type="button" value="remove class" onClick={function() {
        setClassShow(false);
      }}></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

var funcStyle = 'color:blue';
var funcId = 0;
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

  // side effect
  useEffect(function() {
    console.log('%cfunc => useEffect number ( = componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    // title을 변경해주는 것
    document.title = number;
    return function cleanup() {
      console.log('%cfunc => useEffect number return ( = componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    }
    // number가 변경 되었을 때만 useEffect가 실행되도록 해주는 것
  }, [number]);

  useEffect(function() {
    console.log('%cfunc => useEffect _date ( = componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    // title을 변경해주는 것
    document.title = _date;
    return function cleanup() {
      console.log('%cfunc => useEffect _date return ( = componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    }
    // _date가 변경 되었을 때만 useEffect가 실행되도록 해주는 것
  }, [_date]);

  useEffect(function() {
    console.log('%cfunc => useEffect( = componentDidMount)' + (++funcId), funcStyle);
    return function cleanup() {
      console.log('%cfunc => useEffect return ( = componentWillUnmount)' + (++funcId), funcStyle);
    }
    // 빈 배열을 넣게 되면 최초 component가 실행될때만 useEddect가 실행됨
  }, []);

  console.log('%cfunc => render ' + (++funcId), funcStyle);
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
  componentWillUnmount() {
    console.log('%cclass => componentWillUnmount', classStyle);
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
