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
	
	render() {
		return (
			<div> 
				<Piece />
				<Piece /> 
				<Piece /> 
				<br /> 
				
				<Piece /> 
				<Piece /> 
				<Piece /> 
				<br />
				
				<Piece /> 
				<Piece />
				<Piece />
				<br /> 
			</div> 
		);
	}
}

class Piece extends Component{
	/* A class for each circle in the board */ 
	
	constructor(props) {
		super(props); 
		this.state = {
			color: "blank",
		}
	}
	
	changeColor(){
    this.setState({
      color: "red",
    });
	}
	
	render() {
		return (
			<span className= {"dot " + this.state.color} onClick={() => this.changeColor()}></span>
		);
	}
}

export default App;
