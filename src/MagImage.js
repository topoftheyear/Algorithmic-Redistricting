import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

import './MagImage.css';


class MagImage extends React.Component {
	render() {
		return (
			<div className='fluid'>
				<div className='fluid__image-container'>
					<ReactImageMagnify {...{
						smallImage: {
							src: this.state.currentlySelected.default,
							//isFluidWidth: true,
							width: this.state.smallSize.width,
							height: this.state.smallImage.height,
						},
						largeImage: {
							src: this.state.currentlySelected.default,
							width: this.state.bigSize.width,
							height: this.state.bigSize.height,
						},
						enlargedImageContainerDimensions: {
							width: '200%',
							height: '100%',
						},
						isHintEnabled: true,
					}} />
				</div>
			</div>
		);
	}
}

export default MagImage;