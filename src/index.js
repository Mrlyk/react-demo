import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 函数组件 没有state只有一个render的时候可以写成函数式组件
function Square(props) {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         value: null
    //     }
    // }
    return (
        <button className="square"
                onClick={ props.onClick}
        >
            {props.value}
        </button>
    );

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
    // lines.forEach(item=>{
    //     const [a,b,c] = item
    //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
    //         return squares[a]
    //     }
    // })
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null
}

//
// class GetData extends React.Component{
//     test(props){
//         alert(props.value)
//     }
//     render(){
//         console.log("prop:"+Object.keys(this.props))
//         return (<p onClick={()=>this.test(this.props)}>{this.props.value}</p>)
//     }
// }

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9),
            xIsNext: true
        }
    }

    handleClick(i) {
        // 创建了一个当前数组的副本,确保操作数据不会影响到原数组
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return
        }

        if (!squares[i]) {
            squares[i] = this.state.xIsNext?'X':'O'
        }
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]}
                       onClick={() => this.handleClick(i)}
        />;
    }

    reset() {
        this.setState({
            squares: []
        })
    }

    back() {
        this.setState({
            squares: this.state.squares
        })
    }

    // getData(){
    //     let today = new Date().getFullYear()
    //     return <GetData value={today}/>
    // }

    render() {
        const winner = calculateWinner(this.state.squares)
        let status
        if (winner){
            status = 'Winner:'+ winner
        } else {
            status = 'Next player: '+(this.state.xIsNext?'X':'O')
        }
        return (
            <div>
                {/*{this.getData()}*/}
                <button onClick={() => {
                    this.reset()
                }}>重置
                </button>
                <button onClick={() => {
                    this.back()
                }}>后退
                </button>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
