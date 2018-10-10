import React, { Component } from 'react';
import './App.css';

class Game extends Component {
	/* A class for the whole Game */
	
	constructor(props){
		super(props);
		
		// Creates a blank 3x3 grid with the color of each of the pieces
		var boardColors = []
		for(var i = 0;i<4;i++){
			var temp = [];
			for (var j = 0;j<4;j++){
				temp.push("blank");
			}
			
			boardColors.push(temp);
		}
	
		this.changeColor.bind(this);
	
		this.state = {
			boardColors: boardColors, 
			nextColor: "red",
		}
		
	}
	
	checkWin(board){
		/* Check horizontal */ 
		for(var i = 0;i<board.length;i++){
			for(var j = 0;j<board[0].length;j++){
				/* Start at (i,j) and go 4 to the right */ 
				var originalColor = board[i][j];
				var works = originalColor!=="blank";
				
				for(var k = 1;k<4;k++){
					works&= j+k<board[0].length && board[i][j+k]===originalColor;
				}
				
				if(works){
					return originalColor;
				}
			}
		}
			
		/* Check Vertical */ 
		for(var i = 0;i<board.length;i++){
			for(var j = 0;j<board[0].length;j++){
				/* Start at (i,j) and go 4 to the down */ 
				var originalColor = board[i][j];
				var works = originalColor!=="blank";
				
				for(var k = 1;k<4;k++){
					works&= i+k<board.length && board[i+k][j]===originalColor;
				}
				
				if(works){
					return originalColor;
				}
			}
		}
		
		/* Check Diagonal, going down and right */ 
		for(var i = 0;i<board.length;i++){
			for(var j = 0;j<board[0].length;j++){
				/* Start at (i,j) and go 4 to the down */ 
				var originalColor = board[i][j];
				var works = originalColor!=="blank";
				
				for(var k = 1;k<4;k++){
					works&= i+k<board.length && j+k<board[0].length && board[i+k][j+k]===originalColor;
				}
				
				if(works){
					return originalColor;
				}
			}
		}
		
		/* Check diagonal, going up and right */ 
		for(var i = 0;i<board.length;i++){
			for(var j = 0;j<board[0].length;j++){
				/* Start at (i,j) and go 4 to the down */ 
				var originalColor = board[i][j];
				var works = originalColor!=="blank";
				
				for(var k = 1;k<4;k++){
					works&= i-k>=0 && j+k<board[0].length && board[i-k][j+k]===originalColor;
				}
				
				if(works){
					return originalColor;
				}
			}
		}
		
		return "";
	}
	
	changeColor(column){
		/* Place a piece on this column */ 
				
		/* Find out which row is the lowest unfilled one */ 
		var row = this.state.boardColors.length-1;
		var boardColors = this.state.boardColors.slice();
		var noWinner = this.checkWin(boardColors)==="";
		
		while (row>=0 && boardColors[row][column]!=="blank") {
			row-=1;
		}
				
		/* If row is -1, then the column is completly filled */ 
		if (row !== -1 && noWinner) {
			boardColors[row][column] = this.state.nextColor;
					
			this.setState({
				boardColors: boardColors, 
				nextColor: this.state.nextColor==="red"?"blue":"red",
			});
			
			var winner = this.checkWin(boardColors);
			
			/* Check if the game is over */ 
			if (winner!=="") {
				alert(this.checkWin(boardColors));
			}
		}
	}
	
  render() {
    return (
     <div className="Game">
			<Board boardColors={this.state.boardColors} onClick = {(column) => this.changeColor(column)} />
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

	
	render() {
		return (
			<div> 
				<Piece color={this.props.boardColors[0][0]} onClick={() => this.props.onClick(0)} />
				<Piece color={this.props.boardColors[0][1]} onClick={() => this.props.onClick(1)} />
				<Piece color={this.props.boardColors[0][2]} onClick={() => this.props.onClick(2)} />
				<Piece color={this.props.boardColors[0][3]} onClick={() => this.props.onClick(3)} />
				<br /> 
				
				<Piece color={this.props.boardColors[1][0]} onClick={() => this.props.onClick(0)} />
				<Piece color={this.props.boardColors[1][1]} onClick={() => this.props.onClick(1)} />
				<Piece color={this.props.boardColors[1][2]} onClick={() => this.props.onClick(2)} />
				<Piece color={this.props.boardColors[1][3]} onClick={() => this.props.onClick(3)} />
				<br />
				
				<Piece color={this.props.boardColors[2][0]} onClick={() => this.props.onClick(0)} />
				<Piece color={this.props.boardColors[2][1]} onClick={() => this.props.onClick(1)} />
				<Piece color={this.props.boardColors[2][2]} onClick={() => this.props.onClick(2)} />
				<Piece color={this.props.boardColors[2][3]} onClick={() => this.props.onClick(3)} />
				<br /> 
				
				<Piece color={this.props.boardColors[3][0]} onClick={() => this.props.onClick(0)} />
				<Piece color={this.props.boardColors[3][1]} onClick={() => this.props.onClick(1)}/>
				<Piece color={this.props.boardColors[3][2]} onClick={() => this.props.onClick(2)} />
				<Piece color={this.props.boardColors[3][3]} onClick={() => this.props.onClick(3)} />
				
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

export default Game;
