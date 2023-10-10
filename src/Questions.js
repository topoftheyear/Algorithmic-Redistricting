import './Questions.css'
import React from 'react';


class Questions extends React.Component {	
	render() {
		return(
			<div className='Questions'>
				<h4>Questions and Additional Information</h4>
				<div className='BadDescriptor'>
				<p>
					<b>Where is there an empty space in a state?</b> <br />
					One of two reasons. First and most likely, a lot of federal land doesn't have an associated zip code, thus the area is left blank. A prominent example of this is Nevada. The second reason would be conflict in the data I used. One file contains all pertinent information, the other is a shapefile. If a zip code is in one file but not the other, empty space is created.
				</p>
				<p>
					<b>Why is a state misshapen?</b> <br />
					Map distortions happen when trying to accurately draw a sphere's surface on a flat surface. It is a famous cartographical issue.
				</p>
				<p>
					<b>South Dakota looks really bad in particular though...</b> <br />
					Don't worry about it. It looks bad in real life too.
				</p>
				<p>
					<b>The colors of neighboring districts are too similar.</b> <br />
					Let me know if this happens. You can file an issue on GitHub <a href="https://github.com/topoftheyear/Algorithmic-Redistricting/issues/new">here</a>. Please include both state and percentage. The colors are randomly generated and there are too many images to verify myself.
				</p>
				<p>
					<b>The district number doesn't match.</b> <br />
					District numbering is arbitrary and doesn't particularly matter here. They could be assigned however. What's more important is the district's contents.
				</p>
				<p>
					<b>My zip code isn't showing up in the search.</b> <br />
					First make sure that you have the correct state the zip code belongs to selected. If it still doesn't show up, then either the dataset is old or incomplete. Try using a neighboring zip code.
				</p>
				<p>
					<b>This site doesn't entirely work on mobile.</b> <br />
					Yes.
				</p>
				</div>
			</div>
		);
	}
}

export default Questions;