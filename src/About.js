import './About.css'
import React from 'react';


class About extends React.Component {	
	render() {
		return(
			<div className='About'>
				<h4>About</h4>
				<div className='Description'>
					<p>
						Now updated to 2020 data!
					</p>
					<p>
						Redistricting is a process that occurs after each Census where each state draws a map for their U.S. House districts. This process is non-standardized between states, usually heavily partisan, and a highly intensive process for populous states. This creates an atmosphere rife with gerrymanding and partisan politics. Where some states have an independent, non-partisan, or citizens commission dedicated to redistricting, such as Colorado, many states determine their districts in their state house and senate that are often one-party controlled, such as Maryland and Texas.
					</p>
					<p>
						To avoid gerrymandering, I created an algorithm that attempts to create districts without any human bias or interference. It attempts to group people together by equally weighing the number of people in each district while maintaining vicinity of the population. I used 2010 Census data that contains each zip code in the U.S., its population, its latitude and longitude coordinates, and the state it belonged to. Using zip codes isn't a necessity, its simply how I did it because it was easier than the alternatives.
					</p>
					<p>
						For those more tech or math minded, it is a modified version of the K-Means clustering algorithm. K-Means cares exclusively about vicinity, so enforcing approximately equal populations necessitates the modification. Where K-Means iterates through each data point and assigns it to the closest centroid (district center point), it was modified so each centroid claims the nearest point. This allows for ensuring the population in each district doesn't go above the approximate average population per district while still ensuring that the data points are close to each other.
					</p>
					<p>
						The percentage listed above is a modifier of that average population per district number. The maps created at 100% tend to distribute too many people to heavily populated, urban areas, where maps at 95% and below distribute too many people to less populous, rural areas. I've found 98% to have the most even distribution but it varies by state, which is why I included all percentages from 96-99%. None of these percentages are inherently correct. They are presented to let you see the subtle differences between them and to help you form your own opinion. I'm not showing the partisan breakdown of each district or the expected seat breakdown because that removes the purpose of doing this altogether: to provide a non-partisan, unbiased way to redistrict states quickly and without hassle.
					</p>
					<p>
						All data used is from the 2020 Census, as are number of districts.
					</p>
				</div>
			</div>
		);
	}
}

export default About;