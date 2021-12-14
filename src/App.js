import './App.css';
import React from 'react';

import MagImage from './MagImage';
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
			currentlySelected: this.images['AL_districts_0.98.png'],
		}
		this.updateSelection();
	}

	updateSelection() {
		this.setState({
			currentlySelected: this.images[this.state.state + '_districts_' + this.state.percent + '.png'],
		});
	}

	render() {
		return(
			<div className="App">
				<header className="App-header">
					<TrashImage selection={this.state.currentlySelected}/>
				</header>
			</div>
		);
	}
}

export default App;
