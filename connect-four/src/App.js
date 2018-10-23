import React, { Component } from 'react';
import './App.css';

var boardSize = 12;

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
		var directions = [[1,0],[0,1],[1,1],[1,-1]];
		
		for(var d = 0;d<directions.length;d++){
			/* Check horizontal */ 
			for(var i = 0;i<board.length;i++){
				for(var j = 0;j<board[0].length;j++){
					/* Start at i,j and go 4 in that direction*/ 
					var originalColor = board[i][j];
					var works = originalColor!=="blank";
					
					for(var k = 1;k<4;k++){
						var dY = directions[d][1]*k;
						var dX = directions[d][0]*k;
						
						var inBoard = i+dY>=0 && i+dY<board.length && j+dX<board[0].length;						
						works&= inBoard && board[i+dY][j+dX]===originalColor;
					}
					
					if(works){
						return originalColor;
					}
				}
			}
		}

		return "";
	}
	
	nextRow(column){
		/* What's the lowest row that's empty */
		
		var row = this.state.boardColors.length-1;
		var boardColors = this.state.boardColors.slice();
				
		while (row>=0 && boardColors[row][column]!=="blank") {
			row-=1;
		}
		
		return row;
	}
	
	unhover(column){
		/* 	Mouse stopped hovering
				Unlight the highest available cricle 
		*/ 
		
		var boardColors = this.state.boardColors.slice();
		// Which row would the highlighted circle be on
		var row = this.nextRow(column)+1;
		var noWinner = this.checkWin(boardColors)==="";
			
		if(row !== -1 && noWinner && boardColors[row][column].includes("Hover")){
			boardColors[row][column] = "blank";
			
			this.setState({
				boardColors: boardColors, 
			});
		}
	}
	
	hover(column){
		/* 	Mouse is hovering over the column
				So highlight the highest available circle
		*/ 
		
		var boardColors = this.state.boardColors.slice();
		var row = this.nextRow(column);
		var noWinner = this.checkWin(boardColors)==="";
	
		// We can't highlight if the game is over
		if(row !== -1 && noWinner){
			var hoverColor = this.state.nextColor+"Hover";
			
			boardColors[row][column] = hoverColor;
			
			this.setState({
				boardColors: boardColors, 
			});
		}
	}
	
	changeColor(column){
		/* Place a piece on this column */ 
		
		this.unhover(column);
		
		/* Find out which row is the lowest unfilled one */ 
		var boardColors = this.state.boardColors.slice();
		var noWinner = this.checkWin(boardColors)==="";
		var row = this.nextRow(column);
						
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
			<Board boardColors={this.state.boardColors} onMouseLeave = {(column)=>this.unhover(column)} onMouseOver = {(column) => this.hover(column)} onClick = {(column) => this.changeColor(column)} />
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
		
		for(var i = 0;i<boardSize;i++){
			let tempI = i;
			for(var j = 0;j<boardSize;j++){	
				let tempJ = j;	
				pieces.push(<Piece key = {("piece"+boardSize*tempI+tempJ).toString()} color={this.props.boardColors[tempI][tempJ]} onMouseLeave = { ()=> this.props.onMouseLeave(tempJ)}  onMouseOver = {() => this.props.onMouseOver(tempJ)} onClick={() => this.props.onClick(tempJ)} />);				
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
			<span className= {"dot " + this.props.color} onMouseLeave = {() => this.props.onMouseLeave()} onMouseOver = {() => this.props.onMouseOver()} onClick={() => this.props.onClick()}></span>
		);
	}
}

export default Game;
