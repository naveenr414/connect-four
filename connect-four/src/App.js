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
				<Piece color="blue" /> <Piece color="blue"/> <Piece color="red"/> <br /> 
				<Piece color="red" /> <Piece color="blue" /> <Piece color="red" /> <br />
				<Piece color="red" /> <Piece color="blue" /> <Piece color="blue" /> <br /> 
			</div> 
		);
	}
}

class Piece extends Component{
	render() {
		return (
			<span class={"dot " + this.props.color}></span>
		);
	}
}

export default App;
