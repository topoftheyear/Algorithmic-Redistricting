import ReactImageMagnify from 'react-image-magnify';

import './Image.css';

import imgSmall from './results/images/AL_districts_0.98_small.png';
import imgBig from './results/images/AL_districts_0.98.png';

function Image() {
	return (
		<div className='fluid'>
			<div className='fluid__image-container'>
				<ReactImageMagnify {...{
					smallImage: {
						src: imgSmall,
						//isFluidWidth: true,
						width: 200,
						height: 200,
					},
					largeImage: {
						src: imgBig,
						width: 2000,
						height: 2000,
					},
					enlargedImageContainerDimensions: {
						width: '200%',
						height: '100%',
					},
					isHintEnabled: true,
				}} />
			</div>
			<div style={{height: '500px'}} />
		</div>
	)
}

export default Image;