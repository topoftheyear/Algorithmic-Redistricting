import React from 'react';


class TrashImage extends React.Component {	
	onImgLoad = ({target:img}) => {
		console.log(this.props);
		this.props.updateDim({
			width: img.naturalWidth,
			height: img.naturalHeight,
		});
	}

	render() {
		console.log(this.props);
		return(
			<div>
				<img onLoad={this.onImgLoad} src={this.props.selection.default} alt="trash"/>
			</div>
		);
	}
}

export default TrashImage;