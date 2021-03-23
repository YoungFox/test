import React from "react"
import '../components/tictactoe.module.css'

function Square(props) {
  return (
    <button className="square" onClick={() => { props.onClick() }}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
    )
  }

  render() {
    return (
      <div>
        {
          [0,1,2].map((v,k)=>{
            return (
              <div key={v} className="board-row">
                {
                  [0,1,2].map((v1, k1)=>{
                    return this.renderSquare(v*3 + v1)
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      history: [
        {squares: Array(9).fill(null),x:0,y:0},
      ],
      stepNumber: 0,
      xIsNext: true,
      shengxu: true
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if(calculateWinner(squares) || squares[i]) {
      return
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    let x = Math.floor(i/3)
    let y = i % 3
    this.setState({
      history: history.concat([{
        squares: squares,
        x,
        y,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }
  changeOrder() {
    this.setState({
      shengxu: !this.state.shengxu
    })
  }
  
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
   
    let moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move :
      'Go to game start';
      console.log(move, step.x, step.y)
      return (
        <li key={move}>
          <span>{step.x}{step.y}</span>
          <button onClick={()=> this.jumpTo(move)} 
          className={this.state.stepNumber == move? 'hightlight btns' : 'btns'}>{desc}</button>
        </li>
      )
    })

    if(!this.state.shengxu){
      moves = moves.reverse()
    }

    let status

    if(winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
        <button onClick={() => this.changeOrder()}>{this.state.shengxu? '升序' : '降序'}</button>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game