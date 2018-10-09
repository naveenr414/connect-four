import React, { Component } from 'react';
import './App.css';

class App extends Component {
	/* A class for the whole App */
	
  render() {
    return (
     <div className="App">
			<Board />
			<Status /> 
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
			nextColor: "red",
		}
	}
	
	changeColor(column){
		/* Place a piece on this column */ 
		
		/* Find out which row is the lowest unfilled one */ 
		var row = this.state.boardColors.length-1;
		while(row>=0 && this.state.boardColors[row][column]!="blank") {
			row-=1;
		}
				
		/* If row is -1, then the column is completly filled */ 
		if(row != -1) {
			var boardColors = this.state.boardColors.slice();
			boardColors[row][column] = this.state.nextColor;
					
			this.setState({
				boardColors: boardColors, 
				nextColor: this.state.nextColor==="red"?"blue":"red",
			});
		}
	}
	
	render() {
		return (
			<div> 
				<Piece color={this.state.boardColors[0][0]} onClick={() => this.changeColor(0)} />
				<Piece color={this.state.boardColors[0][1]} onClick={() => this.changeColor(1)} />
				<Piece color={this.state.boardColors[0][2]} onClick={() => this.changeColor(2)} />
				<br /> 
				
				<Piece color={this.state.boardColors[1][0]} onClick={() => this.changeColor(0)} />
				<Piece color={this.state.boardColors[1][1]} onClick={() => this.changeColor(1)} />
				<Piece color={this.state.boardColors[1][2]} onClick={() => this.changeColor(2)} />
				<br />
				
				<Piece color={this.state.boardColors[2][0]} onClick={() => this.changeColor(0)} />
				<Piece color={this.state.boardColors[2][1]} onClick={() => this.changeColor(1)} />
				<Piece color={this.state.boardColors[2][2]} onClick={() => this.changeColor(2)} />
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
