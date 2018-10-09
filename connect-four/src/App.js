import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
	render() {
		return (
			<div className="status"> 
				Black is winning 
			</div> 
		);
	}
}

class Board extends Component {
	render() {
		return (
			<div> 
				<Piece /> <Piece /> <Piece /> <br /> 
				<Piece /> <Piece /> <Piece /> <br />
				<Piece /> <Piece /> <Piece /> <br /> 
			</div> 
		);
	}
}

class Piece extends Component{
	render() {
		return (
			<span class="dot"></span>
		);
	}
}

export default App;
