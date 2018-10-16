import React, { Component } from 'react';
import './App.css';

var boardSize = 8;

class Game extends Component {
	/* A class for the whole Game */
	
	constructor(props){
		super(props);
		
		// Creates a blank grid with the color of each of the pieces
		var boardColors = []
		for(var i = 0;i<boardSize;i++){
			var temp = [];
			for (var j = 0;j<boardSize;j++){
				temp.push("blank");
			}
			
			boardColors.push(temp);
		}
	
		this.changeColor.bind(this);
	
		this.state = {
			boardColors: boardColors, 
			nextColor: "red",
			winner: "", 
		}
		
	}
	
	checkWin(board){
		/* Check horizontal */ 
		for(var i = 0;i<board.length;i++){
			for(var j = 0;j<board[0].length;j++){
				/* Start at (i,j) and go all the way to the right */ 
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
				/* Start at (i,j) and go all the way down */ 
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
				/* Start at (i,j) and go down and right */ 
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
				/* Start at (i,j) and go diagonally up and right */ 
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
			
			var winningTeam = this.checkWin(boardColors);
			var message = "";
			
			if(winningTeam !== ""){
				/* Make the first letter of winningTeam capitalized */ 
				winningTeam = winningTeam.charAt(0).toUpperCase() + winningTeam.slice(1);
				message = "The winner is "+winningTeam
			}
			
			this.setState({
				boardColors: boardColors, 
				nextColor: this.state.nextColor==="red"?"blue":"red",
				winner: message, 
			});
		}
	}
	
  render() {
    return (
     <div className="Game">
			<Board boardColors={this.state.boardColors} onClick = {(column) => this.changeColor(column)} />
			<Status winner={this.state.winner} /> 
     </div>
    );
  }
}

class Status extends Component {
	/* A class for the status at the bottom */
	
	render() {
		return (
			<div className="status"> 
				{this.props.winner}
			</div> 
		);
	}
}

class Board extends Component {
	/* A class for the connect four board */

	
	render() {
		var pieces = [];
		
		var numbers = [0,1,2,3,4,5,6,7];
		var colors = ["blue","red","blank"];
		
		for(var i = 0;i<boardSize;i++){
			let tempI = i;
			for(var j = 0;j<boardSize;j++){	
				let tempJ = j;	
				pieces.push(<Piece key = {("piece"+boardSize*tempI+tempJ).toString()} color={this.props.boardColors[tempI][tempJ]} onClick={() => this.props.onClick(tempJ)} />);				
			}
			pieces.push(<br key={"br"+tempI.toString()}/>);
		}
				
		return (<div> {pieces} </div>);
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
