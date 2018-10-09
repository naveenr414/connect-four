import React, { Component } from 'react';
import './App.css';

class App extends Component {
	/* A class for the whole App */
	
  render() {
    return (
      <div className="App">
		<Board> </Board> 
		
		<Status> </Status> 
      </div>
    );
  }
}

class Status extends Component {
	/* A class for the status at the bottom */
	
	render() {
		return (
			<div className="status"> 
				Black is winning 
			</div> 
		);
	}
}

class Board extends Component {
	/* A class for the connect four board */
	
	constructor(props){
		super(props);
		
		// Creates a blank 3x3 grid with the color of each of the pieces
		var boardColors = []
		for(var i = 0;i<3;i++){
			var temp = [];
			for (var j = 0;j<3;j++){
				temp.push("blank");
			}
			
			boardColors.push(temp);
		}
	
		this.state = {
			boardColors: boardColors, 
		}
	}
	
	changeColor(row, column){
		/* Change the color of the piece at row, column */ 
		
		var boardColors = this.state.boardColors.slice();
		boardColors[row][column] = "red";
				
    this.setState({
      boardColors: boardColors, 
    });
	}
	
	render() {
		return (
			<div> 
				<Piece color={this.state.boardColors[0][0]} onClick={() => this.changeColor(0,0)} />
				<Piece color={this.state.boardColors[0][1]} onClick={() => this.changeColor(0,1)} />
				<Piece color={this.state.boardColors[0][2]} onClick={() => this.changeColor(0,2)} />
				<br /> 
				
				<Piece color={this.state.boardColors[1][0]} onClick={() => this.changeColor(1,0)} />
				<Piece color={this.state.boardColors[1][1]} onClick={() => this.changeColor(1,1)} />
				<Piece color={this.state.boardColors[1][2]} onClick={() => this.changeColor(1,2)} />
				<br />
				
				<Piece color={this.state.boardColors[2][0]} onClick={() => this.changeColor(2,0)} />
				<Piece color={this.state.boardColors[2][1]} onClick={() => this.changeColor(2,1)} />
				<Piece color={this.state.boardColors[2][2]} onClick={() => this.changeColor(2,2)} />
				<br /> 
			</div> 
		);
	}
}

class Piece extends Component{
	/* A class for each circle in the board */ 
	
	render() {
		return (
			<span className= {"dot " + this.props.color} onClick={() => this.props.onClick()}></span>
		);
	}
}

export default App;
