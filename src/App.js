import './App.css';
import React from 'react';
import Select from 'react-select';

import TrashImage from './TrashImage';
import MagImage from './MagImage';
import {percentList, stateList} from './dropdownOptions';

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

	stateUpdate = st => {
		this.setState({
			state: st.value,
			smallSize: null,
			bigSize: null,
			currentlySelectedBig: require('./results/images/' + st.value + '_districts_' + this.state.percent + '.png'),
			currentlySelectedSmall: require('./results/images/' + st.value + '_districts_' + this.state.percent + '_small.png'),
		});
	}

	percentUpdate = pc => {
		this.setState({
			percent: pc.value,
			smallSize: null,
			bigSize: null,
			currentlySelectedBig: require('./results/images/' + this.state.state + '_districts_' + pc.value + '.png'),
			currentlySelectedSmall: require('./results/images/' + this.state.state + '_districts_' + pc.value + '_small.png'),
		});
	}

	render() {
		console.log(this.state.currentlySelectedBig.default + ' ' + this.state.currentlySelectedSmall.default)
		let res;
		if (this.state.smallSize != null && this.state.bigSize != null){
			res = 
			<div>
				<MagImage smallImg={this.state.currentlySelectedSmall} bigImg={this.state.currentlySelectedBig}
				smallDim={this.state.smallSize} bigDim={this.state.bigSize} />
			</div>
		}
		else {
			res = 
			<div>
				<TrashImage selection={this.state.currentlySelectedSmall} updateDim={this.smallDimUpdate} />
				<TrashImage selection={this.state.currentlySelectedBig} updateDim={this.bigDimUpdate} />
			</div>
		}
		
		return(
			<div className='App'>
				<header className='App-header'>
					Algorithmic Redistricting
				</header>
				<div className='Body'>
					<div className='Selectors'>
						<Select className="StateList" options={stateList()} placeholder='State' defaultValue='Alabama' onChange={this.stateUpdate} />
						<Select className="PercentList" options={percentList()} placeholder='Percent' defaultValue='98%' onChange={this.percentUpdate} />
					</div>
					<div className='Images'>
						{res}
					</div>
				</div>
				<div className='About'>
					What
				</div>
			</div>
		);
	}
}

export default App;
