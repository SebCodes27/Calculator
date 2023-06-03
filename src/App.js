import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      operator: '',
      finalOutcome: '',
      newInt: '',
      prevTotal: 0,
      newVal: 0,
      firstOp: 'no',
      currOp: '',
      totaled: 'no'
    }
    this.handleNumChange = this.handleNumChange.bind(this);
    this.handleDecChange = this.handleDecChange.bind(this);
    this.handleOpChange = this.handleOpChange.bind(this);
    this.clearPreview = this.clearPreview.bind(this);
    this.showTotal = this.showTotal.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(event) {
    let clicked = document.getElementById(event.key);
    if (event.key === 'Enter') {
      let clicked = document.getElementById('total');
      clicked.click();
    }
    if (event.key === 'Escape') {
      let clicked = document.getElementById('clear');
      clicked.click();
    }
    if (clicked === null) {
      return;
    };
    
    clicked.click();
    
  }
  handleNumChange(num) {
    if (this.state.totaled === 'yes') {
      console.log('yes')
      return;
    }
    let newText = this.state.text + num; // sets up the window preview
    let newVal = 0;
    let lastVal = this.state.text[this.state.text.length - 1];
    let strPrevTotal = this.state.prevTotal.toString() + num;
    /* if (this.state.text.length === 0) {
      this.setState({
        prevTotal: numInt
      });
    } */
    if (this.state.firstOp === 'no') {
      if (num === '0') {
        console.log('hi')
        this.setState({
          prevTotal: strPrevTotal
        })
      } else {
        this.setState({
          prevTotal: parseFloat(strPrevTotal)
        })
    }
  }
    if (lastVal !== '+' && lastVal !== '-' && lastVal !== 'x' && lastVal !== '÷') {
      newVal += (this.state.newInt).toString() + num;
    } else {
      newVal += num;
    }
    let parseNewVal = parseFloat(newVal);
    this.setState({
      newInt: parseNewVal,
      text: newText
    }) // confirms the preview, sets up 'prev' value, resets the operator
    // if the previous newInt is a digit, concatenate this with the new value
    // parse it to an integer
    // set this integer to the newInt to be operated with
  }
  handleDecChange(dec) {
    if (this.state.totaled === 'yes') {
      return;
    }
    let newText = this.state.text + dec; // sets up the window preview
    let newVal = 0;
    let lastVal = this.state.text[this.state.text.length - 1];
    let strPrevTotal = this.state.prevTotal.toString() + dec;
    if (this.state.firstOp === 'no') {
      this.setState({
        prevTotal: strPrevTotal
      })
    }
    if (lastVal !== '+' && lastVal !== '-' && lastVal !== 'x' && lastVal !== '÷' && lastVal !== '.') {
      newVal += (this.state.newInt).toString() + dec;
    } else if (lastVal === '.') {
      return
    } else {
      newVal += '0' + dec;
    }
    this.setState({
      text: newText,
      newInt: newVal,
    });
  }
  handleOpChange(sym, operator) {
    let lastVal = this.state.text[this.state.text.length - 1];
    if (lastVal === '+' || lastVal === "-" || lastVal === 'x' || lastVal === '÷') {
      return
    }
    let newText = this.state.text + sym; // sets up the preview
    let currOp = this.state.operator;
    this.setState({
      text: newText,
      operator: operator,
      firstOp: 'yes',
      totaled: 'no'
    });
    let prevTotal = 0;
    if (currOp === 'plus') {
        prevTotal = this.state.prevTotal + this.state.newInt
      };
    if (currOp === 'minus') {
        prevTotal = this.state.prevTotal - this.state.newInt
    }
    if (currOp === 'multiply') {
        prevTotal = this.state.prevTotal * this.state.newInt
    }
    if (currOp === 'divide') {
        prevTotal = this.state.prevTotal / this.state.newInt
    }
    if (currOp !== '') {
      this.setState({
        prevTotal: prevTotal
      })
    }
    // commence the previous operation, with values 'prevTotal' and 'newInt'
    // set new 'prevTotal'
    // set new operator

    
  }

  clearPreview() {
    this.setState({
      text: 0,
      prev: '',
      operator: '',
      finalOutcome: '',
      newInt: '',
      prevTotal: 0,
      newVal: 0,
      firstOp: 'no',
      totaled: 'no'
    });
  }

  showTotal() {
    let currOp = this.state.operator;
    let prevTotal = 0;
    let text = 0;
    if (currOp === 'plus') {
      prevTotal = this.state.prevTotal + this.state.newInt;
      text = this.state.prevTotal + this.state.newInt;
    }
    if (currOp === 'minus') {
      prevTotal = this.state.prevTotal - this.state.newInt;
      text = this.state.prevTotal - this.state.newInt;
    }
    if (currOp === 'multiply') {
      prevTotal = this.state.prevTotal * this.state.newInt;
      text = this.state.prevTotal * this.state.newInt;
    }
    if (currOp === 'divide') {
      prevTotal = this.state.prevTotal / this.state.newInt;
      text = this.state.prevTotal / this.state.newInt;
    }
    if (/\./.test(prevTotal) === true) {
      text = text.toFixed(2);
    }
    this.setState({
      prevTotal: prevTotal,
      text: text,
      operator: '',
      totaled: 'yes'
    })
  }

  render () {
  return (
    <div id='calculator' className='container-fluid'>
      <div className='row jumbotron'>
        <div className='col-xs-1'>
          <p>hi</p>
        </div>
        <div id="container" className='col-xs-10'>
        <TextDisplay text={this.state.text}/>
        <ButtonInput text={this.state.text} handleNumChange={this.handleNumChange} handleDecChange={this.handleDecChange} handleOpChange={this.handleOpChange} clearPreview={this.clearPreview} showTotal={this.showTotal}/>
        </div>
        <div className='col-xs-1'>
          <p>hi</p>
        </div>
      </div>
    </div>
  )
}};

class TextDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
          <div>
            <textarea value={this.props.text} className='form-control' />
          </div>
    )}};

class ButtonInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
        <div id="buttonBox">
          <div className='col-xs-9'>
            <div className='btn-group btn-group-justified'>
              <a href="#" id='7' onClick={() => this.props.handleNumChange('7')} className='btn btn-default'>7</a>
              <a href='#' id='8' onClick={() => this.props.handleNumChange('8')} className='btn btn-default'>8</a>
              <a href='#' id='9' onClick={() => this.props.handleNumChange('9')} className='btn btn-default'>9</a>
            </div>
            <div className='btn-group btn-group-justified'>
              <a href='#' id='4' onClick={() => this.props.handleNumChange('4')} className='btn btn-default'>4</a>
              <a href='#' id='5' onClick={() => this.props.handleNumChange('5')} className='btn btn-default'>5</a>
              <a href='#' id='6' onClick={() => this.props.handleNumChange('6')} className='btn btn-default'>6</a>
            </div>
            <div className='btn-group btn-group-justified'>
              <a href='#' id='1' onClick={() => this.props.handleNumChange('1')} className='btn btn-default'>1</a>
              <a href='#' id='2' onClick={() => this.props.handleNumChange('2')} className='btn btn-default'>2</a>
              <a href='#' id='3' onClick={() => this.props.handleNumChange('3')} className='btn btn-default'>3</a>
            </div>
            <div className='btn-group btn-group-justified'>
              <a href="#" id='clear' onClick={this.props.clearPreview} className='btn btn-default'>Clear (Esc) </a>
              <a href='#' id='0' onClick={() => this.props.handleNumChange('0')} className='btn btn-default'>0</a>
              <a href='#' id='.' onClick={() => this.props.handleDecChange('.')} className='btn btn-default'>.</a>
            </div>
          </div>
          <div className='col-xs-1'>
            <div className='btn-group btn-group-vertical'>
              <a href='#' id='/' onClick={() => this.props.handleOpChange('÷', 'divide')} className='btn btn-default'>÷</a>
              <a href='#' id='x' onClick={() => this.props.handleOpChange('x', 'multiply')} className='btn btn-default'>×</a>
              <a href='#' id='-' onClick={() => this.props.handleOpChange('-', 'minus')} className='btn btn-default'>–</a>
              <a href='#' id='+' onClick={() => this.props.handleOpChange('+', 'plus')} className='btn btn-default'>+</a>
            </div>
          </div>
          <div className='col-xs-2'>
            <button id='total' onClick={this.props.showTotal} className='btn btn-default btn-block'>= (Enter)</button>
          </div>
        </div>
    )
    }};
        

function App() {
  return (
    <div>
      <Calculator />
    </div>
  );
}

export default App;
