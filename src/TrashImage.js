import React from 'react';


class TrashImage extends React.Component {	
	onImgLoad = ({target:img}) => {
		this.props.updateDim({
			width: img.naturalWidth,
			height: img.naturalHeight,
		});
	}

	render() {
		return(
			<div>
				<img onLoad={this.onImgLoad} src={this.props.selection.default} alt="trash"/>
			</div>
		);
	}
}

export default TrashImage;