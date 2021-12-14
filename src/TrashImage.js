import React from 'react';


class TrashImage extends React.Component {
	onImgLoad({target:img}) {
		const dim = {height:img.naturalHeight,
					width:img.naturalWidth};
		console.log(dim);
	}

	render() {
		console.log(this.props.selection)
		return(
			<div>
				<img onLoad={this.onImgLoad} src={this.props.selection.default} alt="trash"/>
			</div>
		);
	}
}

export default TrashImage;