import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function RedColor(a, b, c)
{
	var e1 = document.getElementById(a);
	e1.classList.add("RedColor");
	var e2 = document.getElementById(b);
	e2.classList.add("RedColor");
	var e3 = document.getElementById(c);
	e3.classList.add("RedColor");
}


function Square(props) {
	return (
		<button id={props.id} className="square" onClick={props.onClick}>
		{props.value}
		</button>
		);
	}

	class Board extends React.Component {
		renderSquare(i) {
			return (
			<Square
			id = {i}
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
			/>
			);
		}

		render() {
			return (
			<div>
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
		constructor(props) {
			super(props);
			this.state = {
				history: [
				{
					squares: Array(9).fill(null)
				}
				],
				stepNumber: 0,
				xIsNext: true,
			};
		}

		handleClick(i) {	
			const history = this.state.history.slice(0, this.state.stepNumber + 1);
			const current = history[history.length - 1];
			const squares = current.squares.slice();
			if (calculateWinner(squares) || squares[i]) {
				return;
			}
			squares[i] = this.state.xIsNext ? "X" : "O";
			this.setState({
				history: history.concat([
				{
					squares: squares
				}
				]),
				stepNumber: history.length,
				xIsNext: !this.state.xIsNext,
			});
		}


		jumpTo(step) {
			this.setState({
				stepNumber: step,
				xIsNext: (step % 2) === 0
			});
		}

		Sort()
		{
			const temp = this.state.temp;
			this.setState({
				temp: !temp
			});
		}

		render() {
			const history = this.state.history;
			const current = history[this.state.stepNumber];
			const winner = calculateWinner(current.squares);

			const moves = history.map((step, move) => {
				const desc = move ?
				'Go to move # ' + move + ' ' + (move%2!=0 ? "X " : "O ") :
				'Go to game start';
				return (
				move == this.state.stepNumber ? <li key={move}>
				<button className="RedColor" onClick={() => this.jumpTo(move) }> {desc}</button>
				</li> : <li key={move}>
				<button onClick={() => this.jumpTo(move) }> {desc}</button>
				</li>
				);
			});

			let status;
			if (winner && winner !== 'draw') {
				status = 'Winner: ' + winner[3];
				RedColor(winner[0], winner[1], winner[2]);
			}
			else if(winner && winner == 'draw')
			{
				status = "Draw";
			}
			else {
				status = "Next player: " + (this.state.xIsNext ? "X" : "O");
			}

			return (
			<div className="game">
			<div className="game-board">
			<Board
			squares={current.squares}
			onClick={i => this.handleClick(i)}
			/>
			</div>
			<div className="game-info"> 
			<div>{status}</div>
			<div> <button onClick={() => this.Sort()}> Sort </button> </div>
			{(() => this.state.temp === true ? <ol>{moves.reverse()}</ol> : <ol>{moves}</ol> ) ()}
			</div>
			</div>
			);
		}
	}

	// ========================================

	ReactDOM.render(<Game />, document.getElementById("root"));

	function calculateWinner(squares) {
		const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				lines[i].push(squares[a]);
				return lines[i];
			}
		}
		let x = 0;
		for (let i = 0; i < lines.length; i++) {
			if (squares[i] !=null) {
				x++;
			}
		}
		if(x==8)
			return 'draw';
		return null;
	}
