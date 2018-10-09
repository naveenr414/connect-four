import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
		<h1> Hello </h1> 
		
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

export default App;
