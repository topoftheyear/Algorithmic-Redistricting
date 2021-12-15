import './App.css';
import React from 'react';

//import MagImage from './MagImage';
import TrashImage from './TrashImage';
import importAll from './getImages';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.images = importAll(require.context('./results/images', false));
		this.state = {
			state: 'AL',
			percent: '0.98',
			smallSize: {width: 200, height: 200},
			bigSize: {width: 2000, height: 2000},
			currentlySelectedBig: this.images['AL_districts_0.98.png'],
			currentlySelectedSmall: this.images['AL_districts_0.98_small.png'],
		}
		this.updateSelection();
	}

	updateSelection() {
		this.setState({
			currentlySelectedBig: this.images[this.state.state + '_districts_' + this.state.percent + '.png'],
			currentlySelectedSmall: this.images[this.state.state + '_districts_' + this.state.percent + '_small.png'],
		});
	}

	smallDimUpdate = dim => {
		this.setState({
			smallSize: dim
		});
		console.log(dim);
	};

	bigDimUpdate = dim => {
		this.setState({
			bigSize: dim
		});
	};

	render() {
		return(
			<div className="App">
				<header className="App-header">
					<TrashImage selection={this.state.currentlySelectedSmall} updateDim={this.smallDimUpdate} />
					<TrashImage selection={this.state.currentlySelectedBig} updateDim={this.bigDimUpdate} />				</header>
			</div>
		);
	}
}

export default App;
