import './App.css';
import React from 'react';
import Select from 'react-select';
import MetaTags from 'react-meta-tags';

import About from './About';
import Questions from './Questions';
import TrashImage from './TrashImage';
import MagImage from './MagImage';
import {percentList, stateList} from './dropdownOptions';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			state: 'AL',
			percent: '0.95',
			smallSize: null,
			bigSize: null,
			currentlySelectedBig: require('./results/images/AL_districts_0.95.png'),
			currentlySelectedSmall: require('./results/images/AL_districts_0.95_small.png'),
			resData: require('./results/results_0.95.json'),
			displayZips: [],
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
			displayZips: [],
		});
	}

	percentUpdate = pc => {
		this.setState({
			percent: pc.value,
			smallSize: null,
			bigSize: null,
			currentlySelectedBig: require('./results/images/' + this.state.state + '_districts_' + pc.value + '.png'),
			currentlySelectedSmall: require('./results/images/' + this.state.state + '_districts_' + pc.value + '_small.png'),
			resData: require('./results/results_' + pc.value + '.json'),
			displayZips: [],
		});
	}

	zipUpdate = n => {
		const text = n.target.value;
		var allRes = [];
		if (text !== ''){
			for (var districtNumber in this.state.resData[this.state.state].districts) {
				console.log(this.state.resData[this.state.state].districts[districtNumber]['zip codes']);
				for (var thing in this.state.resData[this.state.state].districts[districtNumber]['zip codes']) {
					var code = String(this.state.resData[this.state.state].districts[districtNumber]['zip codes'][thing]);
					if (code.indexOf(text) > -1) {
						allRes.push({
							zip: code,
							district: districtNumber,
						});
					}
				}
			}
		}
		console.log(allRes);
		this.setState({
			displayZips: allRes,
		})
	}

	render() {
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

		let zips = [];
		for (var i = 0; i < this.state.displayZips.length; i++) {
			if (i > 20) {
				break;
			}
			zips.push(
				<div>
					{this.state.displayZips[i].zip}: District {this.state.displayZips[i].district}
				</div>
			)
		}
		
		return(
			<div className='App'>
				<MetaTags>
					<title>Algorithmic Redistricting</title>
					<meta property='og:url' content='https://topoftheyear.github.io/Algorithmic-Redistricting/' />
					<meta property='og:title' content='Algorithmic Redistricting' />
					<meta property='og:description' content='Each U.S. state redistricted by algorithm. Images included.' />
					<meta property='og:image' content='./results/images/AL_districts_0.98.png' />
				</MetaTags>
				<header className='App-header'>
					<h4>Algorithmic Redistricting</h4>
				</header>
				<div className='StateBrowse'>
					<div className='Selectors'>
						<Select className="StateList" options={stateList()} placeholder='Alabama' defaultValue='Alabama' onChange={this.stateUpdate} />
						<Select className="PercentList" options={percentList()} placeholder='95%' defaultValue='95%' onChange={this.percentUpdate} />
					</div>
					<div className='Images'>
						{res}
					</div>
				</div>
				<div className='ZipLookup'>
					<h4>Zip Code Lookup</h4>
					<div>
						<input
							type="text"
							onChange={this.zipUpdate}
							placeholder='Enter Zip Code'
						/>
						<div className='ZipRes'>
							{zips}
						</div>
					</div>
				</div>
				<About />
				<Questions />
				<footer className='App-footer'>
					Data used belongs to the U.S. Census with thanks. The Census is not affiliated with nor endorses this project. <br />
					Riley Conlin 2021-2022.
				</footer>
			</div>
		);
	}
}

export default App;
