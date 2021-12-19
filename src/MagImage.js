import React from 'react';
import ReactImageMagnify from 'react-image-magnify';


class MagImage extends React.Component {
	render() {
		return (
			<div className='fluid'>
				<div className='fluid__image-container'>
					<ReactImageMagnify {...{
						smallImage: {
							src: this.props.smallImg.default,
							//isFluidWidth: true,
							width: this.props.smallDim.width,
							height: this.props.smallDim.height,
						},
						largeImage: {
							src: this.props.bigImg.default,
							width: this.props.bigDim.width,
							height: this.props.bigDim.height,
						},
						/*enlargedImageContainerDimensions: {
							width: '200%',
							height: '100%',
						},*/
						isHintEnabled: true,
					}} />
				</div>
			</div>
		);
	}
}

export default MagImage;