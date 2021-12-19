import './App.css';
import React from 'react';

import TrashImage from './TrashImage';
import MagImage from './MagImage';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			state: 'AL',
			percent: '0.98',
			smallSize: null,
			bigSize: null,
			currentlySelectedBig: require('./results/images/AL_districts_0.98.png'),
			currentlySelectedSmall: require('./results/images/AL_districts_0.98_small.png'),
		}
		this.updateSelection();
	}

	updateSelection() {
		this.setState({
			smallSize: null,
			bigSize: null,
			currentlySelectedBig: require('./results/images/' + this.state.state + '_districts_' + this.state.percent + '.png'),
			currentlySelectedSmall: require('./results/images/' + this.state.state + '_districts_' + this.state.percent + '_small.png'),
		});
	}

	smallDimUpdate = dim => {
		this.setState({
			smallSize: dim
		});
	};

	bigDimUpdate = dim => {
		this.setState({
			bigSize: dim
		});
	};

	render() {
		console.log(this.state.currentlySelectedBig.default + ' ' + this.state.currentlySelectedSmall.default)
		let res;
		if (this.state.smallSize != null && this.state.bigSize != null){
			res = 
			<div className="App">
				<header className="App-header">
					<MagImage smallImg={this.state.currentlySelectedSmall} bigImg={this.state.currentlySelectedBig}
					smallDim={this.state.smallSize} bigDim={this.state.bigSize} />
				</header>
				<div>
					Nice
				</div>
			</div>
		}
		else {
			res = 
			<div className="App">
				<header className="App-header">
					<TrashImage selection={this.state.currentlySelectedSmall} updateDim={this.smallDimUpdate} />
					<TrashImage selection={this.state.currentlySelectedBig} updateDim={this.bigDimUpdate} />
				</header>
				<div>
					Nice
				</div>
			</div>
		}
		
		return(res);
	}
}

export default App;
